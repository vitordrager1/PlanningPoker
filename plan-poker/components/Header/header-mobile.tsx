"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useState } from "react";
import ModalEnterRoom from "../Modal/modal-enter-room";
import { HeaderMobileProps } from "@/models/types";
import { Fragment } from "react";
import HeaderAvatar from "./header-avatar";

export default function HeaderMobile({ menuItems }: HeaderMobileProps) {
  const [openModalEnterRoom, setOpenModalEnterRoom] = useState(false);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenModalEnterRoom = (modal?: string) => {
    if (modal == "ModalEnterRoom") {
      setOpenModalEnterRoom(true);
    }
    return null;
  };
  const handleCloseModal = () => setOpenModalEnterRoom(false);

  return (
    <Fragment>
      <Toolbar disableGutters sx={{ display: { xs: "flex", md: "none" } }}>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ color: "var(--ligth-green-forest)" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: {
                xs: "block",
                md: "none",
                flex: "",
              },
            }}
          >
            {menuItems
              .filter((item) => item.show) // Filtra apenas os que devem aparecer
              .map((item) => (
                <MenuItem key={item.title}>
                  <Link
                    key={item.title}
                    href={item.path}
                    className="mr-5"
                    onClick={() => {
                      handleOpenModalEnterRoom(item.modal);
                    }}
                  >
                    {item.title.toUpperCase()}
                  </Link>
                </MenuItem>
              ))}{" "}
            {openModalEnterRoom && (
              <ModalEnterRoom
                openModal={openModalEnterRoom}
                handleCloseModal={handleCloseModal}
              />
            )}
          </Menu>
        </Box>
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
