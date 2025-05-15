// import { Box, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router";
// import emptyCartImage from "../../assets/empty-cart.png"; // adjust the path as needed

// export default function EmptyCart() {
// 	const navigate = useNavigate();

// 	return (
// 		<Box
// 			sx={{
// 				textAlign: "center",
// 				py: 6,
// 				display: "flex",
// 				flexDirection: "column",
// 				alignItems: "center",
// 				gap: 2,
// 			}}
// 		>
// 			<img
// 				src={emptyCartImage}
// 				alt="Empty Cart"
// 				style={{ width: "220px", maxWidth: "100%" }}
// 			/>
// 			<Typography variant="h6" sx={{ mt: 2 }}>
// 				Your cart is empty.
// 			</Typography>
// 			<Typography variant="body2" color="text.secondary">
// 				Looks like you haven’t added anything to your cart. Go ahead and explore
// 				out many items.
// 			</Typography>
// 			<Button variant="contained" onClick={() => navigate("/products")}>
// 				Go Shopping
// 			</Button>
// 		</Box>
// 	);
// }
import { Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router";
import emptyCartImage from "../../assets/empty-cart.png";

export default function EmptyCart() {
	const navigate = useNavigate();

	return (
		<Paper
			sx={{
				background: "radial-gradient(circle at top, #0e0e11, #08090c)",
				minHeight: "80vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				px: 3,
				py: 6,
				flexDirection: "column",
				textAlign: "center",
				borderRadius: 4,
				boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
			}}
		>
			<img
				src={emptyCartImage}
				alt="Empty Cart"
				style={{
					width: 220,
					maxWidth: "100%",
					filter: "brightness(0.9)",
					marginBottom: 20,
				}}
			/>
			<Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
				Your cart is empty.
			</Typography>
			<Typography variant="body2" sx={{ color: "#aaa", maxWidth: 400 }}>
				Looks like you haven’t added anything to your cart yet. Start browsing
				and add some items you love!
			</Typography>
			<Button
				variant="contained"
				sx={{ mt: 3 }}
				onClick={() => navigate("/products")}
			>
				Go Shopping
			</Button>
		</Paper>
	);
}
