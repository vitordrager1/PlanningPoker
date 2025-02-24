"use client";
import { useParams, useRouter } from "next/navigation";
import {
  controllerActiveUsersRoom,
  getUsersActiveRoom,
  updateActiveUserField,
  isRoom,
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
import { useEffect, useState, Fragment } from "react";
import { getCards } from "@/services/cards/cards-firebase";
//interface
import { User, CollectionCard } from "@/app/models/types";
import useActiveUsers from "@/app/hooks/ActiveUsers";
import withAuth from "@/services/authentication/withAuth";
import Card from "@/app/components/Card";
import { toast } from "react-toastify";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ButtonCopyUrl from "@/app/components/Buttons/ButtonCopyIdRoom";

//TODO: Ajustar a tipagem...
function Room() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { user, loading } = useAuth();
  const [cards, setCards] = useState<CollectionCard[]>([]);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);
  const [isValidRoom, setIsValidRoom] = useState<boolean | null>(null);
  //chama o hook para atualizar a lista de usuários
  const { activeUsers } = useActiveUsers(id);
  const idRoom = Array.isArray(id) ? id[0] : id;
  //Define que o idRoom é obrigatório
  if (!idRoom) {
    // Redirecionar para uma página de erro ou para a página inicial
    router.push("/");
    return null; // Retorna null para evitar renderização desnecessária
  }

  //executa apenas 1x ao renderizar o compo
  //GetCards
  useEffect(() => {
    const getCardsFibonacci = async () => {
      try {
        const cards = await getCards("fibonacci");
        setCards(cards);
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to get the Vote Card. Please try again or concatct a administrator.",
        );
        return null;
      }
    };
    getCardsFibonacci();
  }, []);

  //Verifica se o ID da sala é válido e Atualiza o activeUsersRoom quando o usuário é carregado na pagina (o useAuth altera o status do loading)
  useEffect(() => {
    if (!user || !idRoom) return;

    const validateIdRoom = async () => {
      try {
        const isValid = await isRoom(idRoom);
        setIsValidRoom(isValid);
        return isValid;
      } catch (error) {
        console.log(error);
        const isValid = false;
        setIsValidRoom(isValid);
        toast.error(
          "Failed to validate the room. Please try again or concatct a administrator.",
        );
        return isValid;
      }
    };

    validateIdRoom().then((isValid) => {
      if (isValid) {
        // addUserToRoom();
        return null;
      }
    });
  }, [loading]);

  // Se ainda não verificou, exibir um loading
  if (isValidRoom === null) {
    return <p>Carregando...</p>;
  }

  //Aguarda carregar o useAuth
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Se a sala não for válida, não renderizar o componente
  if (!isValidRoom) {
    toast.warn(
      "The identifier provided does not exist, please insert another ID.",
    );
    router.push("/");
    return null; // Não renderiza o componente
  }

  const handleVote = async (idRoom: string, vote: number, idUser?: string) => {
    if (!user || !idRoom || !idUser) return; // Se user for null, sai da função
    setSelectedVote(vote);
    try {
      // Atualiza o Firestore com o voto do usuário
      await updateActiveUserField(idRoom, idUser, "nrVote", vote);
    } catch (error) {
      console.error(
        "Failed to update your vote (updateActiveUserField):",
        error,
      );
      toast.error(
        "Failed to update your vote. Please try again or concatct a administrator.",
      );
      return null;
    }
  };

  return (
    <Fragment>
      <Container className="flex flex-col">
        <Box className="float-right mt-5 justify-end flex">
          <ButtonCopyUrl idRoom={idRoom} />
        </Box>
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
              onClick={() => handleVote(idRoom, card.nrCard, user?.uid)}
              sx={{
                background: ` ${selectedVote === card.nrCard ? "var(--medium-beige)" : "var(--medium-green-forest)"}`,
                color: "var(--white)",
                fontSize: 20,
                height: 40,
              }}
            >
              {card.nrCard ? card.nrCard : <CoffeeIcon />}
            </Button>
          ))}
        </Box>
      </Container>
    </Fragment>
  );
}

export default withAuth(Room);
