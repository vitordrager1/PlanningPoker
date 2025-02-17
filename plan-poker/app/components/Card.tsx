"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import dataVotingSystem from "../../database/SystemVoting.json";
const Card = ({ nrCard }: { nrCard: number | null }) => {
  return (
    <Box
      className="h-36 w-28 rounded-lg shadow-md border-4 p-1"
      sx={{
        background: "var(--medium-green-forest)",
        borderColor: "var(--medium-beige)",
      }}
    >
      <Typography
        fontFamily={"monospace"}
        sx={{ color: "var(--white)" }}
        fontSize={70}
        align="center"
      >
        {nrCard ?? "❔"}
      </Typography>
    </Box>
  );
};

export default Card;
