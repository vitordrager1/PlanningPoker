"use client";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { CollectionCard } from "@/models/types";
import { ReactElement, useState } from "react";
import useCardOptions from "@/hooks/use-card-options";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { updateVoteUserSessionRoom } from "@/services/firebase/rooms";
import { ISessionRoom } from "@/models/types";

export default function CardOptions({
  roomId,
  userId,
}: ISessionRoom): ReactElement {
  const { cardOptions, loading } = useCardOptions();
  const [selectedVote, setSelectedVote] = useState("");

  const handleSelectCard = (value: string) => {
    setSelectedVote(value);
    console.log(value);
    updateVoteUserSessionRoom({
      roomId: roomId,
      userId: userId,
      vote: value,
    });
  };

  if (loading) {
    return <Box>Carregando...</Box>;
  }

  return (
    <Box className="mt-20 flex items-center mx-auto gap-2">
      {cardOptions[0].cards.map((card: any, index: any) => (
        <Button
          key={index}
          onClick={() => handleSelectCard(card.nrCard)}
          sx={{
            background: ` ${selectedVote === card.nrCard ? "#464646" : "#000"}`,
            color: "#fff",
            fontSize: 20,
            height: 40,
          }}
        >
          {card.nrCard ? card.nrCard : <CoffeeIcon />}
        </Button>
      ))}
    </Box>
  );
}
