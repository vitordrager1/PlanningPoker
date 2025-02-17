"use client";
import { useParams, useRouter } from "next/navigation";
import {
  controllerActiveUsersRoom,
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
  Container,
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
import useActiveUsers from "@/app/hooks/ActiveUsers";
import withAuth from "@/services/authentication/withAuth";
import Card from "@/app/components/Card";
import Header from "@/app/components/Header";
function Room() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { user, loading } = useAuth();
  const [cards, setCards] = useState<CollectionCard[]>([]);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  //chama o hook para atualizar a lista de usuários
  const { activeUsers } = useActiveUsers(id);
  console.log(activeUsers);

  //Define que o idRoom é obrigatório
  if (!id) {
    // Redirecionar para uma página de erro ou para a página inicial
    router.push("/");
    return null; // Retorna null para evitar renderização desnecessária
  }

  //Atualiza o activeUsersRoom quando o usuário é carregado na pagina (o useAuth altera o status do loading)
  useEffect(() => {
    if (!user || !id) return;

    const addUserToRoom = async () => {
      try {
        await controllerActiveUsersRoom(
          id,
          user.uid,
          user.displayName,
          selectedVote,
        ); // Aguarde a atualização da sala
      } catch (error) {
        console.error("Erro ao adicionar usuário na sala:", error);
      }
    };

    addUserToRoom();
  }, [loading]);

  //executa apenas 1x ao renderizar o compo
  //GetCards
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

  //Aguarda carregar o useAuth
  if (loading) {
    return <p>Carregando...</p>;
  }

  const handleVote = async (
    idRoom: string | string[],
    vote: number,
    idUser?: string,
  ) => {
    if (!user || !idRoom || !idUser || !vote) return; // Se user for null, sai da função
    setSelectedVote(vote);
    try {
      // Atualiza o Firestore com o voto do usuário
      await updateActiveUserField(idRoom, idUser, "nrVote", vote);
      console.log("Voto atualizado no Firebase!");
    } catch (error) {
      console.error("Erro ao atualizar voto no Firebase:", error);
    }
  };

  return (
    <>
      <Header componentName="room" />
      <Container className="flex flex-col">
        <Box
          className="grid gap-8 p-4 rounded-lg mt-10"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          }}
        >
          {activeUsers.map((user) => {
            return (
              <Box
                key={user.idUser}
                className="flex flex-col items-center justify-center min-w-32 min-h-44 p-4 rounded-lg"
              >
                <Box className="min-h-14">
                  <Typography fontFamily={"monospace"} fontSize={20}>
                    {typeof user.nmUser === "string" &&
                      user.nmUser.substring(0, 13)}
                  </Typography>
                </Box>
                <Card nrCard={user.nrVote}></Card>
              </Box>
            );
          })}
        </Box>

        {/* Seleção de Cartas */}
        <Box className="mt-20 flex items-center mx-auto gap-2">
          {cards.map((card) => (
            <Button
              key={card.nrCard}
              onClick={() => handleVote(id, card.nrCard, user?.uid)}
              sx={{
                background: ` ${selectedVote === card.nrCard ? "var(--medium-beige)" : "var(--medium-green-forest)"}`,
                color: "var(--white)",
                fontSize: 20,
              }}
            >
              {card.nrCard}
            </Button>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default withAuth(Room);
