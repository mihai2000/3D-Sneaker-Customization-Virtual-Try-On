import { useEffect, useState } from 'react';
import './ui.css';
import { getLogoImages } from '../../services/texture_logo';
import LoadingSpinner from './LoadingSpinner';

type LogoLibraryProps = {
  onSelect: (url: string) => void;
};

type LogoGroups = {
  [color: string]: { name: string; url: string }[];
};

const LogoLibrary = ({ onSelect }: LogoLibraryProps) => {
  const [logoGroups, setLogoGroups] = useState<LogoGroups>({});
  const [activeType, setActiveType] = useState<
    'white' | 'black' | 'colored' | 'default'
  >('white');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      setLoading(true);
      try {
        const logos = await getLogoImages();
        setLogoGroups(logos);
      } catch (err) {
        console.error('❌ Error loading logos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  const logos = logoGroups[activeType] || [];

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
      {loading ? (
        <LoadingSpinner text="Loading Textures..." />
      ) : (
        <div className="texture-grid">
          {logos.map((logo) => (
            <div key={logo.name} className="texture-tile">
              <img
                src={logo.url}
                alt={`${activeType}-${logo.name}`}
                className="texture-thumbnail"
                onClick={() => onSelect(logo.url)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LogoLibrary;
