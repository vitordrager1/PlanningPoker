"use client"; // Esse componente roda no cliente

import { useAuth } from "./context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useAuth();

  if (loading) {
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
