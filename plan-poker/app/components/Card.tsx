"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import dataVotingSystem from "../../database/SystemVoting.json";
const Card = ({ nrCard }: { nrCard: number | null }) => {
  return (
    <Box className="min-w-14 min-h-20 max-w-14 max-h-20 rounded-lg shadow-md bg-blue-950 border-4 border-emerald-400 p-1">
      <Typography
        fontFamily={"monospace"}
        sx={{ color: "#38e8c6" }}
        fontSize={40}
        align="center"
      >
        {nrCard ?? "❔"}
      </Typography>
    </Box>
  );
};

export default Card;
