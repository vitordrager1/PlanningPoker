import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Textarea from "@mui/joy/Textarea";
import { ModalEnterRoomProps } from "../models/types";

const ModalEnterRoom: React.FC<ModalEnterRoomProps> = ({
  openModal,
  setOpenModal,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(openModal);
  const [idRoom, setIdRoom] = useState(String);
  // Funções para abrir e fechar o modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpenModal(false);
  };
  //
  const handleChangeIdRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIdRoom(event.target.value); //event vem sempre em string
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      // Verifica se o ID foi retornado corretamente
      if (idRoom) {
        router.push("/rooms/" + idRoom); // Redireciona para a sala
      } else {
        console.error("Erro ao tentar entrar na sala." + idRoom);
      }
    } catch (error) {
      console.error("Erro ao tentar entrar na sala:", error);
    }
  };

  return (
    <>
      {/*O símbolo <> </> é conhecido como um Fragment no React. Ele permite agrupar múltiplos elementos JSX sem adicionar um elemento extra ao DOM, como uma div ou Box.    */}

      {/* Modal que exibe os comentarios */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          className="p-4 rounded-md shadow-md w-1/2"
          sx={{
            filter: "blur",
            background: "var(--medium-green-forest)",
            top: "25%",
            left: "25%",
            position: "absolute",
            margin: "auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              id="id-room"
              label="ID Room"
              variant="outlined"
              autoComplete="none"
              required
              fullWidth
              margin="normal"
              onChange={handleChangeIdRoom}
            ></TextField>
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
      </Modal>
    </>
  );
};
export default ModalEnterRoom;
