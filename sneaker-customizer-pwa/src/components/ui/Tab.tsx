import React from 'react';
import './ui.css';

interface TabProps {
  tab: {
    name: string;
    icon: string;
  };
  isFilteredTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
}

const Tab: React.FC<TabProps> = ({
  tab,
  isFilteredTab,
  isActiveTab,
  handleClick,
}) => {
  const activeStyles =
    isFilteredTab && isActiveTab
      ? { backgroundColor: '#000', opacity: 0.5 }
      : { backgroundColor: 'transparent', opacity: 1 };

  return (
    <div
      key={tab.name}
      className={`tab-wrapper ${
        isFilteredTab ? 'filtered-tab glassmorphism' : 'default-tab'
      }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${isFilteredTab ? 'filtered-icon' : 'default-icon'}`}
      />
    </div>
  );
};

export default Tab;
