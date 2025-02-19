"use client";
import FormVotingSystem from "../components/FormVotingSystem";
import { Container, Stack, Box } from "@mui/material";
import DayTimeFrame from "../components/DayTimeFrame";
import { useState, Fragment } from "react";
import withAuth from "@/services/authentication/withAuth";
import Header from "@/app/components/Header";

//TODO: Definir um tipo para a função CreateRoom
//TODO: Ajustar a handleVottingSystemChange, para uma props de callback
function PageCreateRoom() {
  const [selectedSystem, setSelectedSystem] = useState(1); //Default value Fibonacci

  const handleVotingSystemChange = (newVotingSystem: number) => {
    setSelectedSystem(newVotingSystem);
  };

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
            <FormVotingSystem
              selectedSystem={selectedSystem}
              setSelectedSystem={handleVotingSystemChange}
            />
            {/* <DayTimeFrame id={selectedSystem} /> */}
          </Stack>
        </Box>
      </Container>
    </Fragment>
  );
}

export default withAuth(PageCreateRoom);
// export default PageCreateRoom;
