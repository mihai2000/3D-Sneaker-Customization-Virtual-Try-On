import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../../store';
import './ui.css';

const Instructions: React.FC = () => {
  const snap = useSnapshot(state);

  return (
    <div
      className={`glassmorphism instructions-wrapper ${
        !snap.current ? 'visible' : 'hidden'
      }`}
    >
      <h1 className="instructions-title">Hello</h1>
    </div>
  );
};

export default Instructions;
