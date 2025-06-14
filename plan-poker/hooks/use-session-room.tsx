// import { useEffect, useState } from "react";
// import React from "react";
// import { useParams } from "next/navigation";

// interface SessionRoomProps {
//   roomId: string;
// }

// export default function useSessionRoom({ roomId }: SessionRoomProps) {
//   const [sessions, setSessions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchSessions() {
//       try {
//         const res = await fetch(`/api/firebase/room-session?roomId=${roomId}`, {
//           method: "GET",
//         });
//         console.log(roomId);
//         const data = await res.json();
//         setSessions(data.sessions);
//       } catch (error) {
//         console.error("Error fetching room sessions:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSessions();
//   }, []);

//   return { sessions, loading };
// }

import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

interface SessionRoomProps {
  roomId: string;
  userId: string;
  username: string;
}

//Este hook, controla a sessão de uma sala criada, ou seja, quando um usuário Cria/Entra/Sai de uma sala, ela atualiza para os demais usuários
//E caso o último usuário saia da sessão, ela também deleta a sala.
export default function useSessionRoom({
  roomId,
  userId,
  username,
}: SessionRoomProps) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId || !userId) return;

    const sessionDocId = `${roomId}_${userId}`;
    const sessionDocRef = doc(db, "roomSession", sessionDocId);

    // Adiciona o usuário se não existir na collection roomSession
    const addUserInSession = async () => {
      try {
        const docSnap = await getDoc(sessionDocRef);
        if (!docSnap.exists()) {
          await setDoc(sessionDocRef, {
            roomId,
            userId,
            name: username || "Unknown", // Troque por um nome real se disponível
            createdAt: new Date(),
          });
          console.log("Usuário adicionado à sessão.");
        }
      } catch (error) {
        console.error("Erro ao garantir usuário na sessão:", error);
      }
    };

    addUserInSession();

    const q = query(
      collection(db, "roomSession"),
      where("roomId", "==", roomId),
    );

    const unsubscribeSnapshot = onSnapshot(
      q,
      (querySnapshot) => {
        const updatedSessions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSessions(updatedSessions);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to room sessions:", error);
        setLoading(false);
      },
    );

    //Remove o usuário da sessão e caso ele for o único, deleta a sala também
    const removeUserSession = async () => {
      try {
        // Verifica quantos usuários restam na sessão antes de remover o próprio
        const snapshot = await getDocs(
          query(collection(db, "roomSession"), where("roomId", "==", roomId)),
        );

        if (snapshot.size === 1) {
          // Só tem ele: remove a sessão e a sala
          await deleteDoc(doc(db, "roomSession", sessionDocId));
          await deleteDoc(doc(db, "rooms", roomId));
          console.log(roomId);
          console.log("Usuário removido. Sala também excluída.");
        } else {
          // Só remove o usuário
          await deleteDoc(doc(db, "roomSession", sessionDocId));
          console.log("Usuário removido da sessão.");
        }
      } catch (error) {
        console.error("Erro ao remover sessão/room:", error);
      }
    };
    // removeUserSession();
    window.addEventListener("beforeunload", removeUserSession);

    return () => {
      unsubscribeSnapshot();
      window.removeEventListener("beforeunload", removeUserSession);
      removeUserSession();
    };
  }, [roomId, userId]);

  return { sessions, loading };
}
