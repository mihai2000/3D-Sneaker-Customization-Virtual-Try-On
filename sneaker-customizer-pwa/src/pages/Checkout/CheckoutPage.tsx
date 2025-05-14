// import { useEffect, useState } from "react";
// import {
// 	Box,
// 	Button,
// 	Paper,
// 	Typography,
// 	CircularProgress,
// } from "@mui/material";
// import { Elements } from "@stripe/react-stripe-js";
// import {
// 	PaymentElement,
// 	useStripe,
// 	useElements,
// } from "@stripe/react-stripe-js";
// import { httpsCallable } from "firebase/functions";
// import { functions } from "../../services/firebase";
// import { stripePromise } from "../../services/stripe";
// import { useCart } from "../../hooks/useCart";
// import { useAuth } from "../../hooks/useAuth";

// function CheckoutForm() {
// 	const stripe = useStripe();
// 	const elements = useElements();
// 	const [loading, setLoading] = useState(false);

// 	const handleSubmit = async (event: React.FormEvent) => {
// 		event.preventDefault();
// 		if (!stripe || !elements) return;

// 		setLoading(true);
// 		const { error } = await stripe.confirmPayment({
// 			elements,
// 			confirmParams: {
// 				return_url: window.location.origin + "/order-success",
// 			},
// 		});

// 		if (error) {
// 			alert(error.message);
// 		}

// 		setLoading(false);
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<PaymentElement />
// 			<Box sx={{ mt: 3 }}>
// 				<Button type="submit" variant="contained" disabled={!stripe || loading}>
// 					{loading ? <CircularProgress size={24} /> : "Pay Now"}
// 				</Button>
// 			</Box>
// 		</form>
// 	);
// }

// export default function CheckoutPage() {
// 	const [clientSecret, setClientSecret] = useState("");
// 	const { cart } = useCart();
// 	const { user } = useAuth();
// 	useEffect(() => {
// 		const fetchClientSecret = async () => {
// 			if (!user || cart.length === 0) return;
// 			const total = cart.reduce(
// 				(sum, item) => sum + item.price * item.quantity,
// 				0
// 			);

// 			const createIntent = httpsCallable(functions, "createPaymentIntent");
// 			const res: any = await createIntent({
// 				amount: total,
// 				metadata: {
// 					items: JSON.stringify(cart),
// 				},
// 			});
// 			setClientSecret(res.data.clientSecret);
// 		};

// 		fetchClientSecret();
// 	}, [cart, user]);

// 	const appearance = {
// 		theme: "stripe",
// 	} as const;

// 	const options = {
// 		clientSecret,
// 		appearance,
// 	};

// 	return (
// 		<Box sx={{ mt: 4 }}>
// 			<Paper sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
// 				<Typography variant="h5" gutterBottom>
// 					Checkout
// 				</Typography>
// 				{clientSecret ? (
// 					<Elements options={options} stripe={stripePromise}>
// 						<CheckoutForm />
// 					</Elements>
// 				) : (
// 					<Typography>Loading payment form...</Typography>
// 				)}
// 			</Paper>
// 		</Box>
// 	);
// }
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

			const createIntent = httpsCallable(functions, "createPaymentIntent");
			const res: any = await createIntent({
				amount: total,
				metadata: {
					items: JSON.stringify(cart),
				},
			});
			setClientSecret(res.data.clientSecret);
		};

		fetchClientSecret();
	}, [cart, user]);

	const appearance = { theme: "stripe" } as const;
	const options = { clientSecret, appearance };

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
					boxShadow: 4,
				}}
			>
				<Stack spacing={3}>
					<Typography variant="h4" fontWeight={600} textAlign="center">
						Checkout
					</Typography>

					{/* 🔙 Back to Cart */}
					<Box sx={{ textAlign: "left" }}>
						<Button onClick={() => navigate("/cart")} size="small">
							← Back to Cart
						</Button>
					</Box>

					{/* 🧾 Order Summary */}
					<Box sx={{ backgroundColor: "#f9f9f9", p: 2, borderRadius: 2 }}>
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
									${(item.price * item.quantity).toFixed(2)}
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
							<Typography variant="body1">${total.toFixed(2)}</Typography>
						</Box>
					</Box>

					{/* 💳 Payment Form */}
					{clientSecret ? (
						<Elements options={options} stripe={stripePromise}>
							<CheckoutForm />
						</Elements>
					) : (
						<Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
							<CircularProgress />
							<Typography>Loading payment form...</Typography>
						</Stack>
					)}
				</Stack>
			</Paper>
		</Box>
	);
}
