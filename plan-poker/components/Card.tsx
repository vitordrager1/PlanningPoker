"use client";
import { Box, Typography } from "@mui/material";
import CoffeeIcon from "@mui/icons-material/Coffee";
//TODO: Criar uma interface props e ajustar o retorno. Utilizar também uma função declarada ao invés de arrow function
const Card = ({ nrCard }: { nrCard: string | null | undefined }) => {
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
        {nrCard ? nrCard : <CoffeeIcon />}
      </Typography>
    </Box>
  );
};

export default Card;
