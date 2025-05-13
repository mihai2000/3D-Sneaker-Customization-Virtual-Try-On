import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { shoes } from "../../store/data";
import "./ProductGallery.scss";
import ShoeModelViewer from "../../components/canvas/ShoeModelViewer";

const ProductGallery: React.FC = () => {
	const [search, setSearch] = useState("");
	const [selectedShoe, setSelectedShoe] = useState<any | null>(null);

	const filtered = shoes.filter((shoe) =>
		shoe.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="product-gallery">
			<input
				type="text"
				placeholder="Search shoes..."
				className="search-input"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<motion.div className="card-grid" layout>
				<AnimatePresence>
					{filtered.map((shoe) => (
						<motion.div
							className="product-card"
							key={shoe.id}
							layout
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.3 }}
							onClick={() => setSelectedShoe(shoe)}
						>
							<div className="image-wrapper">
								<img src={shoe.image} alt={shoe.name} />
							</div>
							<div className="card-content">
								<h2>{shoe.name}</h2>
								<p>{shoe.description}</p>
								<span className="price">${shoe.price}</span>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>

			{selectedShoe && (
				<ShoeModelViewer
					isOpen={true}
					onClose={() => setSelectedShoe(null)}
					modelUrl={selectedShoe.modelUrl}
					shoeName={selectedShoe.name}
				/>
			)}
		</div>
	);
};

export default ProductGallery;
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
