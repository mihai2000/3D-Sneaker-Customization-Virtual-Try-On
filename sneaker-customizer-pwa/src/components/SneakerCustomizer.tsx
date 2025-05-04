import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SneakerModel from './SneakerModel';
import { useCart } from '../contexts/CartContext';
import ARViewer from './ARViewer';

const SneakerCustomizer: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('air_jordan_1.glb');
  const [color, setColor] = useState('');
  const [texture, setTexture] = useState('');

  const shoeOptions = [
    { name: 'Air Jordan', file: 'air_jordan_1.glb' },
    { name: 'Gucci Shoes', file: 'gucci_shoes.glb' },
    { name: 'Nike Air Pegasus', file: 'nike_air_zoom_pegasus_36.glb' },
    { name: 'Winter Shoe', file: 'winter_shoe.glb' },
    {
      name: 'Oxford Style Leather Shoe',
      file: 'oxford_style_leather_shoe_for_men.glb',
    },
    { name: 'Sneakers Seen', file: 'sneakers_seen.glb' },
  ];

  const textures = [
    { label: 'None', value: '' },
    { label: 'Camo', value: '/textures/camo.jpg' },
    { label: 'Leather', value: '/textures/leather.png' },
    { label: 'Gradient', value: '/textures/gradient.png' },
  ];

  const { addItem } = useCart();

  const handleAddToCart = () => {
    const design = {
      name:
        shoeOptions.find((o) => o.file === selectedModel)?.name ||
        'Unknown Sneaker',
      modelFile: selectedModel,
      color,
      texture,
    };
    addItem(design);
    alert('Added to cart!');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* 3D Viewer */}
      <div className="w-full h-[500px] bg-gray-100">
        <Canvas camera={{ position: [2, 2, 3], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={<mesh />}>
            <SneakerModel
              modelPath={`/models/${selectedModel}`}
              color={color}
              texture={texture}
            />
          </Suspense>
          <OrbitControls enableZoom />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 w-full">
        <label className="block font-bold mb-1">Select Sneaker Model:</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {shoeOptions.map((option) => (
            <option key={option.file} value={option.file}>
              {option.name}
            </option>
          ))}
        </select>

        <div>
          <label className="block font-bold mb-1 mt-4">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border"
          />
        </div>

        <div>
          <label className="block font-bold mb-1 mt-4">Texture:</label>
          <select
            value={texture}
            onChange={(e) => setTexture(e.target.value)}
            className="w-full p-2 border"
          >
            {textures.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => {
            setColor('');
            setTexture('');
          }}
          className="mt-2 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
        >
          Reset to Original
        </button>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
        <ARViewer modelPath={`/models/${selectedModel}`} />
      </div>
    </div>
  );
};

export default SneakerCustomizer;
