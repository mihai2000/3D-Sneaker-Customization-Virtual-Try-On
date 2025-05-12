import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
} from "@mui/material";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";

export default function ProductCard({ product }: { product: any }) {
	const { addToCart } = useCart();
	const handleAddToCart = () => {
		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
			image: product.image,
		});
		toast.success(`${product.name} added to cart!`);
	};
	return (
		<Card sx={{ maxWidth: 300 }}>
			<CardMedia
				component="img"
				height="200"
				image={product.image}
				alt={product.name}
			/>
			<CardContent>
				<Typography variant="h6">{product.name}</Typography>
				<Typography variant="body2">{product.price}RON</Typography>
				<Button variant="contained" sx={{ mt: 1 }} onClick={handleAddToCart}>
					Add to Cart
				</Button>
			</CardContent>
		</Card>
	);
}
