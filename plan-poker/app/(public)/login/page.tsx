import LoginForm from "@/components/Auth/login-form";
import { Container } from "@mui/material";
import { Fragment } from "react";
const Login = async () => {
  return (
    <Fragment>
      <Container>
        <LoginForm />
      </Container>
    </Fragment>
  );
};

export default Login;
