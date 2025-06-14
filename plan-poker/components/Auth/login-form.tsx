"use client";
import {
  Container,
  Stack,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useState, Fragment, ReactElement } from "react";
import ButtonSignInGoogle from "./button-signin-google";

export default function LoginForm(): ReactElement {
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Fragment>
      <Container>
        <Box mx={"auto"} mt={5}>
          <Stack>
            <Box>
              <Typography variant="h5" gutterBottom>
                Login in your account
              </Typography>
              <form>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  autoComplete="none"
                  required
                  margin="normal"
                  onChange={handleChangeEmail}
                  fullWidth
                ></TextField>
                <TextField
                  id="pass"
                  label="Password"
                  variant="outlined"
                  autoComplete="none"
                  required
                  margin="normal"
                  onChange={handleChangePass}
                  fullWidth
                ></TextField>

                <Button variant="contained" fullWidth type="submit">
                  Login
                </Button>
              </form>
            </Box>
          </Stack>
        </Box>
        <ButtonSignInGoogle />
      </Container>
    </Fragment>
  );
}
