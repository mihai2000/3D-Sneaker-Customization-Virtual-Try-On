import './ui.css';

const textures = [
  { name: 'Leather', url: '/textures/leather.jpg' },
  { name: 'Grid', url: '/textures/grid.jpg' },
  { name: 'Athletic Black', url: '/textures/athletic_black.jpg' },
  { name: 'Athletic Red', url: '/textures/athletic_red.jpg' },
];

const TextureLibrary = ({ onSelect }: { onSelect: (url: string) => void }) => {
  return (
    <div className="texture-library-wrapper glassmorphismFile">
      <h4>Choose a Texture</h4>
      <div className="texture-grid">
        {textures.map((tex) => (
          <div key={tex.name} className="texture-tile">
            <img
              src={tex.url}
              alt={tex.name}
              className="texture-thumbnail"
              onClick={() => onSelect(tex.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextureLibrary;
