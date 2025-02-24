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

import { useRouter } from "next/navigation";

export default function useActiveUsers(idRoom?: string | string[]) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !idRoom) return;

    const userRef = doc(db, "activeUsersRoom", `${idRoom}_${user.uid}`);

    // ✅ Adiciona o usuário à coleção quando ele entra na sala
    const addUser = async () => {
      await setDoc(userRef, {
        idUser: user.uid,
        idRoom: idRoom,
        nrVote: null,
        nmUser: user.displayName || "Anônimo",
      });
    };
    addUser();

    // ✅ Remove o usuário quando ele sai da sala
    const removeUser = async () => {
      await deleteDoc(userRef);
    };

    // 🔹 1) Quando o usuário fecha a aba ou recarrega a página
    const handleBeforeUnload = () => {
      removeUser();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 🔹 2) Quando o usuário troca de rota no Next.js
    const handleRouteChange = () => {
      removeUser();
    };
    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [idRoom, user]);

  return {};
}
