import {
  addDoc,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase"; // Configuração do Firebase
import { CollectionCard } from "@/app/models/types";

export const createCollectionCard = async (Card: CollectionCard) => {
  try {
    // Referência ao documento do grupo de cartas
    const docRef = doc(db, "cards", Card.idCollectionCard);

    // Atualiza o documento para adicionar a nova carta ao array "cards"
    await setDoc(
      docRef,
      {
        cards: arrayUnion({
          nrCard: Card.nrCard,
          qtHour: Card.qtHour,
          qtDay: Card.qtDay,
          createdAt: new Date(),
        }),
      },
      { merge: true },
    );

    return Card.idCollectionCard;
  } catch (error) {
    console.error("Erro ao criar coleção de cartas:", error);
    return null;
  }
};

export const getCards = async (idCollectionCard: string) => {
  try {
    if (!idCollectionCard) {
      console.error("Erro: idCollectionCard não foi fornecido.");
      return [];
    }

    // Acessa o documento específico dentro da coleção "cards"
    const docRef = doc(db, "cards", idCollectionCard);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("Erro: Documento não encontrado.");
      return [];
    }

    // Pega o array de cartas dentro do documento
    const data = docSnap.data();
    const cards: CollectionCard[] = data.cards || [];

    return cards;
  } catch (error) {
    console.error("Erro ao buscar coleção de cartas:", error);
    return [];
  }
};

// const collection0 = {
//   idCollectionCard: "fibonacci",
//   nrCard: 0,
//   qtHour: 0,
//   qtDay: 0,
// };
// createCollectionCard(collection0);

// const collection1 = {
//   idCollectionCard: "fibonacci",
//   nrCard: 1,
//   qtHour: 4,
//   qtDay: 0,
// };
// createCollectionCard(collection1);

// const collection2 = {
//   idCollectionCard: "fibonacci",
//   nrCard: 2,
//   qtHour: 0,
//   qtDay: 1,
// };
// createCollectionCard(collection2);

// const collection3 = {
//   idCollectionCard: "fibonacci",
//   nrCard: 3,
//   qtHour: 0,
//   qtDay: 2,
// };
// createCollectionCard(collection3);

// const collection4 = {
//   idCollectionCard: "fibonacci",
//   nrCard: 5,
//   qtHour: 0,
//   qtDay: 3,
// };
// createCollectionCard(collection4);

// const collection5 = {
//   idCollectionCard: "fibonacci",
//   nrCard: 8,
//   qtHour: 0,
//   qtDay: 5,
// };
// createCollectionCard(collection5);

// const collection6 = {
//   idCollectionCard: "fibonacci",
//   nrCard: 13,
//   qtHour: 0,
//   qtDay: 10,
// };
// createCollectionCard(collection6);
