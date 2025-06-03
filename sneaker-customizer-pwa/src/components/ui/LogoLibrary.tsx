import { useState } from 'react';
import './ui.css';

const logoGroups = {
  white: [
    { name: 'Abstract Logo', url: '/logos/white/abstract-logo.svg' },
    { name: 'Fire Logo', url: '/logos/white/fire-logo.svg' },
    { name: 'Fly Logo', url: '/logos/white/fly-logo.svg' },
    { name: 'Mordern Logo', url: '/logos/white/modern-logo.svg' },
  ],
  black: [
    { name: 'Abstract Logo', url: '/logos/black/abstract-logo.svg' },
    { name: 'Fire Logo', url: '/logos/black/fire-logo.svg' },
    { name: 'Fly Logo', url: '/logos/black/fly-logo.svg' },
    { name: 'Mordern Logo', url: '/logos/black/modern-logo.svg' },
  ],
  colored: [
    { name: 'Abstract Logo', url: '/logos/colored/abstract-logo.svg' },
    { name: 'Fire Logo', url: '/logos/colored/fire-logo.svg' },
    { name: 'Fly Logo', url: '/logos/colored/fly-logo.svg' },
    { name: 'Mordern Logo', url: '/logos/colored/modern-logo.svg' },
  ],
  default: [{ name: 'Default Logo', url: '/logos/default_logo.svg' }],
};
const LogoLibrary = ({ onSelect }: { onSelect: (url: string) => void }) => {
  const [activeType, setActiveType] = useState<
    'white' | 'black' | 'colored' | 'default'
  >('white');
  const logos = logoGroups[activeType];

  return (
    <div className="texture-library-wrapper glassmorphismFile">
      <h4>Choose a Logo</h4>
      <div className="logo-selector">
        {(['white', 'black', 'colored', 'default'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`logo-filter-button ${activeType === type ? 'active' : ''}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="texture-grid">
        {logos.map((logo) => (
          <div key={logo.name} className="texture-tile">
            <img
              src={logo.url}
              alt={logo.name}
              className="texture-thumbnail"
              onClick={() => onSelect(logo.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLibrary;
