import { Shoe } from '../../interfaces/shoeInterface';
import './ShoeSelector.scss';

interface Props {
  onSelect: (shoe: Shoe) => void;
  selectedShoeId?: string;
}

const shoes: Shoe[] = [
  {
    id: 'shoe1',
    model: '/models/nike_air_zoom_pegasus_36.glb',
    image: '/images/Nike_Air_Zoom_Pegasus_36.jpg',
    name: 'Nike Air Zoom Pegasus 36',
  },
  {
    id: 'shoe2',
    model: '/models/nike_military.glb',
    image: '/images/Nike_SB_Zoom_Dunk.jpg',
    name: 'Nike SB Zoom Dunk',
  },
];

export default function ShoeSelector({ onSelect, selectedShoeId }: Props) {
  return (
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
