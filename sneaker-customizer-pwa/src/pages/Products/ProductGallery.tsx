import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { shoes } from "../../store/data";
import "./ProductGallery.scss";
import ShoeModelViewer from "../../components/canvas/ShoeModelViewer";
import { Search, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { Chip } from "@mui/material";
import { useCart } from "../../hooks/useCart";
import { fetchProducts } from "../../services/products";

const categories = ["All", "Men", "Women", "Unisex"];

export default function ProductGallery({ product }: { product: any }) {
	const { addToCart } = useCart();

	const [products, setProducts] = useState<any[]>([]);
	const [filtered, setFiltered] = useState<any[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedShoe, setSelectedShoe] = useState<any | null>(null);

	// const filteredStatic = shoes.filter((shoe) =>
	// 	shoe.name.toLowerCase().includes(searchQuery.toLowerCase())
	// );
	useEffect(() => {
		const load = async () => {
			const data = await fetchProducts();
			setProducts(data);
		};
		load();
	}, []);

	useEffect(() => {
		const lower = searchQuery.toLowerCase();
		const result = products.filter(
			(p) =>
				p.name.toLowerCase().includes(lower) &&
				(selectedCategory === "All" || p.category === selectedCategory)
		);
		setFiltered(result);
	}, [products, searchQuery, selectedCategory]);

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
	// const handleAddToCartStatic = (e: any, shoe: any) => {
	// 	e.stopPropagation();
	// 	toast.success(`${shoe.name} added to cart!`);
	// };
	return (
		<div className="featured-products-container">
			<div className="search-section">
				<div className="search-bar-wrapper">
					<div className="search-bar">
						<Search className="search-icon" />
						<input
							type="text"
							placeholder="Search products..."
							className="search-input"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>
				<div className="category-filters">
					{categories.map((cat) => (
						<Chip
							key={cat}
							label={cat}
							color={cat === selectedCategory ? "primary" : "default"}
							onClick={() => setSelectedCategory(cat)}
							clickable
							sx={{ mr: 1 }}
						/>
					))}
				</div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="product-grid"
				>
					<AnimatePresence>
						{filtered.map((shoe) => (
							<motion.div
								key={shoe.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								whileHover={{ y: -10 }}
								className="product-card"
								onClick={() => setSelectedShoe(shoe)}
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
											<span className="product-price">${shoe.price}</span>
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={handleAddToCart}
												// onClick={(e) => handleAddToCartStatic(e, shoe)}
												className="add-to-cart-button"
											>
												<ShoppingCart className="cart-icon" />
												Add to Cart
											</motion.button>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{selectedShoe && (
				<ShoeModelViewer
					isOpen={true}
					onClose={() => setSelectedShoe(null)}
					modelUrl={selectedShoe?.modelUrl ?? ""}
					shoeName={selectedShoe?.name}
				/>
			)}
		</div>
	);
}

// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { fetchProducts } from "../../services/products";

// import "./ProductGallery.scss";
// import ProductFilters from "../../components/Products/ProductFilters";
// import ProductCard from "../../components/Products/ProductCard";
// import ShoeModelViewer from "../../components/canvas/ShoeModelViewer";

// const ProductGallery: React.FC = () => {
// 	const [products, setProducts] = useState<any[]>([]);
// 	const [filtered, setFiltered] = useState<any[]>([]);
// 	const [search, setSearch] = useState("");
// 	const [selectedCategory, setSelectedCategory] = useState("All");
// 	const [selectedShoe, setSelectedShoe] = useState<any | null>(null);

// 	useEffect(() => {
// 		const load = async () => {
// 			const data = await fetchProducts();
// 			setProducts(data);
// 		};
// 		load();
// 	}, []);

// 	useEffect(() => {
// 		const lower = search.toLowerCase();
// 		const result = products.filter(
// 			(p) =>
// 				p.name.toLowerCase().includes(lower) &&
// 				(selectedCategory === "All" || p.category === selectedCategory)
// 		);
// 		setFiltered(result);
// 	}, [products, search, selectedCategory]);

// 	return (
// 		<div className="product-gallery">
// 			<ProductFilters
// 				search={search}
// 				setSearch={setSearch}
// 				selectedCategory={selectedCategory}
// 				setSelectedCategory={setSelectedCategory}
// 			/>

// 			<motion.div className="card-grid" layout>
// 				<AnimatePresence>
// 					{filtered.map((product) => (
// 						<ProductCard
// 							key={product.id}
// 							product={product}
// 							onClick={() => setSelectedShoe(product)}
// 						/>
// 					))}
// 				</AnimatePresence>
// 			</motion.div>

// 			{selectedShoe && (
// 				<ShoeModelViewer
// 					isOpen={true}
// 					onClose={() => setSelectedShoe(null)}
// 					modelUrl={selectedShoe.model}
// 					shoeName={selectedShoe.name}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default ProductGallery;
