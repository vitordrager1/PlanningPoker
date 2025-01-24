'use client'
import FormVotingSystem from "../components/FormVotingSystem"
import { Container, Stack, Box } from "@mui/material";
import DayTimeFrame from "../components/DayTimeFrame";
import { useState } from "react";
export default function PageCreateRoom() {

  const [selectedSystem, setSelectedSystem] = useState(1);//Default value Fibonacci
  const handleVotingSystemChange = (newVotingSystem) => {
    setSelectedSystem(newVotingSystem);
  };

  return (
    <Container>
        <Box mx={"auto"} mt={5} border={2} >
      <Stack direction={"row"} mx={"auto"}>

        <FormVotingSystem
          selectedSystem={selectedSystem} 
          setSelectedSystem={handleVotingSystemChange} />
        <DayTimeFrame id={selectedSystem}/>
      </Stack>
          </Box>
    </Container>
  );
}
  