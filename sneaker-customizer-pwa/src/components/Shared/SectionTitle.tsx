import { Typography } from "@mui/material";

export default function SectionTitle({ title }: { title: string }) {
	return (
		<Typography
			variant="h4"
			sx={{
				color: "#fff",
				textAlign: "center",
				fontWeight: 700,
				mb: 3,
				width: "100%",
			}}
		>
			{title}
		</Typography>
	);
}
