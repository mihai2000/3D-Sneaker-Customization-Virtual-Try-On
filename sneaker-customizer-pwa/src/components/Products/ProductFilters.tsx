import { Chip } from '@mui/material';
import { Search } from 'lucide-react';
import './ProductComponents.scss'
export function ProductFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
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
            color={cat === selectedCategory ? 'primary' : 'default'}
            onClick={() => setSelectedCategory(cat)}
            clickable
            sx={{ mr: 1 }}
          />
        ))}
      </div>
    </div>
  );
}
