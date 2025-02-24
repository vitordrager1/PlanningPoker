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
    </Container>
  );
}
