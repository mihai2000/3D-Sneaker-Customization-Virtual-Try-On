import { useState } from 'react';
import './ShoeSelector.scss';

interface Shoe {
  id: string;
  model: string;
  image: string;
  alt: string;
}

interface Props {
  onSelect: (shoe: Shoe) => void;
}

const shoes: Shoe[] = [
  // {
  //   id: 'shoe1',
  //   model: '/models/Air_Jordan_1_Retro_High_OG_University_Blue.glb',
  //   image: '/images/Air_Jordan_1_Retro_High_OG_University_Blue.png',
  //   alt: 'Air Jordan 1 Retro High OG University Blue',
  // },
  // {
  //   id: 'shoe2',
  //   model: '/models/Blue_Crocs.glb',
  //   image: '/images/Blue_Crocs.png',
  //   alt: 'Blue Crocs',
  // },
  // {
  //   id: 'shoe3',
  //   model:
  //     '/models/Nike_Air_Force_1_Low_UNDEFEATED_Multi-Patent_Wild_Berry.glb',
  //   image:
  //     '/images/Nike_Air_Force_1_Low_UNDEFEATED_Multi-Patent_Wild_Berry.png',
  //   alt: 'Nike Air Force 1 Low UNDEFEATED Multi-Patent Wild Berry',
  // },
  // {
  //   id: 'shoe4',
  //   model: '/models/Green_Adidas.glb',
  //   image: '/images/Green_Adidas.png',
  //   alt: 'Green Adidas',
  // },
  // {
  //   id: 'shoe5',
  //   model: '/models/Nike_Air_Force_1_Low_UNDEFEATED_Gold.glb',
  //   image: '/images/Nike_Air_Force_1_Low_UNDEFEATED_Gold.png',
  //   alt: 'Nike Air Force 1 Low UNDEFEATED Gold',
  // },
  // {
  //   id: 'shoe6',
  //   model: '/models/White_Sneakers_Pink_Back.glb',
  //   image: '/images/White_Sneakers_Pink_Back.png',
  //   alt: 'White Sneakers Pink Back',
  // },
  {
    id: 'shoe1',
    model: '/models/nike_air_zoom_pegasus_36.glb',
    image: '/images/nike_air_zoom_pegasus_36.png',
    alt: 'nike_air_zoom_pegasus_36',
  },
  {
    id: 'shoe2',
    model: '/models/nike_military.glb',
    image: '/images/nike_military.png',
    alt: 'nike_military',
  },
];

export default function ShoeSelector({ onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string>(shoes[0].id);

  const handleSelect = (shoe: Shoe) => {
    setSelectedId(shoe.id);
    onSelect(shoe);
  };

  return (
    <div className="shoe-carousel">
      {shoes.map((shoe) => (
        <button
          key={shoe.id}
          className={`shoe-button ${selectedId === shoe.id ? 'active' : ''}`}
          onClick={() => handleSelect(shoe)}
        >
          <img src={shoe.image} alt={shoe.alt} className="shoe-image" />
        </button>
      ))}
    </div>
  );
}
