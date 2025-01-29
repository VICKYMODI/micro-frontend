import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLoginApi } from '../hooks/useLoginApi';
import { TextField, Button, Paper, Typography, Box, Alert } from "@mui/material";

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { loginUser } = useLoginApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = await loginUser({ username, password });
      login(data.token, data.user);
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f4f6f8" }}
    >
      <Paper elevation={4} sx={{ padding: 4, width: "100%", maxWidth: 400, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" color="primary" gutterBottom>
          🔐 Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, padding: 1 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
