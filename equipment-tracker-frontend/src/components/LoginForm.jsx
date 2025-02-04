import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      //localStorage.setItem("token", token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      navigate("/equipment");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </Container>
  );
};

export default LoginForm;