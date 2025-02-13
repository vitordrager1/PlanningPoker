import { useEffect, useState } from "react";
import { db } from "@/services/firebase"; // Importar a configuração do Firebase
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Seu contexto de autenticação
import { ActiveUser } from "@/app/models/types";

// export default function useActiveUsers(idRoom: string) {
//   const { user } = useAuth(); // Usuário logado
//   const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);

//   useEffect(() => {
//     if (!idRoom || !user) return;

//     const usersCollection = collection(db, "activeUsersRoom");

//     // 🔴 Escutando mudanças na sala específica
//     const q = query(usersCollection, where("idRoom", "==", idRoom));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const users = snapshot.docs.map((doc) => doc.data() as ActiveUser);
//       setActiveUsers(users);
//     });

//     return () => unsubscribe(); // Remove o listener ao desmontar
//   }, [idRoom, user]);

//   return { activeUsers };
// }

export default function useActiveUsers(idRoom?: string | string[]) {
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const { user } = useAuth(); // Lista de usuários autenticados, obtida do AuthContext

  useEffect(() => {
    if (!idRoom) return;

    const q = query(
      collection(db, "activeUsersRoom"),
      where("idRoom", "==", idRoom),
    );

    // Listener para atualizações em tempo real
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const usersData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const userData = docSnap.data();
          return {
            idUser: userData.idUser,
            idRoom: userData.idRoom,
            nrVote: userData.nrVote,
            nmUser: userData.nmUser ? userData.nmUser : "Anônimo",
          };
        }),
      );

      setActiveUsers(usersData);
    });

    return () => unsubscribe(); // Remove o listener ao desmontar o componente
  }, [idRoom, user]);

  return { activeUsers };
}
