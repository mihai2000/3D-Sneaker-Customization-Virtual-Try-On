import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import noDesign from "../../../assets/no-designs.jpg";

export default function EmptySavedDesigns({
	onCreateNew,
}: {
	onCreateNew: () => void;
}) {
	const theme = useTheme();

	const isDark = theme.palette.mode === "dark";

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<Box sx={{ mt: 6, textAlign: "center" }}>
				<img
					src={noDesign}
					alt="No Designs"
					style={{
						width: 400,
						marginBottom: 16,
						filter: isDark ? "brightness(0.7)" : "none",
					}}
				/>

				<Typography variant="h6" color="text.secondary">
					You haven't saved any designs yet.
				</Typography>

				<Button variant="contained" onClick={onCreateNew} sx={{ mt: 2 }}>
					Start Designing
				</Button>
			</Box>
		</motion.div>
	);
}
