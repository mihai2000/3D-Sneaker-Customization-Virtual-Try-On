import { useEffect, useState } from 'react';
import './ui.css';
import { getLogoImages, getUserLogos } from '../../services/texture_logo';
import LoadingSpinner from './LoadingSpinner';
import { formatFileName } from '../../utils/formatFileName';
import { Fade, FormControlLabel, Switch } from '@mui/material';

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
  const [showUser, setShowUser] = useState(false);

  const allowedTabs: ('white' | 'black' | 'colored' | 'default')[] = showUser
    ? ['white', 'black', 'colored']
    : ['white', 'black', 'colored', 'default'];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const logos = showUser ? await getUserLogos() : await getLogoImages();
        setLogoGroups(logos);
      } catch (err) {
        console.error('❌ Error loading logos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [showUser]);

  // Auto-reset if switching from default to user
  useEffect(() => {
    if (showUser && activeType === 'default') {
      setActiveType('white');
    }
  }, [showUser]);

  const logos = logoGroups[activeType] || [];

  return (
    <div
      className={`texture-library-wrapper glassmorphismFile ${
        showUser ? 'user-mode' : ''
      }`}
    >
      <div className="library-header">
        <h4>Choose a Logo</h4>
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

      <div className="logo-selector">
        {allowedTabs.map((type) => (
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
        <LoadingSpinner text="Loading Logos..." />
      ) : logos.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No logos found in this folder.</p>
      ) : (
        <Fade in timeout={300}>
          <div className="texture-grid">
            {logos.map((logo) => (
              <div key={logo.name} className="texture-tile">
                <img
                  src={logo.url}
                  alt={`${activeType} - ${formatFileName(logo.name)}`}
                  className="texture-thumbnail"
                  onClick={() => onSelect(logo.url)}
                />
              </div>
            ))}
          </div>
        </Fade>
      )}
    </div>
  );
};

export default LogoLibrary;
