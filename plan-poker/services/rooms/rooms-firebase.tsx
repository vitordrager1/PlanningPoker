import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Configuração do Firebase

const createRoom = async (roomName: string) => {
  try {
    // Adiciona uma nova sala ao Firestore
    const docRef = await addDoc(collection(db, 'rooms'), {
      name: roomName,
      createdAt: new Date(),
    });

    // Retorna o ID da sala criada
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    return null;
  }
};

export default createRoom;