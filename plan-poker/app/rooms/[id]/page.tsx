"use client";
import { useParams } from "next/navigation";
import TableVote from "@/app/components/TableVote";
import { useRouter } from "next/navigation";
import { updateActiveUsersRoom } from "@/services/rooms/rooms-firebase";
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

interface User {
  id: string;
  name: string;
  vote?: string;
}

const cards = ["1", "2", "3", "5", "8", "13", "21", "?", "Cooffe"];

export default function Room() {
  const params = useParams();
  const { idRoom } = params;
  const { user, loading } = useAuth(); // Usuário autenticado
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  //Atualiza o activeUsersRoom quando o usuário é carregado na pagina
  useEffect(() => {
    if (!user) return console.log("teste2");

    const addUserToRoom = async () => {
      try {
        console.log("teste");
        await updateActiveUsersRoom(idRoom, user.uid); // Aguarde a atualização da sala
      } catch (error) {
        console.error("Erro ao adicionar usuário na sala:", error);
      }
    };

    addUserToRoom();
  }, [user, idRoom]);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "activeUsersRoom"),
  //     (snapshot) => {
  //       const usersList = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       })) as User[];
  //       setActiveUsers(usersList);
  //     },
  //   );

  //   return () => unsubscribe(); // Cleanup listener
  // }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }
  const handleVote = (vote: string) => {
    setSelectedVote(vote);
    setActiveUsers((prev) =>
      //{ ...u, vote } → Criamos um novo objeto do usuário, copiando todas as informações (...u) e substituindo apenas o vote. | : u → Se o id não for do usuário logado, retornamos o usuário sem alterações.
      prev.map((u) => (u.id === user.uid ? { ...u, vote } : u)),
    );
  };

  return (
    <Box>
      <Box className="grid grid-cols-3 grid-rows-3 gap-4 w-64 h-64 border-2 border-gray-600 p-4">
        {activeUsers.map((user, index) => (
          <Box
            key={user.id}
            className="flex flex-col items-center justify-center p-2 border rounded-lg"
          >
            <p className="text-sm font-bold">{user.name}</p>
            <p className="text-xl">{user.vote ?? "❔"}</p>{" "}
            {/* Ainda sem voto */}
          </Box>
        ))}
      </Box>

      {/* Seleção de Cartas */}
      <Box className="flex gap-2">
        {cards.map((card) => (
          <button
            key={card}
            onClick={() => handleVote(card)}
            className={`p-3 border rounded-md ${
              selectedVote === card ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {card}
          </button>
        ))}
      </Box>
    </Box>
  );
}
