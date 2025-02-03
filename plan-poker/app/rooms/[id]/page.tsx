"use client";
import { Container, Stack, Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
export default function Room() {
  const params = useParams();
  const { id } = params;

  return (
    <Container>
      <Box mx={"auto"} mt={5}>
        Sala {id}
      </Box>
    </Container>
  );
}
