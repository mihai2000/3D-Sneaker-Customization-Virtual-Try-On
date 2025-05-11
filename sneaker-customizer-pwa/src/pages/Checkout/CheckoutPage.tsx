import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../services/firebase';
import { stripePromise } from '../../services/stripe';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/order-success',
      },
    });

    if (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" disabled={!stripe || loading}>
          {loading ? <CircularProgress size={24} /> : 'Pay Now'}
        </Button>
      </Box>
    </form>
  );
}

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchClientSecret = async () => {
      const createIntent = httpsCallable(functions, 'createPaymentIntent');
      const res: any = await createIntent({ amount: 999 }); // Replace 999 with real total
      setClientSecret(res.data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const appearance = {
    theme: 'stripe',
  } as const;

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : (
          <Typography>Loading payment form...</Typography>
        )}
      </Paper>
    </Box>
  );
}
