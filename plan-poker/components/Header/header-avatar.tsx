"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function HeaderAvatar() {
  const { data: session, status } = useSession();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      {status && status === "authenticated" ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="user avatar" />
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
            <MenuItem onClick={() => signOut()}>LogOut</MenuItem>
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
              href="/login"
            >
              Login/Signup
            </Button>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}
