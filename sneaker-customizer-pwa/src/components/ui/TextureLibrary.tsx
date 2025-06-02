import React from 'react';
import CustomButton from './CustomButton';
import './ui.css';

const predefinedTextures = [
  { name: 'Leather', url: '/textures/leather.png' },
  { name: 'Canvas', url: '/textures/canvas.jpg' },
  { name: 'Mesh', url: '/textures/mesh.jpg' },
];

interface TextureLibraryProps {
  onSelect: (textureUrl: string, type: 'logo' | 'full') => void;
}

const TextureLibrary: React.FC<TextureLibraryProps> = ({ onSelect }) => {
  return (
    <div className="texture-library-wrapper glassmorphismFile">
      <h4>Choose a Predefined Texture</h4>
      <div className="texture-grid">
        {predefinedTextures.map((texture) => (
          <div key={texture.name} className="texture-tile">
            <img
              src={texture.url}
              alt={texture.name}
              onClick={() => onSelect(texture.url, 'full')}
              className="texture-thumbnail"
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.5rem',
              }}
            >
              <CustomButton
                title="Logo"
                handleClick={() => onSelect(texture.url, 'logo')}
                customStyle="text-xs"
              />
              <CustomButton
                title="Full"
                handleClick={() => onSelect(texture.url, 'full')}
                customStyle="text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextureLibrary;
