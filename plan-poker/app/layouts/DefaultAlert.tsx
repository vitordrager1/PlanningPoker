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
  route,
  severity,
  color,
}) => {
  return (
    <>
      {/*O símbolo <> </> é conhecido como um Fragment no React. Ele permite agrupar múltiplos elementos JSX sem adicionar um elemento extra ao DOM, como uma div ou Box.    */}
      <Header componentName="home" />
      <Alert
        severity={severity}
        color={color}
        variant="filled"
        action={
          <Button color="inherit" variant="outlined" size="large" href={route}>
            OK
          </Button>
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </>
  );
};
export default DefaultAlert;
