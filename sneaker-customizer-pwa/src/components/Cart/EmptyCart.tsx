import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router";
import emptyCartImage from "../../assets/empty-cart.png";

export default function EmptyCart() {
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 4,
			}}
		>
			<Box
				// violet
				// sx={{
				// 	p: 6,
				// 	maxWidth: 700,
				// 	width: "100%",
				// 	textAlign: "center",
				// 	borderRadius: 4,
				// 	border: "1px solid rgba(200, 100, 255, 0.2)",
				// 	background: "rgba(30, 20, 40, 0.8)",
				// 	boxShadow: `0 0 20px rgba(180, 100, 255, 0.3), 0 0 60px rgba(120, 60, 220, 0.15)`,
				// 	backdropFilter: "blur(12px)",
				// }}
				// blue ice
				sx={{
					p: 6,
					maxWidth: 700,
					width: "100%",
					textAlign: "center",
					borderRadius: 4,
					border: "1px solid rgba(0, 200, 255, 0.15)",
					background: "rgba(20, 25, 35, 0.85)",
					boxShadow: `0 0 24px rgba(0, 229, 255, 0.3), 0 0 80px rgba(0, 229, 255, 0.1)`,
					backdropFilter: "blur(14px)",
				}}
			>
				<img
					src={emptyCartImage}
					alt="Empty Cart"
					style={{
						width: "220px",
						maxWidth: "100%",
						borderRadius: 16,
						marginBottom: "1.5rem",
					}}
				/>
				<Typography variant="h5" fontWeight={700} color="white" gutterBottom>
					Your cart is feeling lonely
				</Typography>
				<Typography variant="body2" sx={{ color: "#ccc", mb: 3 }}>
					Looks like you haven’t added anything yet. Find something you love and
					bring it here.
				</Typography>
				<Button
					onClick={() => navigate("/products")}
					// violet
					// sx={{
					// 	px: 4,
					// 	py: 1.2,
					// 	fontWeight: 600,
					// 	fontSize: "0.875rem",
					// 	borderRadius: 2,
					// 	background: "linear-gradient(90deg, #7e57c2, #ab47bc)",
					// 	color: "#fff",
					// 	boxShadow: "0 0 10px rgba(140, 90, 200, 0.4)",
					// 	"&:hover": {
					// 		background: "linear-gradient(90deg, #9c27b0, #ba68c8)",
					// 		boxShadow: "0 0 18px rgba(160, 70, 255, 0.6)",
					// 	},
					// }}
					// blue
					sx={{
						px: 4,
						py: 1.2,
						fontWeight: 600,
						fontSize: "0.875rem",
						borderRadius: 2,
						background: "linear-gradient(90deg, #00e5ff, #1e88e5)",
						color: "#fff",
						boxShadow: "0 0 10px rgba(0,229,255,0.5)",
						"&:hover": {
							background: "linear-gradient(90deg, #00bcd4, #1565c0)",
							boxShadow: "0 0 20px rgba(0,229,255,0.8)",
						},
					}}
				>
					START SHOPPING
				</Button>
			</Box>
		</Box>
	);
}
