// src/components/LoadingSpinner.tsx
import React from 'react';
import './ui.css'; // add your spinner style here or inline it

const LoadingSpinner = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
};

export default LoadingSpinner;
