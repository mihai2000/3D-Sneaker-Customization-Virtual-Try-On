import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../../store';
import { getContrastingColor } from '../../config/helpers';

interface CustomButtonProps {
  type: 'filled' | 'outline';
  title: string;
  customStyle?: string;
  handleClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  title,
  customStyle,
  handleClick,
}) => {
  const snap = useSnapshot(state);

  const generateStyle = (buttonType: 'filled' | 'outline') => {
    if (buttonType === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (buttonType === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyle}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
