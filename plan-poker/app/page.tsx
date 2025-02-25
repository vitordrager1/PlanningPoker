"use client";
import Image from "next/image";
import { Container, Stack, Box, Button } from "@mui/material";
import DefaultTitle from "./layouts/DefaultTitle";
import DefaultText from "./layouts/DefaultText";
import { useAuth } from "./context/AuthContext";
import Header from "@/app/components/Header";
import ModalEnterRoom from "./components/ModalEnterRoom";
import { useState, Fragment } from "react";

//TODO: Definir um tipo para a função HOME
export default function Home() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  return (
    <Fragment>
      <Container>
        <Stack mt={15}>
          <DefaultTitle
            title="Start your sprint in the best way!"
            fontFamily="monospace"
            fontStyle="bold"
            variant="h2"
          />
          <DefaultText fontFamily="monospace" size={20}>
            easy to use, relaxed and fun.
          </DefaultText>
          <Box mt={3}>
            <Button
              variant="contained"
              href="create-room"
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
