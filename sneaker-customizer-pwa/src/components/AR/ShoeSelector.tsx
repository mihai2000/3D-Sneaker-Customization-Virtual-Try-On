import './ShoeSelector.scss';

interface Shoe {
  id: string;
  model: string;
  image: string;
  name: string;
}

interface Props {
  onSelect: (shoe: Shoe) => void;
  selectedShoeId?: string;
}

const shoes: Shoe[] = [
  {
    id: 'shoe1',
    model: '/models/nike_air_zoom_pegasus_36.glb',
    image:
      'https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.firebasestorage.app/o/Nike_Air_Zoom_Pegasus_36.jpg?alt=media&token=97495791-2eb4-4a6f-939d-217605dd0695',
    name: 'Nike Air Zoom Pegasus 36',
  },
  {
    id: 'shoe2',
    model: '/models/nike_military.glb',
    image:
      'https://firebasestorage.googleapis.com/v0/b/threed-sneakers-customisation.firebasestorage.app/o/Nike_SB_Zoom_Dunk.avif?alt=media&token=24d96c98-1db9-42eb-bcbd-f95aef5a96cb',
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
