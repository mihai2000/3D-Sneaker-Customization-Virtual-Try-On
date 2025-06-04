import { useEffect, useState } from 'react';
import './ui.css';
import { getTextureImages, getUserTextures } from '../../services/texture_logo';
import LoadingSpinner from './LoadingSpinner';
import { formatFileName } from '../../utils/formatFileName';
import { Fade, FormControlLabel, Switch } from '@mui/material';

type TextureLibraryProps = {
  onSelect: (url: string) => void;
};

const TextureLibrary = ({ onSelect }: TextureLibraryProps) => {
  const [textures, setTextures] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    const fetchTextures = async () => {
      setLoading(true);
      try {
        const data = showUser
          ? await getUserTextures()
          : await getTextureImages();
        setTextures(data);
      } catch (err) {
        console.error('❌ Error loading textures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTextures();
  }, [showUser]);

  return (
    <div className="texture-library-wrapper glassmorphismFile">
      <div className="library-header">
        <h4>Choose a Texture</h4>
        <FormControlLabel
          control={
            <Switch
              checked={showUser}
              onChange={(e) => setShowUser(e.target.checked)}
              size="small"
              color="primary"
            />
          }
          label="User"
        />
      </div>

      {loading ? (
        <LoadingSpinner text="Loading Textures..." />
      ) : textures.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No textures found.</p>
      ) : (
        <Fade in timeout={300}>
          <div className="texture-grid">
            {textures.map((tex) => (
              <div key={tex.name} className="texture-tile">
                <img
                  src={tex.url}
                  alt={`texture - ${formatFileName(tex.name)}`}
                  className="texture-thumbnail"
                  onClick={() => onSelect(tex.url)}
                />
              </div>
            ))}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default TextureLibrary;
