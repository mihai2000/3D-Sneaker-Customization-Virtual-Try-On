import { Paper, Stack, Box, Typography, Skeleton } from "@mui/material";

export default function CartSkeleton() {
	return (
		<Paper
			sx={{
				p: 4,
				maxWidth: 1000,
				mx: "auto",
				mt: 6,
				borderRadius: 4,
				background: "rgba(20, 20, 25, 0.8)",
				backdropFilter: "blur(12px)",
				border: "1px solid rgba(255,255,255,0.05)",
				boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
			}}
		>
			<Typography
				variant="h4"
				gutterBottom
				sx={{ color: "#fff", fontWeight: 600 }}
			>
				Your Shopping Cart
			</Typography>

			<Stack spacing={3} sx={{ mt: 3 }}>
				{[1, 2, 3].map((i) => (
					<Box
						key={i}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 2,
							p: 2,
							borderRadius: 3,
							backgroundColor: "rgba(255,255,255,0.03)",
						}}
					>
						<Skeleton variant="rounded" width={64} height={64} />
						<Box sx={{ flexGrow: 1 }}>
							<Skeleton variant="text" width="60%" height={18} />
							<Skeleton variant="text" width="40%" height={16} />
						</Box>
						<Skeleton variant="rounded" width={80} height={36} />
					</Box>
				))}
			</Stack>
		</Paper>
	);
}
