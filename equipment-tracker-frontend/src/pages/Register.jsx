import RegisterForm from "../components/RegisterForm";
import { Container, Typography } from "@mui/material";

const Register = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        User Registration
      </Typography>
      <RegisterForm />
    </Container>
  );
};

export default Register;