// import { useEffect, useState } from 'react';
// import { Box, Typography, CircularProgress, Paper, Stack } from '@mui/material';
// import { useStripe } from '@stripe/react-stripe-js';
// import { useCart } from '../../hooks/useCart';
// import { db } from '../../services/firebase';
// import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
// import { useAuth } from '../../hooks/useAuth';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// import { motion } from 'framer-motion';

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
//           const total = cart.reduce(
//             (sum, item) => sum + item.price * item.quantity,
//             0
//           );
//           const orderId = paymentIntent.id;

//           await setDoc(doc(db, 'orders', orderId), {
//             userId: user.uid,
//             items: cart,
//             total,
//             status: 'succeeded',
//             createdAt: serverTimestamp(),
//             paymentIntentId: orderId,
//           });

//           clearCart();
//           setTimeout(() => setStatus('success'), 500);
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
//     <Box sx={{ mt: 8, px: 2 }}>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         sx={{
//           p: 6,
//           maxWidth: 500,
//           mx: 'auto',
//           textAlign: 'center',
//           borderRadius: 4,
//           boxShadow: '0 0 20px rgba(130,90,255,0.2)',
//           background: 'radial-gradient(circle at top, #180030, #0b0b1f)',
//           backdropFilter: 'blur(10px)',
//           border: '1px solid rgba(255,255,255,0.05)',
//           color: '#fff',
//         }}
//       >
//         {status === 'loading' && (
//           <Stack alignItems="center" spacing={2}>
//             <CircularProgress />
//             <Typography>Verifying your payment...</Typography>
//           </Stack>
//         )}

//         {status === 'success' && (
//           <Stack spacing={2} alignItems="center">
//             <CheckCircleOutlineIcon sx={{ fontSize: 48, color: '#8e24aa' }} />
//             <Typography variant="h5" fontWeight={600}>
//               Payment Successful!
//             </Typography>
//             <Typography variant="body1" color="#bbb">
//               Thank you for your order. A confirmation email will be sent to you
//               shortly.
//             </Typography>
//           </Stack>
//         )}

//         {status === 'error' && (
//           <Stack spacing={2} alignItems="center">
//             <ErrorOutlineIcon sx={{ fontSize: 48, color: '#e53935' }} />
//             <Typography variant="h6" fontWeight={600}>
//               Payment Failed
//             </Typography>
//             <Typography variant="body2" color="#bbb">
//               There was an issue processing your payment. Please try again.
//             </Typography>
//           </Stack>
//         )}
//       </Paper>
//     </Box>
//   );
// }
// OrderConfirmation.tsx (Blue Ice Glow Version)
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Paper, Stack } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import { useCart } from "../../hooks/useCart";
import { db } from "../../services/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function OrderConfirmation() {
	const stripe = useStripe();
	const { cart, clearCart } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();

	const [status, setStatus] = useState<"success" | "error" | "loading">(
		"loading"
	);

	useEffect(() => {
		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);
		if (!clientSecret || !stripe || !user || cart.length === 0) return;
		const cartSnapshot = [...cart];
		const total = cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);

		const checkPaymentStatus = async () => {
			try {
				const result = await stripe.retrievePaymentIntent(clientSecret);
				const paymentIntent = result.paymentIntent;

				if (!paymentIntent) {
					setStatus("error");
					return;
				}

				if (paymentIntent.status === "succeeded") {
					const orderId = paymentIntent.id;
					// Optional: Prevent duplicate writes
					const ref = doc(db, "orders", orderId);
					const existing = await getDoc(ref);
					if (!existing.exists()) {
						await setDoc(doc(db, "orders", orderId), {
							userId: user.uid,
							items: cartSnapshot,
							total,
							status: "succeeded",
							createdAt: serverTimestamp(),
							paymentIntentId: orderId,
						});
					}

					clearCart();
					setTimeout(() => {
						setStatus("success");
						navigate("/products");
					}, 1000);
				} else if (paymentIntent.status === "processing") {
					setStatus("loading");
				} else {
					setStatus("error");
				}
			} catch (err) {
				console.error("Error saving order:", err);
				setStatus("error");
			}
		};

		checkPaymentStatus();
	}, [stripe, cart, user, clearCart, navigate]);

	return (
		<Box sx={{ mt: 8, px: 2 }}>
			<Paper
				component={motion.div}
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				sx={{
					p: 6,
					maxWidth: 500,
					mx: "auto",
					textAlign: "center",
					borderRadius: 4,
					boxShadow: "0 0 30px rgba(0,212,255,0.3)",
					background: "radial-gradient(circle at top, #001f3f, #000c1a)",
					backdropFilter: "blur(10px)",
					border: "1px solid rgba(255,255,255,0.05)",
					color: "#e0f7ff",
				}}
			>
				{status === "loading" && (
					<Stack alignItems="center" spacing={2}>
						<CircularProgress color="info" />
						<Typography>Verifying your payment...</Typography>
					</Stack>
				)}

				{status === "success" && (
					<Stack spacing={2} alignItems="center">
						<CheckCircleOutlineIcon sx={{ fontSize: 48, color: "#00bcd4" }} />
						<Typography variant="h5" fontWeight={600}>
							Payment Successful!
						</Typography>
						<Typography variant="body1" color="#bbdefb">
							Thank you for your order. A confirmation email will be sent to you
							shortly.
						</Typography>
					</Stack>
				)}

				{status === "error" && (
					<Stack spacing={2} alignItems="center">
						<ErrorOutlineIcon sx={{ fontSize: 48, color: "#f44336" }} />
						<Typography variant="h6" fontWeight={600}>
							Payment Failed
						</Typography>
						<Typography variant="body2" color="#90a4ae">
							There was an issue processing your payment. Please try again.
						</Typography>
					</Stack>
				)}
			</Paper>
		</Box>
	);
}
