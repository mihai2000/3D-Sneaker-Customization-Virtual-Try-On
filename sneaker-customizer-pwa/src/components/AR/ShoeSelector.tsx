import { Shoe } from '../../interfaces/shoeInterface';
import './ShoeSelector.scss';

interface Props {
  onSelect: (shoe: Shoe) => void;
  selectedShoeId?: string;
  shoes: Shoe[];
}

export default function ShoeSelector({
  onSelect,
  selectedShoeId,
  shoes,
}: Props) {
  return shoes.length === 0 ? (
    <p>No shoes available for AR 🥾</p>
  ) : (
    <div className="shoe-carousel">
      {shoes.map((shoe) => (
        <button
          key={shoe.id}
          className={`shoe-button ${selectedShoeId === shoe.id ? 'active' : ''}`}
          onClick={() => onSelect(shoe)}
        >
          <img className="shoe-image" src={shoe.image} alt={shoe.name} />
        </button>
      ))}
    </div>
  );
}
