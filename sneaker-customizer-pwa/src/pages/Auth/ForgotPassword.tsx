import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useThemeContext } from '../../context/ThemeContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const { theme } = useThemeContext();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      console.error('Reset error:', err);
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
          variant="h5"
          fontWeight={700}
          textAlign="center"
          sx={{ color: theme.titleColor }}
        >
          Forgot Password
        </Typography>

        {sent ? (
          <Typography align="center" sx={{ mt: 4, color: '#a5f3fc' }}>
            ✅ Reset link sent! Check your inbox.
          </Typography>
        ) : (
          <Box component="form" onSubmit={handleReset} sx={{ mt: 4 }}>
            <TextField
              fullWidth
              label="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 3,
                input: { color: 'white' },
                label: { color: '#ccc' },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={theme.buttonStyle}
            >
              Send Reset Link
            </Button>
          </Box>
        )}

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 3, color: theme.linkColor }}
          onClick={() => navigate('/login')}
        >
          Back to Login
        </Button>
      </Paper>
    </Container>
  );
}
