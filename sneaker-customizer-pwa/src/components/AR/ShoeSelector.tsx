interface Shoe {
  id: string;
  model: string;
}

interface Props {
  onSelect: (shoe: Shoe) => void;
}

export default function ShoeSelector({ onSelect }: Props) {
  const shoes: Shoe[] = [
    {
      id: '65e041814d30ce4bbd4981d1',
      model: '/models/nike_air_zoom_pegasus_36.glb',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {shoes.map((shoe) => (
        <button key={shoe.id} onClick={() => onSelect(shoe)}>
          {shoe.id}
        </button>
      ))}
    </div>
  );
}
