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

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

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
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
        <Typography component="h1" variant="h5" align="center">
          Forgot Password
        </Typography>
        {sent ? (
          <Typography sx={{ mt: 3 }} align="center">
            Password reset email sent! Please check your inbox.
          </Typography>
        ) : (
          <Box component="form" onSubmit={handleReset} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
          </Box>
        )}

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 3 }}
          onClick={() => navigate('/login')}
        >
          Back to Login
        </Button>
      </Paper>
    </Container>
  );
}
