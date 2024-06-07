import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsButtonDisabled(!email || !password);
  }, [email, password]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "api/session",
        new URLSearchParams({ email, password }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          auth: {
            username: email,
            password: password,
          },
        }
      );
      console.log("Response received:", response);
      if (response.status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        dispatch(login());
        navigate("/home");
      } else {
        setError(
          "Непредвиденная ошибка при входе. Пожалуйста, попробуйте еще раз."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Неверные логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Вход
      </Typography>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Пароль"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={isButtonDisabled || loading}
      >
        {loading ? <CircularProgress size={24} /> : "Войти"}
      </Button>
    </Container>
  );
};

export default LoginPage;
