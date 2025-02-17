"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Pages } from "../models/types";
import ModalEnterRoom from "./ModalEnterRoom";
import { usePathname } from "next/navigation";
import { IMenuItem } from "../models/types";

const settings = [
  {
    id: 3,
    option: "Logout",
  },
];
const settingsLogin = [
  {
    id: 1,
    option: "Anonymous",
  },
  {
    id: 2,
    option: "Google",
  },
];

function ResponsiveAppBar({ componentName }: { componentName: string }) {
  const { user, logOut, signIn, signInAnonymous } = useAuth();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openModalEnterRoom, setOpenModalEnterRoom] = useState(false);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const menuItems = [
  //   { title: "Home", path: "/", show: true },
  //   { title: "Create Room", path: "create-room", show: true },
  //   { title: "Enter Room", path: "", show: true, modal: "ModalEnterRoom" },
  // ];

  // setMenuItems([
  //   { title: "Home", path: "/", show: true },
  //   { title: "Create Room", path: "create-room", show: true },
  //   { title: "Enter Room", path: "", show: true, modal: "ModalEnterRoom" },
  // ]);

  const handleLogoff = (id: number) => {
    id === 3 && logOut();
  };

  const handleSignIn = (id: number) => {
    id === 2 && signIn();
    id === 1 && signInAnonymous();
  };

  const handleOpenModalEnterRoom = () => {
    setOpenModalEnterRoom(true);
  };
  const handleCloseModal = () => setOpenModalEnterRoom(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setLoading(false);

    setMenuItems([
      { title: "Home", path: "/", show: true },
      {
        title: "Create Room",
        path: "create-room",
        show: pathname.includes("/rooms") ? false : true,
      },
      {
        title: "Enter Room",
        path: "",
        show: pathname.includes("/rooms") ? false : true,
        modal: "ModalEnterRoom",
      },
    ]);
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "var(--dark-green-forest)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <Image
            color=""
            src="/poker-chip-icon.svg"
            alt="Next.js logo"
            width={72}
            height={72}
            priority
          /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "var(--white)",
                textDecoration: "none",
              }}
            >
              PokerPlan
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                      <Link key={item.title} href={item.path} className="mr-5">
                        {item.title.toUpperCase()}
                      </Link>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            {/*Nav normal*/}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {menuItems
                .filter((item) => item.show) // Filtra apenas os que devem aparecer
                .map((item) => (
                  <Button
                    key={item.title}
                    onClick={() => {
                      handleCloseNavMenu();
                    }}
                    sx={{
                      my: 2,
                      color: "var(--button-header)",
                      display: "block",
                      fontWeight: "bold",
                    }}
                    href={item.path}
                  >
                    {item.title}
                  </Button>
                ))}
            </Box>
            {loading ? ( // Exibe o Spinner enquanto o token não é carregado
              <CircularProgress color="success" size={24} />
            ) : token ? ( //se estiver logado, exibe o menu settings
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="user avatar" src={"./avatar.png"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.id}
                      onClick={() => {
                        handleCloseUserMenu();
                        handleLogoff(setting.id);
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.option}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              //Não esta logado
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open Signup/Login options">
                  <Button
                    variant="contained"
                    onClick={handleOpenUserMenu}
                    sx={{
                      background: "var(--white)",
                      color: "var(--dark-green-forest)",
                      fontWeight: "bold",
                    }}
                  >
                    Login/Signup
                  </Button>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settingsLogin.map((setting) => (
                    <MenuItem
                      key={setting.id}
                      onClick={() => {
                        handleCloseUserMenu();
                        handleSignIn(setting.id);
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.option}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {openModalEnterRoom && (
        <ModalEnterRoom
          openModal={openModalEnterRoom}
          setOpenModal={handleCloseModal}
        />
      )}
    </>
  );
}
export default ResponsiveAppBar;
