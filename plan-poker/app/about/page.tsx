import { ReactElement } from "react";
import { Stack, Container, Box, Link } from "@mui/material";
import DefaultTitle from "../layouts/DefaultTitle";
import DefaultText from "../layouts/DefaultText";
export default function About(): ReactElement {
  return (
    <Container>
      <Box mt={4}>
        <Stack className="w-1/2 m-auto bg-emerald-600 p-5 rounded-xl">
          <DefaultTitle
            fontFamily="monospace"
            title="Sobre o PokerPlan"
            variant="h4"
          />
          <DefaultText fontFamily="monospace" size={20} fontStyle="justify">
            O PokerPlan é uma ferramenta criada para facilitar a estimativa de
            tarefas, baseado no conceito de
            <Link
              href="https://www.atlassian.com/br/agile/project-management/estimation"
              style={{ fontStyle: "italic" }}
              target="_blank"
            >
              {" "}
              Story Points
            </Link>
            . Seu objetivo é trazer a praticidade, agilidade e descontração no
            momento de planejar e estimar suas tarefas.
          </DefaultText>
          <DefaultText fontFamily="monospace" size={20} fontStyle="justify">
            Contact:
            <Link
              href="https://www.linkedin.com/in/vitor-drager-s/"
              target="_blank"
            >
              Vitor Drager
            </Link>
          </DefaultText>
        </Stack>
      </Box>
    </Container>
  );
}
