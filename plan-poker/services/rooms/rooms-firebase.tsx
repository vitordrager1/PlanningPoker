import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Configuração do Firebase

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

export const updateActiveUsersRoom = async (idRoom: string, idUser: string) => {
  try {
    // Referência ao documento específico do usuário dentro da sala
    const userRef = doc(db, "activeUsersRoom", `${idRoom}_${idUser}`);

    await setDoc(userRef, {
      idRoom: idRoom,
      idUser: idUser,
      createdAt: new Date(),
    });

    console.log("Usuário adicionado à sala:", idRoom);
    return userRef.id;
  } catch (error) {
    console.error("Erro ao adicionar usuário à sala:", error);
    return null;
  }
};

// export default createRoom;
// export default updateActiveUsersRoom;
