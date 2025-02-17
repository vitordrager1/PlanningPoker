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
      <Alert
        severity={severity}
        color={color}
        variant="filled"
        onClose={() => {}}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
        <Button
          className="float-right mr-auto"
          color="inherit"
          variant="outlined"
          size="large"
          href={route ? route : ""}
        >
          OK
        </Button>
      </Alert>
    </>
  );
};
export default DefaultAlert;
