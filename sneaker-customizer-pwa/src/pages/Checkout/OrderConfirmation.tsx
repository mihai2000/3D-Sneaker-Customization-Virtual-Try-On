// import { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress, Paper } from '@mui/material';
// import { useStripe } from '@stripe/react-stripe-js';
// import { useCart } from '../../hooks/useCart';
// import { db } from '../../services/firebase';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
// import { useAuth } from '../../hooks/useAuth';

// export default function OrderConfirmation() {
//   const stripe = useStripe();
//   const { cart, clearCart } = useCart();
//   const { user } = useAuth();
//   const [status, setStatus] = useState<'success' | 'error' | 'loading'>(
//     'loading'
//   );

//   useEffect(() => {
//     const clientSecret = new URLSearchParams(window.location.search).get(
//       'payment_intent_client_secret'
//     );

//     if (!clientSecret || !stripe || !user) return;

//     const checkPaymentStatus = async () => {
//       const result = await stripe.retrievePaymentIntent(clientSecret);
//       const paymentIntent = result.paymentIntent;

//       if (!paymentIntent) {
//         setStatus('error');
//         return;
//       }

//       if (paymentIntent.status === 'succeeded') {
//         try {
//           // Save order to Firestore
//           const total = cart.reduce(
//             (sum, item) => sum + item.price * item.quantity,
//             0
//           );
//           const orderId = paymentIntent.id;

//           await setDoc(doc(db, 'orders', orderId), {
//             userId: user,
//             items: cart,
//             total,
//             status: 'succeeded',
//             createdAt: serverTimestamp(),
//             paymentIntentId: orderId,
//           });

//           clearCart();
//           setStatus('success');
//         } catch (err) {
//           console.error('Error saving order:', err);
//           setStatus('error');
//         }
//       } else if (paymentIntent.status === 'processing') {
//         setStatus('loading');
//       } else {
//         setStatus('error');
//       }
//     };

//     checkPaymentStatus();
//   }, [stripe, clearCart, cart, user]);

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
//         {status === 'loading' && <CircularProgress />}
//         {status === 'success' && (
//           <Typography variant="h5">
//             ✅ Payment Successful! Thank you for your order.
//           </Typography>
//         )}
//         {status === 'error' && (
//           <Typography color="error" variant="h6">
//             ❌ There was an issue with your payment. Please try again.
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// }
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, Stack } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import { useCart } from "../../hooks/useCart";
import { db } from "../../services/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function OrderConfirmation() {
	const stripe = useStripe();
	const { cart, clearCart } = useCart();
	const { user } = useAuth();
	const [status, setStatus] = useState<"success" | "error" | "loading">(
		"loading"
	);

	useEffect(() => {
		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret || !stripe || !user) return;

		const checkPaymentStatus = async () => {
			const result = await stripe.retrievePaymentIntent(clientSecret);
			const paymentIntent = result.paymentIntent;

			if (!paymentIntent) {
				setStatus("error");
				return;
			}

			if (paymentIntent.status === "succeeded") {
				try {
					const total = cart.reduce(
						(sum, item) => sum + item.price * item.quantity,
						0
					);
					const orderId = paymentIntent.id;

					await setDoc(doc(db, "orders", orderId), {
						userId: user.uid,
						items: cart,
						total,
						status: "succeeded",
						createdAt: serverTimestamp(),
						paymentIntentId: orderId,
					});

					clearCart();
					setTimeout(() => setStatus("success"), 500); // slight delay for smooth UX
				} catch (err) {
					console.error("Error saving order:", err);
					setStatus("error");
				}
			} else if (paymentIntent.status === "processing") {
				setStatus("loading");
			} else {
				setStatus("error");
			}
		};

		checkPaymentStatus();
	}, [stripe, clearCart, cart, user]);

	return (
		<Box sx={{ mt: 8, px: 2 }}>
			<Paper
				sx={{
					p: 6,
					maxWidth: 500,
					mx: "auto",
					textAlign: "center",
					borderRadius: 4,
				}}
			>
				{status === "loading" && (
					<Stack alignItems="center" spacing={2}>
						<CircularProgress />
						<Typography>Verifying your payment...</Typography>
					</Stack>
				)}

				{status === "success" && (
					<Stack spacing={2} alignItems="center">
						<CheckCircleOutlineIcon color="success" sx={{ fontSize: 48 }} />
						<Typography variant="h5" fontWeight={600}>
							Payment Successful!
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Thank you for your order. A confirmation email will be sent to you
							shortly.
						</Typography>
					</Stack>
				)}

				{status === "error" && (
					<Stack spacing={2} alignItems="center">
						<ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
						<Typography variant="h6" fontWeight={600}>
							Payment Failed
						</Typography>
						<Typography variant="body2" color="text.secondary">
							There was an issue processing your payment. Please try again.
						</Typography>
					</Stack>
				)}
			</Paper>
		</Box>
	);
}
