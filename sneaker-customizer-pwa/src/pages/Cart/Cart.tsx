// import { useEffect, useState } from "react";
// import {
// 	Box,
// 	Typography,
// 	Paper,
// 	IconButton,
// 	Button,
// 	Divider,
// 	Avatar,
// 	Card,
// 	CardContent,
// 	Stack,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
// import ClearAllIcon from "@mui/icons-material/ClearAll";
// import { useCart } from "../../hooks/useCart";
// import { useNavigate } from "react-router";
// import CartSkeleton from "../../components/Cart/CartSkeleton";
// import EmptyCart from "../../components/Cart/EmptyCart";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";

// export default function CartPage() {
// 	const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
// 	const navigate = useNavigate();
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const timeout = setTimeout(() => setLoading(false), 1000);
// 		return () => clearTimeout(timeout);
// 	}, []);

// 	const handleClearCart = () => {
// 		clearCart();
// 		toast.info("Cart has been cleared.");
// 	};

// 	const handleRemoveItem = (id: string, name: string) => {
// 		removeFromCart(id);
// 		toast.warn(`${name} removed from cart.`);
// 	};

// 	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

// 	if (loading) return <CartSkeleton />;
// 	if (cart.length === 0) return <EmptyCart />;

// 	return (
//       <AnimatePresence mode="wait">
//         {loading ? (
//           <motion.div
//             key="skeleton"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <CartSkeleton />
//           </motion.div>
//         ) : cart.length === 0 ? (
//           <motion.div
//             key="empty"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//           >
//             <EmptyCart />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="cart"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//           >
//             <Paper
//               sx={{
//                 p: 4,
//                 maxWidth: 900,
//                 mx: "auto",
//                 mt: 6,
//                 borderRadius: 4,
//                 boxShadow: 4,
//               }}
//             >
//               <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
//                 Your Shopping Cart
//               </Typography>

//               <Stack spacing={2} sx={{ mt: 3 }}>
//                 <AnimatePresence>
//                   {cart.map((item) => (
//                     <motion.div
//                       key={item.id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <Card variant="outlined" sx={{ borderRadius: 3 }}>
//                         <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                           <Avatar
//                             src={item.image}
//                             alt={item.name}
//                             variant="rounded"
//                             sx={{ width: 64, height: 64 }}
//                           />
//                           <Box sx={{ flexGrow: 1 }}>
//                             <Typography variant="subtitle1" fontWeight={500}>
//                               {item.name}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               ${item.price.toFixed(2)} each
//                             </Typography>
//                           </Box>
//                           <Stack direction="row" alignItems="center">
//                             <IconButton
//                               size="small"
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity - 1)
//                               }
//                               disabled={item.quantity <= 1}
//                             >
//                               <RemoveIcon />
//                             </IconButton>
//                             <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
//                             <IconButton
//                               size="small"
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity + 1)
//                               }
//                             >
//                               <AddIcon />
//                             </IconButton>
//                           </Stack>
//                           <IconButton
//                             color="error"
//                             onClick={() => handleRemoveItem(item.id, item.name)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </Stack>

//               <Divider sx={{ my: 4 }} />

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   flexWrap: "wrap",
//                   alignItems: "center",
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                   Total: ${total.toFixed(2)}
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={handleClearCart}
//                     startIcon={<ClearAllIcon />}
//                   >
//                     Clear Cart
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => navigate("/checkout")}
//                     startIcon={<ShoppingCartCheckoutIcon />}
//                   >
//                     Checkout
//                   </Button>
//                 </Box>
//               </Box>
//             </Paper>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     );
// }
import { useEffect, useState } from "react";
import {
	Box,
	Typography,
	Paper,
	IconButton,
	Button,
	Divider,
	Avatar,
	Card,
	CardContent,
	Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router";
import CartSkeleton from "../../components/Cart/CartSkeleton";
import EmptyCart from "../../components/Cart/EmptyCart";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
	const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timeout);
	}, []);

	const handleClearCart = () => {
		clearCart();
		toast.info("Cart has been cleared.");
	};

	const handleRemoveItem = (id: string, name: string) => {
		removeFromCart(id);
		toast.warn(`${name} removed from cart.`);
	};

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<AnimatePresence mode="wait">
			{loading ? (
				<motion.div
					key="skeleton"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<CartSkeleton />
				</motion.div>
			) : cart.length === 0 ? (
				<motion.div
					key="empty"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.95 }}
				>
					<EmptyCart />
				</motion.div>
			) : (
				<motion.div
					key="cart"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0 }}
				>
					<Paper
						sx={{
							p: 4,
							maxWidth: 1000,
							mx: "auto",
							mt: 6,
							borderRadius: 4,
							boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
							background: "rgba(20, 20, 25, 0.8)",
							backdropFilter: "blur(12px)",
							border: "1px solid rgba(255,255,255,0.05)",
						}}
					>
						<Typography
							variant="h4"
							gutterBottom
							sx={{ fontWeight: 600, color: "#fff" }}
						>
							Your Shopping Cart
						</Typography>

						<Stack spacing={3} sx={{ mt: 3 }}>
							<AnimatePresence>
								{cart.map((item) => (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
									>
										<Card
											variant="outlined"
											sx={{
												borderRadius: 3,
												backgroundColor: "#121212",
												border: "1px solid rgba(255,255,255,0.06)",
											}}
										>
											<CardContent
												sx={{ display: "flex", alignItems: "center", gap: 2 }}
											>
												<Avatar
													src={item.image}
													alt={item.name}
													variant="rounded"
													sx={{ width: 64, height: 64, borderRadius: 2 }}
												/>
												<Box sx={{ flexGrow: 1 }}>
													<Typography
														variant="subtitle1"
														fontWeight={600}
														color="#fff"
													>
														{item.name}
													</Typography>
													<Typography variant="body2" color="#aaa">
														${item.price.toFixed(2)} each
													</Typography>
												</Box>
												<Stack direction="row" alignItems="center">
													<IconButton
														size="small"
														onClick={() =>
															updateQuantity(item.id, item.quantity - 1)
														}
														disabled={item.quantity <= 1}
													>
														<RemoveIcon />
													</IconButton>
													<Typography sx={{ mx: 1, color: "#fff" }}>
														{item.quantity}
													</Typography>
													<IconButton
														size="small"
														onClick={() =>
															updateQuantity(item.id, item.quantity + 1)
														}
													>
														<AddIcon />
													</IconButton>
												</Stack>
												<IconButton
													color="error"
													onClick={() => handleRemoveItem(item.id, item.name)}
												>
													<DeleteIcon />
												</IconButton>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</AnimatePresence>
						</Stack>

						<Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
								alignItems: "center",
								gap: 2,
							}}
						>
							<Typography variant="h6" sx={{ fontWeight: 600, color: "#fff" }}>
								Total: ${total.toFixed(2)}
							</Typography>

							<Box sx={{ display: "flex", gap: 1 }}>
								<Button
									variant="outlined"
									color="secondary"
									onClick={handleClearCart}
									startIcon={<ClearAllIcon />}
								>
									Clear Cart
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={() => navigate("/checkout")}
									startIcon={<ShoppingCartCheckoutIcon />}
								>
									Checkout
								</Button>
							</Box>
						</Box>
					</Paper>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
