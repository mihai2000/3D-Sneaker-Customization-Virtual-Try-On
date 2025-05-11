import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useStripe } from '@stripe/react-stripe-js';
import { useCart } from '../../hooks/useCart';
import { db } from '../../services/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';

export default function OrderConfirmation() {
  const stripe = useStripe();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [status, setStatus] = useState<'success' | 'error' | 'loading'>(
    'loading'
  );

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret || !stripe || !user) return;

    const checkPaymentStatus = async () => {
      const result = await stripe.retrievePaymentIntent(clientSecret);
      const paymentIntent = result.paymentIntent;

      if (!paymentIntent) {
        setStatus('error');
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        try {
          // Save order to Firestore
          const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          const orderId = paymentIntent.id;

          await setDoc(doc(db, 'orders', orderId), {
            userId: user,
            items: cart,
            total,
            status: 'succeeded',
            createdAt: serverTimestamp(),
            paymentIntentId: orderId,
          });

          clearCart();
          setStatus('success');
        } catch (err) {
          console.error('Error saving order:', err);
          setStatus('error');
        }
      } else if (paymentIntent.status === 'processing') {
        setStatus('loading');
      } else {
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [stripe, clearCart, cart, user]);

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
