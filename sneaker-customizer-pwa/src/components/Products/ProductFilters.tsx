import { Box, TextField, Chip, Stack } from "@mui/material";
import React from "react";

const categories = ["All", "Men", "Women", "Unisex", "Kids"];

interface Props {
	search: string;
	setSearch: (v: string) => void;
	selectedCategory: string;
	setSelectedCategory: (v: string) => void;
}

const ProductFilters: React.FC<Props> = ({
	search,
	setSearch,
	selectedCategory,
	setSelectedCategory,
}) => {
	return (
		<Box sx={{ mb: 4 }}>
			<TextField
				label="Search products"
				variant="outlined"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				fullWidth
				sx={{ mb: 2 }}
			/>
			<Stack direction="row" spacing={1}>
				{categories.map((cat) => (
					<Chip
						key={cat}
						label={cat}
						color={cat === selectedCategory ? "primary" : "default"}
						onClick={() => setSelectedCategory(cat)}
						clickable
					/>
				))}
			</Stack>
		</Box>
	);
};

export default ProductFilters;
