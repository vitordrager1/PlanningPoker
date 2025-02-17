"use client";
import Image from "next/image";
import { Container, Stack, Box, Button } from "@mui/material";
import DefaultTitle from "./layouts/DefaultTitle";
import DefaultText from "./layouts/DefaultText";
import { useAuth } from "./context/AuthContext";
import Header from "@/app/components/Header";
import ModalEnterRoom from "./components/ModalEnterRoom";
import { useState } from "react";
export default function Home() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  return (
    <>
      <Header componentName="home" />
      <Container>
        <Stack mt={15}>
          <DefaultTitle
            title="Start your sprint in the best way!"
            style="bold"
          />
          <DefaultText text="easy to use, relaxed and fun." />
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
      {openModal && (
        <ModalEnterRoom openModal={openModal} setOpenModal={handleCloseModal} />
      )}
    </>
  );
}

/*
Adicionar exemplos da funciolidade


*/
