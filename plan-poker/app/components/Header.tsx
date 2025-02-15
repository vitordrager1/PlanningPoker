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

const pages = [
  { title: "create room", component: "create-room" },
  //{ title: "Compra e Venda", component: "/"},
  //{ title: "Reclamações", component: "complaints"},
];

const settings = [
  {
    id: 1,
    option: "Notifications",
  },
  {
    id: 2,
    option: "Perfil",
  },
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

function ResponsiveAppBar() {
  const { user, logOut, signIn, signInAnonymous } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
  const handleLogoff = (id: number) => {
    id === 3 && logOut();
  };

  const handleSignIn = (id: number) => {
    id === 2 && signIn();
    id === 1 && signInAnonymous();
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setLoading(false);
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "var(--header)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            color="info"
            src="/poker-chip-icon.svg"
            alt="Next.js logo"
            width={72}
            height={72}
            priority
          />
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
              color: "var(--button-header)",
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
              sx={{ color: "var(--button-header)" }}
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
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.component}
                  onClick={handleCloseNavMenu}
                  sx={{
                    background: "var(--header)",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      color: "var(--button-header)",
                      fontWeight: "bold",
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.component}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "var(--button-header)",
                  display: "block",
                  fontWeight: "bold",
                }}
                href={page.component}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          {loading ? ( // Exibe o Spinner enquanto o token não é carregado
            <CircularProgress color="success" size={24} />
          ) : token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
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
                  color="secondary"
                  onClick={handleOpenUserMenu}
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
  );
}
export default ResponsiveAppBar;
