"use client";
import Image from "next/image";
import { Container, Stack, Box, Button } from "@mui/material";
import DefaultTitle from "./layouts/DefaultTitle";
import DefaultText from "./layouts/DefaultText";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <Container>
      <Stack mt={15}>
        <DefaultTitle title="Start your sprint in the best way!" style="bold" />
        <DefaultText text="easy to use, relaxed and fun." />
        <Box mt={3}>
          <Button variant="contained" href="create-room" className="defaultRed">
            Create room
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

/*
Adicionar exemplos da funciolidade


*/
