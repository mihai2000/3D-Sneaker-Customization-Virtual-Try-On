import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import emptyCartImage from '../../assets/empty-cart.png';

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(-45deg, #0f0f11, #1e1f29, #121317, #090a0f)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 20s ease infinite',
        p: 4,
      }}
    >
      <Box
        sx={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 4,
          p: 4,
          maxWidth: 900,
          mx: 'auto',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <img
            src={emptyCartImage}
            alt="Empty Cart"
            style={{ width: '220px', maxWidth: '100%', borderRadius: 12 }}
          />
          <Typography variant="h6" fontWeight={500} sx={{ color: 'white' }}>
            Your cart is empty.
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            Looks like you haven’t added anything to your cart yet. Start
            browsing and add some items you love!
          </Typography>
          <Button
            sx={{
              mt: 2,
              px: 3,
              py: 1,
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(90deg, #3A5EFF, #3E9DF7)',
              borderRadius: 2,
              '&:hover': {
                background: 'linear-gradient(90deg, #3E9DF7, #3A5EFF)',
              },
            }}
            onClick={() => navigate('/products')}
          >
            Start Shopping
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
