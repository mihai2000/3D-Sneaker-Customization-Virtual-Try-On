// import { useEffect, useState } from 'react';
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Typography,
//   Divider,
//   ListItemAvatar,
//   Avatar,
//   Box,
// } from '@mui/material';
// import { db } from '../../services/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import SectionTitle from '../../components/Shared/SectionTitle';
// import { useAuth } from '../../hooks/useAuth';

// interface Order {
//   id: string;
//   total: number;
//   status: string;
//   createdAt?: any;
//   items: {
//     id: string;
//     name: string;
//     price: number;
//     quantity: number;
//     image: string;
//   }[];
// }

// export default function Orders() {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState<Order[]>([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!user) return;

//       const q = query(
//         collection(db, 'orders'),
//         where('userId', '==', user.uid)
//       );

//       const snap = await getDocs(q);
//       const results: Order[] = snap.docs.map((doc) => ({
//         id: doc.id,
//         ...(doc.data() as Omit<Order, 'id'>),
//       }));
//       results.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

//       setOrders(results);
//     };

//     fetchOrders();
//   }, [user]);

//   return (
//     <Paper sx={{ p: 4 }}>
//       <SectionTitle title="Your Orders" />

//       {orders.length === 0 ? (
//         <Typography>No orders found.</Typography>
//       ) : (
//         orders.map((order) => (
//           <Box key={order.id} sx={{ mb: 4 }}>
//             <Typography variant="subtitle1" gutterBottom>
//               🧾 Order ID: {order.id}
//             </Typography>
//             <Typography variant="body2">
//               Total: ${order.total.toFixed(2)} | Status: {order.status}
//             </Typography>
//             <List dense>
//               {order.items.map((item) => (
//                 <ListItem key={item.id}>
//                   <ListItemAvatar>
//                     <Avatar
//                       src={item.image}
//                       alt={item.name}
//                       variant="square"
//                       sx={{ width: 56, height: 56 }}
//                     />
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={`${item.name} × ${item.quantity}`}
//                     secondary={`$${item.price.toFixed(2)} each`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//             <Divider sx={{ mt: 2 }} />
//           </Box>
//         ))
//       )}
//     </Paper>
//   );
// }
import { useEffect, useState } from "react";
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
import { db } from "../../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
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
		<Box sx={{ p: 4, maxWidth: 900, mx: "auto", mt: 6 }}>
			<Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
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
					<Typography variant="h6" fontWeight={500}>
						No Orders Yet
					</Typography>
					<Typography variant="body2" color="text.secondary">
						You haven't placed any orders. Once you do, they'll show up here.
					</Typography>
					<Button
						variant="contained"
						onClick={() => (window.location.href = "/products")}
					>
						Start Shopping
					</Button>
				</Box>
			) : (
				<Stack spacing={3}>
					{orders.map((order) => (
						<Card key={order.id} variant="outlined" sx={{ borderRadius: 3 }}>
							<CardContent>
								<Box display="flex" alignItems="center" gap={1} mb={1}>
									<ReceiptLongIcon color="primary" />
									<Typography variant="subtitle1" fontWeight={500}>
										Order ID: {order.id}
									</Typography>
								</Box>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mb: 2 }}
								>
									Total: ${order.total.toFixed(2)} | Status: {order.status}
								</Typography>
								<List dense>
									{order.items.map((item) => (
										<ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
											<ListItemAvatar>
												<Avatar
													src={item.image}
													alt={item.name}
													variant="square"
													sx={{ width: 48, height: 48 }}
												/>
											</ListItemAvatar>
											<ListItemText
												primary={`${item.name} × ${item.quantity}`}
												secondary={`$${item.price.toFixed(2)} each`}
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
	);
}
