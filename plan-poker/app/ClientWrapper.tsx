"use client"; // Esse componente roda no cliente

import { useAuth } from "./context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
