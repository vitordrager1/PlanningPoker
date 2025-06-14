"use client";
import { Container, Stack, Box, Button, Typography } from "@mui/material";
import ModalEnterRoom from "@/components/Modal/modal-enter-room";
import { useState, Fragment } from "react";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Fragment>
      <Container>
        <Stack mt={15}>
          <Typography variant="h2" fontStyle={"bold"}>
            Start your sprint in the best way!
          </Typography>

          <Typography fontFamily={"monospace"} fontSize={20}>
            easy to use, relaxed and fun
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              href="/create-room"
              sx={{
                color: "var(--ligth-green-forest)",
                background: "var(--dark-green-forest)",
                marginRight: 5,
              }}
            >
              Create room
            </Button>
            <Button
              onClick={handleOpenModal}
              variant="contained"
              sx={{
                color: "var(--ligth-green-forest)",
                background: "var(--dark-green-forest)",
              }}
            >
              ENTER ROOM
            </Button>
          </Box>
        </Stack>
      </Container>
      {
        // TODO: Adicionar algumas imagens da funcionalidade
      }
      {openModal && (
        <ModalEnterRoom
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Fragment>
  );
}
