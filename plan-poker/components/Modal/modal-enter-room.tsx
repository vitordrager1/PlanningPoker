import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Fragment } from "react";
import { ModalEnterRoomProps } from "../../models/types";

export default function ModalEnterRoom({
  openModal,
  handleCloseModal,
}: ModalEnterRoomProps) {
  const [open, setOpen] = useState(openModal);
  const [idRoom, setIdRoom] = useState(String);

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
        // router.push("/rooms/" + idRoom); // Redireciona para a sala
        window.location.href = "/rooms/" + idRoom;
      } else {
        console.error("Erro ao tentar entrar na sala." + idRoom);
      }
    } catch (error) {
      console.error("Erro ao tentar entrar na sala:", error);
    }
  };

  return (
    <Fragment>
      <Modal
        open={open}
        onClose={handleCloseModal}
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
          <IconButton
            onClick={() => handleCloseModal(false)}
            sx={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>

          <Typography fontFamily={"monospace"} fontSize={20}>
            Enter Room
          </Typography>

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
    </Fragment>
  );
}
