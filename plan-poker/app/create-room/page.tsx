"use client";
import {
  Container,
  Stack,
  Box,
  Button,
  MenuItem,
  Typography,
  Input,
  TextField,
} from "@mui/material";
//import DayTimeFrame from "../components/DayTimeFrame";
//import FormVotingSystem from "../components/FormVotingSystem";
import { useState, Fragment } from "react";
import withAuth from "@/services/authentication/withAuth";
import { createRoom } from "@/services/rooms/rooms-firebase";

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

//TODO: Definir um tipo para a função CreateRoom
//TODO: Ajustar a handleVottingSystemChange, para uma props de callback
function PageCreateRoom() {
  const [selectedSystem, setSelectedSystem] = useState(1); //Default value Fibonacci
  const [nameRoom, setNameRoom] = useState(String);

  const handleVotingSystemChange = (newVotingSystem: number) => {
    setSelectedSystem(newVotingSystem);
  };

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
        //router.push("/rooms/" + idRoom); // Redireciona para a sala
        window.location.href = "/rooms/" + idRoom; //Recarrega a página para remontar o HEADER
      } else {
        console.error("Erro: ID da sala não foi gerado.");
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };

  return (
    <Fragment>
      <Container>
        <Box mx={"auto"} mt={5}>
          <Stack
            direction={"row"}
            mx={"auto"}
            justifyContent="center"
            m={5}
            sx={{ minHeight: "60vh" }}
          >
            <Box
              sx={{
                maxWidth: 500,
                mr: 5,
                mt: 0,
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
              }}
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
                  fullWidth
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
                  fullWidth
                >
                  {votingSystem.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.text}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    marginTop: "2rem",
                    color: "var(--ligth-green-forest)",
                    background: "var(--dark-green-forest)",
                  }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Fragment>
  );
}

export default withAuth(PageCreateRoom);
// export default PageCreateRoom;
