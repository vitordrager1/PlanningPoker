import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Textarea from "@mui/joy/Textarea";
import { AlertProps } from "../models/types";
import Header from "@/app/components/Header";
import { Alert, AlertTitle } from "@mui/material";

const DefaultAlert: React.FC<AlertProps> = ({
  title,
  message,
  path,
  severity,
  color,
}) => {
  const router = useRouter();
  const handleRedirect = (path?: string) => {
    if (!path) return;
    router.prefetch("/" + path);
  };
  return (
    <>
      <Alert
        severity={severity}
        color={color}
        variant="filled"
        onClose={() => {
          handleRedirect(path);
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </>
  );
};
export default DefaultAlert;
