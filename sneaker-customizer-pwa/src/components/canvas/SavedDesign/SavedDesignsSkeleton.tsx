import { Grid, Skeleton, Box, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

export default function SavedDesignsSkeleton() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
		>
			<Grid container spacing={3}>
				{Array.from({ length: 6 }).map((_, idx) => (
					<Grid item xs={12} sm={6} md={4} key={idx}>
						<Card sx={{ borderRadius: 2 }}>
							<Skeleton variant="rectangular" height={180} animation="wave" />
							<CardContent>
								<Skeleton variant="text" width="60%" />
								<Skeleton variant="text" width="40%" />
								<Box sx={{ mt: 2, display: "flex", gap: 1 }}>
									<Skeleton variant="rectangular" width={80} height={36} />
									<Skeleton variant="rectangular" width={80} height={36} />
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</motion.div>
	);
}
