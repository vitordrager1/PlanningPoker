"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { IMenuItem } from "../../models/types";
import HeaderMobile from "./header-mobile";
import HeaderDesktop from "./header-desktop";
import { Fragment } from "react";

const menuItems: IMenuItem[] = [
  { title: "Home", path: "/", show: true },
  {
    title: "Create Room",
    path: "/create-room",
    show: true,
  },
  {
    title: "Enter Room",
    path: "#",
    show: true,
    modal: "ModalEnterRoom",
  },
  { title: "Sobre", path: "/about", show: true },
];

function Header() {
  return (
    <Fragment>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--dark-green-forest)",
        }}
      >
        <Container maxWidth="xl">
          <HeaderDesktop menuItems={menuItems} />
          <HeaderMobile menuItems={menuItems} />
        </Container>
      </AppBar>
    </Fragment>
  );
}
export default Header;
