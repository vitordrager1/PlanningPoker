"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/services/rooms/rooms-firebase";
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

type VotingSystemProps = {
  selectedSystem: number;
  setSelectedSystem: (system: number) => void;
};

interface VotingSystem {
  id: number;
  system: string;
  text: string;
}

const votingSystem: VotingSystem[] = [
  {
    id: 1,
    system: "Fibonacci",
    text: "Fibonacci (0, 1, 2, 3, 5, 8, 13, 21)",
  },
  {
    id: 2,
    system: "Numeric",
    text: "Numeric (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)",
  },
];

const FormVotingSystem: React.FC<VotingSystemProps> = ({
  selectedSystem,
  setSelectedSystem,
}) => {
  const router = useRouter();
  const [nameRoom, setNameRoom] = useState(String);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameRoom(event.target.value); //event vem sempre em string
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSystem(Number(event.target.value)); //event vem sempre em string
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      // Aguarda a resolução da promessa
      const idRoom = await createRoom(nameRoom, selectedSystem, 1);
      // Verifica se o ID foi retornado corretamente
      if (idRoom) {
        router.push("/rooms/" + idRoom); // Redireciona para a sala
      } else {
        console.error("Erro: ID da sala não foi gerado.");
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };

  return (
    <Box
      sx={{ maxWidth: 500, mr: 5, mt: 0, p: 3, boxShadow: 3, borderRadius: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Create your room
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name-room"
          label="Room name"
          variant="outlined"
          autoComplete="none"
          required
          margin="normal"
          onChange={handleChangeName}
        ></TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Voting system"
          defaultValue="1"
          helperText="Please select your voting system"
          margin="normal"
          onChange={handleChange}
          required
        >
          {votingSystem.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          className="defaultRed"
          fullWidth
          type="submit"
          sx={{ marginTop: "2rem" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormVotingSystem;
