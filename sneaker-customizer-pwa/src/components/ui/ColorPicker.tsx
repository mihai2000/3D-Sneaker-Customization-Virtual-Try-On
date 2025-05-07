import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../../store';
import './ui.css';
const ColorPicker: React.FC = () => {
  const snap = useSnapshot(state);

  const handleColorChange = (color: any) => {
    if (snap.current) {
      state.items[snap.current] = color.hex;
      state.color = color.hex;
    }
  };

  return (
    <div
      className={`color-picker-wrapper ${snap.current ? 'visible' : 'hidden'}`}
    >
      {snap.current && (
        <>
          <SketchPicker
            color={snap.items[snap.current]}
            disableAlpha
            onChange={handleColorChange}
          />
          <h1 className="color-label">{snap.current}</h1>
        </>
      )}
    </div>
  );
};

export default ColorPicker;
