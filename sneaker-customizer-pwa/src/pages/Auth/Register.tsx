import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useThemeContext } from '../../hooks/useTheme';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.bg,
      }}
    >
      <Paper elevation={0} sx={{ ...theme.paper, p: 5, width: '20%' }}>
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ color: theme.titleColor }}
        >
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={theme.textFieldStyles}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={theme.textFieldStyles}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={theme.textFieldStyles}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={theme.buttonStyle}
          >
            Sign Up
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 2, color: '#bbb' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: theme.linkColor }}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
