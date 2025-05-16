import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import "./ProductComponents.scss";

export function ProductCard({
	shoe,
	onSelect,
}: {
	shoe: any;
	onSelect: () => void;
}) {
	const { addToCart } = useCart();

	const handleAddToCart = (e: React.MouseEvent) => {
		e.stopPropagation(); // prevent opening viewer
		addToCart({
			id: shoe.id,
			name: shoe.name,
			price: shoe.price,
			quantity: 1,
			image: shoe.image,
		});
		toast.success(`${shoe.name} added to cart!`);
	};

	return (
		<div
			className="product-card"
			onClick={onSelect}
			style={{ transition: "transform 0.2s ease" }}
			onMouseEnter={(e) =>
				(e.currentTarget.style.transform = "translateY(-5px)")
			}
			onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
		>
			<div className="card-glow" />
			<div className="card-inner">
				<div className="image-container">
					<motion.img
						src={shoe.image}
						alt={shoe.name}
						className="product-image"
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.4 }}
					/>
				</div>

				<div className="product-details">
					<h2 className="product-title">{shoe.name}</h2>
					<p className="product-description">{shoe.description}</p>
					<div className="product-footer">
						<span className="product-price">RON{shoe.price}</span>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={handleAddToCart}
							className="add-to-cart-button"
						>
							<ShoppingCart className="cart-icon" />
							Add to Cart
						</motion.button>
					</div>
				</div>
			</div>
		</div>
	);
}
