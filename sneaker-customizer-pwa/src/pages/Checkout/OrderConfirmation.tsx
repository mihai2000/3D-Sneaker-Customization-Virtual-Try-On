// src/pages/Checkout/OrderConfirmation.tsx
import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useStripe } from '@stripe/react-stripe-js';
import { useCart } from '../../hooks/useCart';

export default function OrderConfirmation() {
  const stripe = useStripe();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<'success' | 'error' | 'loading'>(
    'loading'
  );

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    if (!clientSecret || !stripe) return;

    const checkPaymentStatus = async () => {
      const result = await stripe.retrievePaymentIntent(clientSecret);
      if (!result.paymentIntent) {
        setStatus('error');
        return;
      }

      switch (result.paymentIntent.status) {
        case 'succeeded':
          clearCart(); // ✅
          setStatus('success');
          break;
        case 'processing':
          setStatus('loading');
          break;
        default:
          setStatus('error');
          break;
      }
    };

    checkPaymentStatus();
  }, [stripe, clearCart]);

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        {status === 'loading' && <CircularProgress />}
        {status === 'success' && (
          <Typography variant="h5">
            ✅ Payment Successful! Thank you for your order.
          </Typography>
        )}
        {status === 'error' && (
          <Typography color="error" variant="h6">
            ❌ There was an issue with your payment. Please try again.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
