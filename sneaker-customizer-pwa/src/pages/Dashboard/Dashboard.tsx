import React, { useEffect, useState } from 'react';
import { getLogoImages, getTextureImages } from '../../services/texture_logo';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

type Texture = {
  name: string;
  url: string;
};

type LogoGroup = {
  [color: string]: Texture[]; // Reusing the same structure (name + url)
};

export default function Dashboard() {
  const [textures, setTextures] = useState<Texture[]>([]);
  const [logos, setLogos] = useState<LogoGroup>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const [texturesFetched, logosFetched] = await Promise.all([
          getTextureImages(),
          getLogoImages(),
        ]);
        setTextures(texturesFetched);
        setLogos(logosFetched);
      } catch (err) {
        console.error('💥 Failed to fetch assets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  console.log('Textures:', textures);
  console.log('Logos:', logos);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        paddingTop: '4rem',
        background: 'linear-gradient(145deg, #1a0933, #0d021c)',
        color: 'white',
      }}
    >
      <h2>Welcome to your Dashboard 🎉</h2>
      {loading ? (
        <LoadingSpinner text="Loading Dashboard Assets..." />
      ) : (
        <>
          <h3 style={{ marginTop: '2rem' }}>🖼️ Texture Images:</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {textures.map((tex) => (
              <img
                key={tex.name}
                src={tex.url}
                alt={tex.name}
                style={{
                  width: 180,
                  height: 180,
                  objectFit: 'cover',
                  border: '2px solid white',
                  borderRadius: 6,
                }}
              />
            ))}
          </div>

          <h3 style={{ marginTop: '2rem' }}>🧿 Logos (by color):</h3>
          {Object.keys(logos).map((color) => (
            <div key={color} style={{ marginTop: '1rem' }}>
              <h4 style={{ textTransform: 'capitalize' }}>{color} Logos:</h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {logos[color].map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.url}
                    alt={logo.name}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: 'contain',
                      border: '1px solid white',
                      borderRadius: 4,
                      backgroundColor: '#fff',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
