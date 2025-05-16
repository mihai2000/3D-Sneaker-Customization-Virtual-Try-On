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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
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
          component="h1"
          variant="h5"
          align="center"
          sx={{ color: theme.titleColor }}
        >
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Sign In
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 2 }}>
          <Link
            to="/forgot-password"
            style={{ color: theme.linkColor, fontWeight: 600 }}
          >
            Forgot your password?
          </Link>
        </Typography>
        <Typography align="center" sx={{ mt: 2, color: '#bbb' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: theme.linkColor }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
