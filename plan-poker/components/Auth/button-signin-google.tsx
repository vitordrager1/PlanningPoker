import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";

export default function ButtonSignInGoogle() {
  return (
    <Button onClick={() => signIn("google", { redirectTo: "/" })}>
      <GoogleIcon />
    </Button>
  );
}
