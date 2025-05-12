import { Box, TextField, Chip, Stack } from '@mui/material';

const categories = ['All', 'Men', 'Women', 'Unisex', 'Kids'];

export default function ProductFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}: {
  search: string;
  setSearch: (v: string) => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
}) {
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
            color={cat === selectedCategory ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(cat)}
            clickable
          />
        ))}
      </Stack>
    </Box>
  );
}
