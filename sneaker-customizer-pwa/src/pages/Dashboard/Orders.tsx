import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
	Box,
	Typography,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Stack,
	Button,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import emptyOrdersImg from "../../assets/empty-orders.jpg";

interface Order {
	id: string;
	total: number;
	status: string;
	createdAt?: any;
	items: {
		id: string;
		name: string;
		price: number;
		quantity: number;
		image: string;
	}[];
}

export default function Orders() {
	const { user } = useAuth();
	const [orders, setOrders] = useState<Order[]>([]);

	// Inject animations into <head>
	useEffect(() => {
		const style = document.createElement("style");
		style.innerHTML = `
						@keyframes gradientMove {
							0% { background-position: 0% 50%; }
							50% { background-position: 100% 50%; }
							100% { background-position: 0% 50%; }
						}
			
						@keyframes pulseGlow {
							0% { text-shadow: 0 0 6px rgba(58, 94, 255, 0.5); }
							50% { text-shadow: 0 0 12px rgba(58, 94, 255, 0.9); }
							100% { text-shadow: 0 0 6px rgba(58, 94, 255, 0.5); }
						}
					`;
		document.head.appendChild(style);
	}, []);

	useEffect(() => {
		const fetchOrders = async () => {
			// mock data test
			// if (user) {
			// 	// Show static mock data for testing
			// 	setOrders([
			// 		{
			// 			id: "test-order-123",
			// 			total: 149.97,
			// 			status: "succeeded",
			// 			createdAt: { seconds: Date.now() / 1000 },
			// 			items: [
			// 				{
			// 					id: "shoe-001",
			// 					name: "Nike Air Max 270",
			// 					price: 49.99,
			// 					quantity: 3,
			// 					image:
			// 						"https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.firebasestorage.app/o/Puma_RS-X.avif?alt=media&token=195a87b3-cfa7-49e9-b7ba-b83cb09210db",
			// 				},
			// 			],
			// 		},
			// 	]);
			// 	return;
			// }
			if (!user) return;

			const q = query(
				collection(db, "orders"),
				where("userId", "==", user.uid)
			);
			const snap = await getDocs(q);
			const results: Order[] = snap.docs.map((doc) => ({
				id: doc.id,
				...(doc.data() as Omit<Order, "id">),
			}));
			results.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
			setOrders(results);
		};

		fetchOrders();
	}, [user]);

	return (
		<Box
			sx={{
				minHeight: "100vh",
				background:
					"linear-gradient(-45deg, #0f0f11, #1e1f29, #121317, #090a0f)",
				backgroundSize: "400% 400%",
				animation: "gradientMove 20s ease infinite",
				p: 4,
			}}
		>
			<Box
				sx={{
					backdropFilter: "blur(12px)",
					backgroundColor: "rgba(255, 255, 255, 0.03)",
					border: "1px solid rgba(255, 255, 255, 0.08)",
					borderRadius: 4,
					p: 4,
					maxWidth: 900,
					mx: "auto",
					boxShadow: "0 0 30px rgba(0, 0, 0, 0.6)",
				}}
			>
				<Typography
					variant="h4"
					gutterBottom
					sx={{ fontWeight: 700, color: "#ffffff", textAlign: "center" }}
				>
					Your Orders
				</Typography>

				{orders.length === 0 ? (
					<Box
						sx={{
							textAlign: "center",
							py: 6,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 2,
						}}
					>
						<img
							src={emptyOrdersImg}
							alt="No Orders"
							style={{ width: "220px", maxWidth: "100%", borderRadius: 12 }}
						/>
						<Typography variant="h6" fontWeight={500} sx={{ color: "white" }}>
							No Orders Yet
						</Typography>
						<Typography variant="body2" sx={{ color: "#aaa" }}>
							You haven't placed any orders. Once you do, they'll show up here.
						</Typography>
						<Button
							sx={{
								mt: 2,
								px: 3,
								py: 1,
								fontWeight: 600,
								color: "#fff",
								background: "linear-gradient(90deg, #3A5EFF, #3E9DF7)",
								borderRadius: 2,
								"&:hover": {
									background: "linear-gradient(90deg, #3E9DF7, #3A5EFF)",
								},
							}}
							onClick={() => (window.location.href = "/products")}
						>
							Start Shopping
						</Button>
					</Box>
				) : (
					<Stack spacing={3}>
						{orders.map((order) => (
							<Card
								key={order.id}
								sx={{
									position: "relative",
									overflow: "hidden",
									borderRadius: 3,
									background: "rgba(20, 20, 22, 0.85)",
									backdropFilter: "blur(10px)",
									border: "1px solid rgba(255, 255, 255, 0.1)",
									boxShadow: "0 0 12px rgba(58, 94, 255, 0.15)",
									color: "white",
									"&::after": {
										content: '""',
										position: "absolute",
										top: 0,
										left: "-75%",
										width: "50%",
										height: "100%",
										background:
											"linear-gradient(120deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
										transform: "skewX(-20deg)",
										transition: "left 0.6s ease-in-out",
									},
									"&:hover::after": {
										left: "125%",
									},
								}}
							>
								<CardContent>
									<Box display="flex" alignItems="center" gap={1} mb={1}>
										<ReceiptLongIcon sx={{ color: "#3A5EFF" }} />
										<Typography variant="subtitle1" fontWeight={500}>
											Order ID: {order.id}
										</Typography>
									</Box>
									<Typography
										variant="body2"
										sx={{
											color: "#aaa",
											mb: 2,
											"& strong": {
												color: "#3A5EFF",
												animation: "pulseGlow 3s infinite",
												fontWeight: 600,
											},
										}}
									>
										Total: <strong>${order.total.toFixed(2)}</strong> | Status:{" "}
										{order.status}
									</Typography>
									<List dense>
										{order.items.map((item) => (
											<ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
												<ListItemAvatar>
													<Avatar
														src={item.image}
														alt={item.name}
														variant="rounded"
														sx={{
															width: 56,
															height: 56,
															borderRadius: 2,
															border: "1px solid #333",
														}}
													/>
												</ListItemAvatar>
												<ListItemText
													primary={`${item.name} × ${item.quantity}`}
													secondary={`$${item.price.toFixed(2)} each`}
													primaryTypographyProps={{
														color: "white",
														fontWeight: 500,
													}}
													secondaryTypographyProps={{
														color: "#888",
													}}
													sx={{ ml: 2 }}
												/>
											</ListItem>
										))}
									</List>
								</CardContent>
							</Card>
						))}
					</Stack>
				)}
			</Box>
		</Box>
	);
}
