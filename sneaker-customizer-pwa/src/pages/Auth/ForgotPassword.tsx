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
import { useThemeContext } from '../../hooks/useTheme';

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
        {sent ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ color: '#38bdf8', fontWeight: 600, mb: 2 }}
            >
              🎉 Reset Link Sent!
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#a5f3fc', fontWeight: 400, mb: 3 }}
            >
              We've just emailed you a link to reset your password.
              <br />
              Please check your inbox to continue.
            </Typography>
            <Button
              variant="contained"
              sx={{
                ...theme.buttonStyle,
                px: 4,
                py: 1.2,
              }}
              onClick={() => navigate('/login')}
            >
              Return to Login
            </Button>
          </Box>
        ) : (
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleReset}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              textAlign="center"
              sx={{ color: theme.titleColor }}
            >
              Forgot Password
            </Typography>
            <TextField
              fullWidth
              label="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={theme.textFieldStyles}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={theme.buttonStyle}
            >
              Send Reset Link
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={theme.buttonStyle}
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
