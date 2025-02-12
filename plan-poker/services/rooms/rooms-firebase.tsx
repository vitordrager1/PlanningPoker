import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Configuração do Firebase
import { User } from "@/app/models/types";
export const createRoom = async (
  roomName: string,
  selectedSystem: number,
  hostId: number,
) => {
  try {
    // Adiciona uma nova sala ao Firestore
    const docRef = await addDoc(collection(db, "rooms"), {
      name: roomName,
      timeSystem: selectedSystem,
      hostId: hostId,
      createdAt: new Date(),
    });

    // Retorna o ID da sala criada
    return docRef.id;
  } catch (error) {
    console.error("Erro ao criar sala:", error);
    return null;
  }
};

export const updateActiveUsersRoom = async (
  idRoom: string | string[],
  idUser: string,
  nrVote?: number | null, //opcional
) => {
  try {
    // Referência ao documento específico do usuário dentro da sala
    const userRef = doc(db, "activeUsersRoom", `${idRoom}_${idUser}`);

    await setDoc(userRef, {
      idRoom: idRoom,
      idUser: idUser,
      nrVote: nrVote || null,
      createdAt: new Date(),
    });

    console.log("Usuário adicionado à sala:", idRoom);
    return userRef.id;
  } catch (error) {
    console.error("Erro ao adicionar usuário à sala:", error);
    return null;
  }
};

export const getUsersActiveRoom = async (idRoom: string | string[]) => {
  try {
    if (!idRoom) {
      console.error("Erro: idRoom não foi fornecido.");
      return [];
    }

    // Criando a consulta para filtrar os usuários por idRoom
    const queryFilter = query(
      collection(db, "activeUsersRoom"),
      where("idRoom", "==", idRoom),
    );

    // Obtendo os documentos que atendem ao filtro
    const querySnapshot = await getDocs(queryFilter);

    // Mapear os documentos e garantir que o retorno está no formato correto
    const users: User[] = querySnapshot.docs.map((doc) => ({
      id: doc.data().idUser,
      name: doc.data().name || "Usuário desconhecido", // Garante que sempre haverá um nome
      vote: doc.data().vote || null, // Garante que o voto pode ser null
    }));

    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários ativos na sala:", error);
    return [];
  }
};

export const updateActiveUserField = async (
  roomId: string | string[],
  userId: string,
  field: string,
  value: any,
) => {
  try {
    // Referência ao documento do usuário na sala
    const userDocRef = doc(db, "activeUsersRoom", `${roomId}_${userId}`);

    // Atualiza o campo específico no Firestore
    await updateDoc(userDocRef, {
      [field]: value, // Atualiza dinamicamente o campo desejado
    });

    console.log(`Campo ${field} atualizado com sucesso!`);
  } catch (error) {
    console.error("Erro ao atualizar o campo do usuário:", error);
  }
};

// export default createRoom;
// export default updateActiveUsersRoom;
