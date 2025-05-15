import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks/useCart";
import { DesignData } from "../../../types/designs";
import ShoeModelViewer from "../ShoeModelViewer/ShoeModelViewer";
interface Props {
	design: DesignData;
	existingNames: string[];
	onClose: () => void;
}
export default function DesignViewer({
	design,
	existingNames,
	onClose,
}: Props) {
	const { addToCart } = useCart();

	const generateName = () => {
		let n = 1;
		const prefix = "Custom product ";
		while (existingNames.includes(`${prefix}${n}`)) n++;
		return `${prefix}${n}`;
	};

	const handleAddToCart = () => {
		const name = generateName();
		addToCart({
			id: design.id,
			name,
			price: 0.2,
			quantity: 1,
			image: design.previewImageUrl,
		});
		toast.success(`${name} added to cart!`);
		onClose();
	};

	return (
		<>
			<ShoeModelViewer
				isOpen={true}
				onClose={onClose}
				modelUrl={design.modelUrl}
				shoeName="Your Saved Design"
			/>
			<Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
				<Button variant="contained" color="primary" onClick={handleAddToCart}>
					Add to Cart
				</Button>
			</Box>
		</>
	);
}
