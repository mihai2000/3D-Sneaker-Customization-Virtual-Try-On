import { useEffect, useState } from 'react';
import './ui.css';
import { getTextureImages } from '../../services/texture_logo';
import LoadingSpinner from './LoadingSpinner';

type TextureLibraryProps = {
  onSelect: (url: string) => void;
};

const TextureLibrary = ({ onSelect }: TextureLibraryProps) => {
  const [textures, setTextures] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTextures = async () => {
      setLoading(true);
      try {
        const data = await getTextureImages();
        setTextures(data);
      } catch (err) {
        console.error('❌ Error loading textures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTextures();
  }, []);

  return (
    <div className="texture-library-wrapper glassmorphismFile">
      <h4>Choose a Texture</h4>
      {loading ? (
        <LoadingSpinner text="Loading Textures..." />
      ) : (
        <div className="texture-grid">
          {textures.map((tex) => (
            <div key={tex.name} className="texture-tile">
              <img
                src={tex.url}
                alt={`texture-${tex.name}`}
                className="texture-thumbnail"
                onClick={() => onSelect(tex.url)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextureLibrary;
