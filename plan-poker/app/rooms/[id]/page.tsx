"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  updateActiveUsersRoom,
  getUsersActiveRoom,
  updateActiveUserField,
} from "@/services/rooms/rooms-firebase";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Input,
  TextField,
} from "@mui/material";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../services/firebase";
import { useEffect, useState } from "react";
import {
  createCollectionCard,
  getCards,
} from "@/services/cards/cards-firebase";
//interface
import { User, CollectionCard } from "@/app/models/types";

export default function Room() {
  const params = useParams();
  const { id } = params;
  const { user, loading } = useAuth(); // Usuário autenticado
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [cards, setCards] = useState<CollectionCard[]>([]);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  //const cards = ["1", "2", "3", "5", "8", "13", "21", "?", "Cooffe"];

  //Atualiza o activeUsersRoom quando o usuário é carregado na pagina (o useAuth altera o status do loading)
  useEffect(() => {
    if (!user || !id) return;

    const addUserToRoom = async () => {
      try {
        await updateActiveUsersRoom(id, user.uid, selectedVote); // Aguarde a atualização da sala
      } catch (error) {
        console.error("Erro ao adicionar usuário na sala:", error);
      }
    };

    addUserToRoom();
  }, [loading]);

  //executa apenas quando o id da sala é carregado
  useEffect(() => {
    if (!id) return;

    const usersActive = async () => {
      try {
        const users = await getUsersActiveRoom(id);
        setActiveUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    usersActive();
  }, [id]);

  //executa apenas 1x ao renderizar o compo
  useEffect(() => {
    const getCardsFibonacci = async () => {
      try {
        const cards = await getCards("fibonacci");
        setCards(cards);
      } catch (error) {
        console.log(error);
      }
    };

    getCardsFibonacci();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  // const handleVote = async (vote: number) => {
  //   if (!user) return; // Se user for null, sai da função
  //   setSelectedVote(vote);
  //   setActiveUsers((prev) =>
  //     //{ ...u, vote } → Criamos um novo objeto do usuário, copiando todas as informações (...u) e substituindo apenas o vote. | : u → Se o id não for do usuário logado, retornamos o usuário sem alterações.
  //     prev.map((u) => (u.id === user.uid ? { ...u, vote } : u)),
  //   );

  //   try{
  //     await updateActiveUserField()
  //   }catch(error){

  //   }
  // };

  const handleVote = async (
    idRoom: string | string[],
    idUser: string,
    vote: number,
  ) => {
    if (!user) return; // Se user for null, sai da função

    setSelectedVote(vote);

    // Atualiza diretamente o usuário correto no estado
    setActiveUsers((prev) =>
      prev.map((u) => (u.id === idUser ? { ...u, vote } : u)),
    );

    try {
      // Atualiza o Firestore com o voto do usuário
      await updateActiveUserField(idRoom, idUser, "nrVote", vote);
      console.log("Voto atualizado no Firebase!");
    } catch (error) {
      console.error("Erro ao atualizar voto no Firebase:", error);
    }
  };

  const getName = (idUser: string) => {
    if (!user) return "Usuário desconhecido"; // Se o usuário não estiver carregado ainda

    return user.uid === idUser
      ? (user.displayName ?? "Usuário sem nome")
      : "Usuário desconhecido";
  };

  return (
    <Box>
      <Box className="grid grid-cols-3 grid-rows-3 gap-4 w-64 h-64 border-2 border-gray-600 p-4">
        {activeUsers.map((user) => {
          const name = getName(user.id); // Definir a variável corretamente
          return (
            <Box
              key={user.id}
              className="flex flex-col items-center justify-center p-2 border rounded-lg"
            >
              <p className="text-sm font-bold">{name}</p>
              <p className="text-xl">{user.vote ?? "❔"}</p>{" "}
              {/* Ainda sem voto */}
            </Box>
          );
        })}
      </Box>

      {/* Seleção de Cartas */}
      <Box className="flex gap-2">
        {cards.map((card) => (
          <button
            key={card.nrCard}
            onClick={() => handleVote(id, user?.uid, card.nrCard)}
            className={`p-3 border rounded-md ${
              selectedVote === card.nrCard
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {card.nrCard}
          </button>
        ))}
      </Box>
    </Box>
  );
}
