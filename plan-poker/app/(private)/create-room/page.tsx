import { Container, Stack, Box, Typography } from "@mui/material";
import { Fragment, ReactElement } from "react";
import CreateRoomForm from "@/components/create-room-form";
import { auth } from "@/auth";
export default async function CreateRoom() {
  // Teste do session Força delay de 3 segundos
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const session = await auth();
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
              <CreateRoomForm />
            </Box>
          </Stack>
        </Box>
      </Container>
    </Fragment>
  );
}
