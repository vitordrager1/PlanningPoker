"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState } from "react";
import ModalEnterRoom from "../Modal/modal-enter-room";
import { Fragment } from "react";
import { HeaderMobileProps } from "@/models/types";
import HeaderAvatar from "./header-avatar";
import ThemeChanger from "./theme-changer-button";
export default function HeaderDesktop({ menuItems }: HeaderMobileProps) {
  const [openModalEnterRoom, setOpenModalEnterRoom] = useState(false);

  const handleOpenModalEnterRoom = (modal?: string) => {
    if (modal == "ModalEnterRoom") {
      setOpenModalEnterRoom(true);
    }
    return null;
  };
  const handleCloseModal = () => setOpenModalEnterRoom(false);

  return (
    <Fragment>
      <Toolbar disableGutters sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography color="--var" variant="h4" component="a" href="/" mr={4}>
          PokerPlan
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {menuItems
            .filter((item) => item.show) // Filtra apenas os que devem aparecer
            .map((item) => (
              <Button
                key={item.title}
                onClick={() => {
                  handleOpenModalEnterRoom(item.modal);
                }}
                variant="outlined"
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
        </Box>
        <ThemeChanger />
        <HeaderAvatar />
      </Toolbar>
      {openModalEnterRoom && (
        <ModalEnterRoom
          openModal={openModalEnterRoom}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Fragment>
  );
}
