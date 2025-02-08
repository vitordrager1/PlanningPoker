"use client";
import { Container, Stack, Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "next/navigation";
import TableVote from "@/app/components/TableVote";

export default function Room() {
  const params = useParams();
  const { id } = params;

  return (
    <Container className="flex flex-col items-center gap-6">
      <TableVote />
    </Container>
  );
}
