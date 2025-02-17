"use client";
import FormVotingSystem from "../components/FormVotingSystem";
import { Container, Stack, Box } from "@mui/material";
import DayTimeFrame from "../components/DayTimeFrame";
import { useState } from "react";
import withAuth from "@/services/authentication/withAuth";
import Header from "@/app/components/Header";
function PageCreateRoom() {
  const [selectedSystem, setSelectedSystem] = useState(1); //Default value Fibonacci

  const handleVotingSystemChange = (newVotingSystem: number) => {
    setSelectedSystem(newVotingSystem);
  };

  return (
    <>
      <Header componentName="create-room" />
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
    </>
  );
}

export default withAuth(PageCreateRoom);
// export default PageCreateRoom;
