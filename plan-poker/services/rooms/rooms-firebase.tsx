import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Configuração do Firebase
import { User, ActiveUser } from "@/app/models/types";

/* -------------------------------------------------
Autor: Vitor Drager
Coleção: rooms
Descrição: Criar uma nova sala, para agrupar usuários de uma seção
-------------------------------------------------*/
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

/* -------------------------------------------------
Autor: Vitor Drager
Coleção: activeUsersRoom
Descrição: Criar ou Atualizar informações de um usuário ativo na sala. A coleção agrupo um array de usuários.
Exemplo:
Coleção pai:   rooms
Coleção filha: activeUsersRoom [usuario1, usuario2, usuario3]
-------------------------------------------------*/
export const controllerActiveUsersRoom = async (
  idRoom: string | string[],
  idUser: string,
  nmUser: string | string[] | null,
  nrVote?: number | null, //opcional
) => {
  try {
    // Referência ao documento específico do usuário dentro da sala
    const userRef = doc(db, "activeUsersRoom", `${idRoom}_${idUser}`);

    await setDoc(
      userRef,
      {
        idRoom: idRoom,
        idUser: idUser,
        nrVote: nrVote || null,
        nmUser: nmUser,
        createdAt: new Date(),
      },
      { merge: true }, // Garante que os dados existentes não sejam sobrescritos
    );

    console.log("Usuário adicionado à sala:", idRoom);
    return userRef.id;
  } catch (error) {
    console.error("Erro ao adicionar usuário à sala:", error);
    return null;
  }
};

/* -------------------------------------------------
Autor: Vitor Drager
Coleção: activeUsersRoom
Descrição: Retornar um array contendo os usuários ativos de uma sala.
-------------------------------------------------*/
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

/* -------------------------------------------------
Autor: Vitor Drager
Coleção: activeUsersRoom
Descrição: Atualizar um campo de forma dinamica da coleção activeUsersRoom
-------------------------------------------------*/
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

/* -------------------------------------------------
Autor: Vitor Drager
Coleção: rooms
Descrição: Retornar um indicador true ou false referente a existencia de uma sala na coleção.
-------------------------------------------------*/
export const isRoom = async (roomId: string | string[]): Promise<boolean> => {
  try {
    if (!roomId) return false; // Se o roomId for inválido, retorna false

    // Referência ao documento da sala
    const roomRef = doc(db, "rooms", `${roomId}`);
    const roomSnap = await getDoc(roomRef);

    // Retorna true se o documento existir, caso contrário, false
    return roomSnap.exists();
  } catch (error) {
    console.error("Erro ao verificar a existência da sala:", error);
    return false; // Em caso de erro, retorna false por segurança
  }
};

// export default createRoom;
// export default updateActiveUsersRoom;
