import { ReactElement } from "react";
import { Stack, Container, Typography, Box } from "@mui/material";
import DefaultTitle from "../layouts/DefaultTitle";
import DefaultText from "../layouts/DefaultText";
export default function About(): ReactElement {
  return (
    <Container>
      <Box mt={4}>
        <DefaultText
          fontFamily="monospace"
          text="Sobre o PokerPlan"
          size={20}
        />
        <Stack className="w-1/2">
          <DefaultText
            fontFamily="monospace"
            text="O PokerPlan é uma ferramenta criada para facilitar o planejamento de uma sprint, se baseando no conceito de Story Points"
            size={20}
          />
          <DefaultText
            fontFamily="monospace"
            text="Story Points"
            size={20}
            fontStyle="italic"
          />
        </Stack>
      </Box>

      <Box
        className="relative bg-cover bg-center h-screen"
        sx={{"backgroundImage: url('/fichas')"}}
      >

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="backdrop-blur-md bg-white bg-opacity-30 p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-white">
              Frosted Glass Effect
            </h1>
            <p className="mt-4 text-white">
              This is a frosted glass card overlaying a blurred background.
            </p>
          </div>
        </div>
      </Box>
    </Container>
  );
}
