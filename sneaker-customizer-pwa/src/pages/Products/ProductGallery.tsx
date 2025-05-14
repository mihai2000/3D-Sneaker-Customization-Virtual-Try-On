import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ProductGallery.scss";
import ShoeModelViewer from "../../components/canvas/ShoeModelViewer";
import { fetchProducts } from "../../services/products";
import { ProductFilter } from "../../components/Products/ProductFilters";
import { ProductCard } from "../../components/Products/ProductCard";

const categories = ["All", "Men", "Women", "Unisex"];

export default function ProductPage() {
	const [products, setProducts] = useState<any[]>([]);
	const [filtered, setFiltered] = useState<any[]>([]);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedShoe, setSelectedShoe] = useState<any | null>(null);

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

	return (
		<div className="featured-products-container">
			<ProductFilter
				categories={categories}
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="product-grid"
			>
				<AnimatePresence>
					{filtered.map((shoe) => (
						<ProductCard
							key={shoe.id}
							shoe={shoe}
							onSelect={() => setSelectedShoe(shoe)}
						/>
					))}
				</AnimatePresence>
			</motion.div>

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
