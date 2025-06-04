import React, { useEffect, useState } from 'react';
import {
  getLogoImages,
  getTextureImages,
  getUserTextures,
  getUserLogos,
  uploadUserTexture,
  uploadUserLogo,
  deleteUserTexture,
  deleteUserLogo,
} from '../../services/texture_logo';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatFileName } from '../../utils/formatFileName';
import './Dashboard.scss';
import {
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Switch,
  Collapse,
  FormControlLabel,
} from '@mui/material';
import { toast } from 'react-toastify';

type Texture = {
  name: string;
  url: string;
};

type LogoGroup = {
  [color: string]: Texture[];
};

type LogoFolder = 'black' | 'white' | 'colored';

export default function Dashboard() {
  const [textures, setTextures] = useState<Texture[]>([]);
  const [logos, setLogos] = useState<LogoGroup>({});
  const [userTextures, setUserTextures] = useState<Texture[]>([]);
  const [userLogos, setUserLogos] = useState<LogoGroup>({});
  const [loading, setLoading] = useState(true);
  const [selectedLogoColor, setSelectedLogoColor] = useState<LogoFolder | ''>(
    ''
  );
  const [showUserTextures, setShowUserTextures] = useState(false);
  const [showUserLogos, setShowUserLogos] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const [texturesFetched, logosFetched, userTex, userLogo] =
          await Promise.all([
            getTextureImages(),
            getLogoImages(),
            getUserTextures(),
            getUserLogos(),
          ]);
        setTextures(texturesFetched);
        setLogos(logosFetched);
        setUserTextures(userTex);
        setUserLogos(userLogo);
      } catch (err) {
        console.error('💥 Failed to fetch assets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  const handleTextureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      await uploadUserTexture(file);
    }
    const updated = await getUserTextures();
    setUserTextures(updated);
  };

  const handleLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: LogoFolder
  ) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      await uploadUserLogo(file, folder);
    }
    const updated = await getUserLogos();
    setUserLogos(updated);
  };

  const handleDeleteUserTexture = async (filename: string) => {
    await deleteUserTexture(filename);
    const updated = await getUserTextures();
    setUserTextures(updated);
  };

  const handleDeleteUserLogo = async (filename: string, folder: LogoFolder) => {
    try {
      await deleteUserLogo(filename, folder);
      const updated = await getUserLogos();
      setUserLogos(updated);
      toast.success(`🗑️ Deleted ${filename} from ${folder} logos`);
    } catch (err) {
      toast.error(`Failed to delete ${filename}`);
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard 🎉</h2>

      {/* Upload Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Texture Upload */}
        <div className="upload-controls">
          <input
            accept=".jpg,.jpeg,.png"
            id="upload-texture"
            type="file"
            multiple
            onChange={handleTextureUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="upload-texture">
            <Button variant="contained" component="span" color="primary">
              📤 Upload Texture
            </Button>
          </label>
        </div>

        {/* Logo Upload */}
        <div className="upload-controls">
          <input
            accept=".svg,.png,.jpg"
            id="upload-logo"
            type="file"
            multiple
            onChange={(e) =>
              handleLogoUpload(e, selectedLogoColor as LogoFolder)
            }
            style={{ display: 'none' }}
            disabled={!selectedLogoColor}
          />
          <label htmlFor="upload-logo">
            <Button
              variant="contained"
              component="span"
              color="secondary"
              onClick={() => {
                if (!selectedLogoColor) {
                  toast.error('Please select a logo folder before uploading');
                } else {
                  document.getElementById('upload-logo')?.click();
                }
              }}
            >
              📤 Upload Logo
            </Button>
          </label>
        </div>

        {/* Select Logo Color Folder */}
        <div className="upload-controls">
          <FormControl
            fullWidth
            size="small"
            sx={{
              maxWidth: 220,
              '& .MuiInputBase-root': {
                backgroundColor: '#2c2c2c',
                color: '#fff',
                fontSize: '1rem',
              },
              '& .MuiSvgIcon-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#ccc',
                fontSize: '1rem',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#555',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#999',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
            }}
            required
          >
            <InputLabel
              id="logo-color-select-label"
              shrink
              sx={{ width: 'auto', fontSize: '1rem' }}
            >
              Logo Color Folder
            </InputLabel>
            <Select
              labelId="logo-color-select-label"
              id="logo-color-select"
              value={selectedLogoColor}
              label="Logo Color Folder"
              sx={{ width: '160px', fontSize: '1rem' }}
              onChange={(e) =>
                setSelectedLogoColor(e.target.value as LogoFolder)
              }
              displayEmpty
            >
              <MenuItem value="">
                <em>Select folder...</em>
              </MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="colored">Colored</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Toggle Section */}
      <div className="section-toggle">
        <FormControlLabel
          control={
            <Switch
              checked={showUserTextures}
              onChange={() => setShowUserTextures(!showUserTextures)}
              color="primary"
            />
          }
          label="Show User Textures"
          sx={{ color: '#fff' }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={showUserLogos}
              onChange={() => setShowUserLogos(!showUserLogos)}
              color="secondary"
            />
          }
          label="Show User Logos"
          sx={{ color: '#fff', ml: 2 }}
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <LoadingSpinner text="Loading Dashboard Assets..." />
      ) : (
        <>
          {/* Textures */}
          <Collapse in={!showUserTextures} timeout="auto" unmountOnExit>
            <h3 className="section-title">🖼️ Texture Images:</h3>
            {textures.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                No textures found in the default folder.
              </p>
            ) : (
              <div className="grid">
                {textures.map((tex) => (
                  <div key={tex.name} className="tile">
                    <p>{formatFileName(tex.name)}</p>
                    <img
                      src={tex.url}
                      alt={`texture - ${formatFileName(tex.name)}`}
                      className="large"
                    />
                  </div>
                ))}
              </div>
            )}
          </Collapse>

          <Collapse in={showUserTextures} timeout="auto" unmountOnExit>
            <h3 className="section-title">🎨 User Textures:</h3>
            {userTextures.length === 0 ? (
              <p style={{ opacity: 0.6 }}>
                No user textures uploaded yet. Ready to import some?
              </p>
            ) : (
              <div className="grid">
                {userTextures.map((tex) => (
                  <div key={tex.name} className="tile">
                    <p>{formatFileName(tex.name)}</p>
                    <div className="user-assets">
                      <img
                        src={tex.url}
                        alt={`user-texture-${formatFileName(tex.name)}`}
                        className="large"
                      />
                      <button onClick={() => handleDeleteUserTexture(tex.name)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Collapse>

          {/* Logos */}
          <Collapse in={!showUserLogos} timeout="auto" unmountOnExit>
            <h3 className="section-title">🧿 Logos (by color):</h3>
            {Object.keys(logos).map((color) => (
              <div key={color}>
                <h4 style={{ textTransform: 'capitalize' }}>{color} Logos:</h4>
                {logos[color]?.length === 0 ? (
                  <p style={{ opacity: 0.6 }}>No logos found in this folder.</p>
                ) : (
                  <div className="grid">
                    {logos[color].map((logo) => (
                      <div key={logo.name} className="tile">
                        <p>{formatFileName(logo.name)}</p>
                        <img
                          src={logo.url}
                          alt={`${color} - ${formatFileName(logo.name)}`}
                          className={`small ${color === 'white' ? 'logo-black-bg' : 'logo-white-bg'}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Collapse>

          <Collapse in={showUserLogos} timeout="auto" unmountOnExit>
            <h3 className="section-title">🧢 User Logos (by folder):</h3>
            {Object.keys(userLogos).map((color) => (
              <div key={color}>
                <h4 style={{ textTransform: 'capitalize' }}>
                  {color} User Logos:
                </h4>
                {userLogos[color]?.length === 0 ? (
                  <p style={{ opacity: 0.6 }}>
                    No user logos found in this folder. Ready to import some?
                  </p>
                ) : (
                  <div className="grid">
                    {userLogos[color].map((logo) => (
                      <div key={logo.name} className="tile">
                        <p>{formatFileName(logo.name)}</p>
                        <div className="user-assets">
                          <img
                            src={logo.url}
                            alt={`user-logo-${formatFileName(logo.name)}`}
                            className={`small ${color === 'white' ? 'logo-black-bg' : 'logo-white-bg'}`}
                          />
                          <button
                            onClick={() =>
                              handleDeleteUserLogo(
                                logo.name,
                                color as LogoFolder
                              )
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Collapse>
        </>
      )}
    </div>
  );
}
