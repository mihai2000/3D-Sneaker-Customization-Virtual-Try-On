import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
import emptyCartImage from "../../assets/empty-cart.png"; // adjust the path as needed

export default function EmptyCart() {
	const navigate = useNavigate();

	return (
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
				src={emptyCartImage}
				alt="Empty Cart"
				style={{ width: "220px", maxWidth: "100%" }}
			/>
			<Typography variant="h6" sx={{ mt: 2 }}>
				Your cart is empty.
			</Typography>
			<Typography variant="body2" color="text.secondary">
				Looks like you haven’t added anything to your cart. Go ahead and explore
				out many items.
			</Typography>
			<Button variant="contained" onClick={() => navigate("/products")}>
				Go Shopping
			</Button>
		</Box>
	);
}
