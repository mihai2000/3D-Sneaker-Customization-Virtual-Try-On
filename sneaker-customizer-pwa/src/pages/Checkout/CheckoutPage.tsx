import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Paper,
	Typography,
	CircularProgress,
	Stack,
	Divider,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../services/firebase";
import { stripePromise } from "../../services/stripe";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

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
				return_url: window.location.origin + "/order-success",
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
			<Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
				<Button
					type="submit"
					variant="contained"
					disabled={!stripe || loading}
					size="large"
					sx={{
						background: "linear-gradient(90deg, #7b42f6, #442bdb)",
						color: "#fff",
						fontWeight: 600,
						boxShadow: "0 0 10px rgba(130,90,255,0.3)",
						"&:hover": {
							background: "linear-gradient(90deg, #6a32e3, #341bbf)",
							boxShadow: "0 0 16px rgba(130,90,255,0.5)",
						},
					}}
				>
					{loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
				</Button>
			</Box>
		</form>
	);
}

export default function CheckoutPage() {
	const [clientSecret, setClientSecret] = useState("");
	const { cart } = useCart();
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchClientSecret = async () => {
      if (!user || cart.length === 0) return;
      
			const total = cart.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
      const amountInCents = Math.round(total * 100);
      
			const createIntent = httpsCallable(functions, "createPaymentIntent");

			try {
				const res: any = await createIntent({
					amount: amountInCents,
					metadata: {
						items: JSON.stringify(cart),
					},
				});
				setClientSecret(res.data.clientSecret);
			} catch (error: any) {
				console.error("[CheckoutPage] Stripe Error:", error.message);
				alert(error.message);
			}
		};
		fetchClientSecret();
	}, [cart, user]);

	const appearance = { theme: "stripe" } as const;
	const options = { clientSecret, appearance };
	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const amountInCents = Math.round(total * 100);

	return (
		<Box sx={{ mt: 6, px: 2 }}>
			<Paper
				component={motion.div}
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				sx={{
					p: 5,
					maxWidth: 600,
					mx: "auto",
					borderRadius: 4,
					boxShadow: `
            0 0 20px rgba(120,90,255,0.15),
            0 0 40px rgba(100,70,255,0.15)
          `,
					background: "radial-gradient(circle at top, #15082f, #0e0e1c)",
					backdropFilter: "blur(16px)",
					border: "1px solid rgba(180,130,255,0.2)",
					color: "#fff",
				}}
			>
				<Stack spacing={3}>
					<Typography variant="h4" fontWeight={600} textAlign="center">
						Checkout
					</Typography>
					<Box sx={{ textAlign: "left" }}>
						<Button onClick={() => navigate("/cart")} size="small">
							← Back to Cart
						</Button>
					</Box>

					<Box
						sx={{
							backgroundColor: "rgba(255,255,255,0.03)",
							p: 2,
							borderRadius: 2,
							border: "1px solid rgba(255,255,255,0.08)",
							boxShadow: "inset 0 0 12px rgba(120,80,255,0.1)",
						}}
					>
						<Typography variant="subtitle1" fontWeight={500} gutterBottom>
							Order Summary
						</Typography>
						{cart.map((item) => (
							<Box
								key={item.id}
								sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
							>
								<Typography variant="body2">
									{item.name} × {item.quantity}
								</Typography>
								<Typography variant="body2">
									RON {(item.price * item.quantity).toFixed(2)}
								</Typography>
							</Box>
						))}
						<Divider sx={{ my: 1 }} />
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								fontWeight: 600,
							}}
						>
							<Typography variant="body1">Total</Typography>
							<Typography variant="body1">RON{total.toFixed(2)}</Typography>
						</Box>
					</Box>
					{amountInCents >= 200 ? (
						clientSecret ? (
							<Elements options={options} stripe={stripePromise}>
								<CheckoutForm />
							</Elements>
						) : (
							<Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
								<CircularProgress />
								<Typography>Loading payment form...</Typography>
							</Stack>
						)
					) : (
						<Typography color="error" textAlign="center">
							Minimum order amount is RON 2.00.
						</Typography>
					)}
				</Stack>
			</Paper>
		</Box>
	);
}
// CheckoutPage.tsx (Blue Ice Glow Version)
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Paper,
//   Typography,
//   CircularProgress,
//   Stack,
//   Divider,
// } from '@mui/material';
// import { Elements } from '@stripe/react-stripe-js';
// import {
//   PaymentElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';
// import { httpsCallable } from 'firebase/functions';
// import { functions } from '../../services/firebase';
// import { stripePromise } from '../../services/stripe';
// import { useCart } from '../../hooks/useCart';
// import { useAuth } from '../../hooks/useAuth';
// import { useNavigate } from 'react-router';
// import { motion } from 'framer-motion';

// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: window.location.origin + '/order-success',
//       },
//     });

//     if (error) alert(error.message);
//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
//         <Button
//           type="submit"
//           variant="contained"
//           disabled={!stripe || loading}
//           size="large"
//           sx={{
//             background: 'linear-gradient(to right, #00bcd4, #2196f3)',
//             color: '#fff',
//             fontWeight: 600,
//             boxShadow: '0 0 12px rgba(0,188,212,0.6)',
//             '&:hover': {
//               background: 'linear-gradient(to right, #0097a7, #1976d2)',
//             },
//           }}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
//         </Button>
//       </Box>
//     </form>
//   );
// }

// export default function CheckoutPage() {
//   const [clientSecret, setClientSecret] = useState('');
//   const { cart } = useCart();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       if (!user || cart.length === 0) return;
//       const total = cart.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       );

//       const createIntent = httpsCallable(functions, 'createPaymentIntent');
//       const res: any = await createIntent({
//         amount: total,
//         metadata: {
//           items: JSON.stringify(cart),
//         },
//       });
//       setClientSecret(res.data.clientSecret);
//     };

//     fetchClientSecret();
//   }, [cart, user]);

//   const appearance = { theme: 'stripe' } as const;
//   const options = { clientSecret, appearance };
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   return (
//     <Box sx={{ mt: 6, px: 2 }}>
//       <Paper
//         component={motion.div}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         sx={{
//           p: 5,
//           maxWidth: 600,
//           mx: 'auto',
//           borderRadius: 4,
//           boxShadow: '0 0 40px rgba(0,188,212,0.4)',
//           background: 'radial-gradient(circle at top left, #001f3f, #000c1a)',
//           backdropFilter: 'blur(12px)',
//           border: '1px solid rgba(255,255,255,0.06)',
//           color: '#e0f7ff',
//         }}
//       >
//         <Stack spacing={3}>
//           <Typography variant="h4" fontWeight={600} textAlign="center">
//             Checkout
//           </Typography>

//           <Box sx={{ textAlign: 'left' }}>
//             <Button
//               onClick={() => navigate('/cart')}
//               size="small"
//               sx={{
//                 color: '#80deea',
//                 '&:hover': { textDecoration: 'underline' },
//               }}
//             >
//               ← Back to Cart
//             </Button>
//           </Box>

//           <Box
//             sx={{
//               backgroundColor: 'rgba(255,255,255,0.05)',
//               p: 2,
//               borderRadius: 2,
//             }}
//           >
//             <Typography variant="subtitle1" fontWeight={500} gutterBottom>
//               Order Summary
//             </Typography>
//             {cart.map((item) => (
//               <Box
//                 key={item.id}
//                 sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
//               >
//                 <Typography variant="body2">
//                   {item.name} × {item.quantity}
//                 </Typography>
//                 <Typography variant="body2">
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </Typography>
//               </Box>
//             ))}
//             <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 fontWeight: 600,
//               }}
//             >
//               <Typography variant="body1">Total</Typography>
//               <Typography variant="body1">RON{total.toFixed(2)}</Typography>
//             </Box>
//           </Box>

//           {clientSecret ? (
//             <Elements options={options} stripe={stripePromise}>
//               <CheckoutForm />
//             </Elements>
//           ) : (
//             <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
//               <CircularProgress color="info" />
//               <Typography>Loading payment form...</Typography>
//             </Stack>
//           )}
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }
