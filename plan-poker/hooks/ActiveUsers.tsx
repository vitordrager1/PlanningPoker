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
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../app/context/AuthContext"; // Seu contexto de autenticação
import { ActiveUser } from "@/models/types";
import { usePathname } from "next/navigation";

/*
------------------------------------------------------
Este hook atualiza os usuários ativos em uma sala.
------------------------------------------------------
*/

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

// export default function useActiveUsers(idRoom?: string | string[]) {
//   const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
//   const { user } = useAuth(); // Lista de usuários autenticados, obtida do AuthContext

//   useEffect(() => {
//     if (!idRoom) return;

//     const q = query(
//       collection(db, "activeUsersRoom"),
//       where("idRoom", "==", idRoom),
//     );

//     // Listener para atualizações em tempo real
//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const usersData = await Promise.all(
//         snapshot.docs.map(async (docSnap) => {
//           const userData = docSnap.data();
//           return {
//             idUser: userData.idUser,
//             idRoom: userData.idRoom,
//             nrVote: userData.nrVote,
//             nmUser: userData.nmUser ? userData.nmUser : "Anônimo",
//           };
//         }),
//       );

//       setActiveUsers(usersData);
//     });

//     return () => unsubscribe(); // Remove o listener ao desmontar o componente
//   }, [idRoom, user]);

//   return { activeUsers };
// }

//TODO: Excluir também a collection room, caso não haja nenhum usuário ativo na sessão.
export default function useActiveUsers(idRoom?: string | string[]) {
  const { user } = useAuth();
  const pathname = usePathname(); // ✅ Detecta mudanças de rota
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);

  useEffect(() => {
    if (!user || !idRoom) return;

    const userRef = doc(db, "activeUsersRoom", `${idRoom}_${user.uid}`);

    // ✅ Adiciona o usuário na coleção
    const addUser = async () => {
      await setDoc(userRef, {
        idUser: user.uid,
        idRoom: idRoom,
        nrVote: null,
        nmUser: user.displayName || "Anônimo",
      });
    };
    addUser();

    // ✅ Remove o usuário ao sair
    const removeUser = async () => {
      await deleteDoc(userRef);
    };

    // 🔹 1) Quando o usuário FECHA A ABA ou RECARREGA A PÁGINA
    const handleBeforeUnload = () => {
      removeUser();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 🔹 2) Quando o usuário TROCA DE PÁGINA
    let lastPath = pathname;
    const handleRouteChange = () => {
      if (pathname !== lastPath) {
        removeUser();
        lastPath = pathname;
      }
    };

    const interval = setInterval(handleRouteChange, 500); // Checa mudanças de rota a cada 500ms

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

    return () => {
      unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(interval); // Remove o interval ao desmontar o componente
    };
  }, [idRoom, user, pathname]);

  return { activeUsers };
}
