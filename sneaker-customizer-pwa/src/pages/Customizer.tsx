import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, FilePicker, Tab, CustomButton } from '../components/ui';
import PlugDevRev from '../components/ui/PlugDevRev';
import state from '../store';

interface DecalType {
  stateProperty: string;
  filterTab: string;
}

const Customizer: React.FC = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<File | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<string>('');
  const [activeFilterTab, setActiveFilterTab] = useState<{
    [key: string]: boolean;
  }>({
    logoShoe: true,
    stylishShoe: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'filepicker':
        return (
          <FilePicker
            file={file}
            setFile={(file: File) => setFile(file)}
            readFile={readFile}
          />
        );

      default:
        return null;
    }
  };

  const handleDecals = (type: string, result: string | ArrayBuffer | null) => {
    const decalType: DecalType = DecalTypes[type];

    (state as any)[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case 'logoShoe':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShoe':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type: string) => {
    if (!file) return;
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab('');
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...(slideAnimation('left') as any)}
          >
            <ColorPicker />
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-5 right-5 z-10"
            {...(fadeAnimation as any)}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={() => (state.intro = true)}
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...(slideAnimation('up') as any)}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilteredTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>

          <motion.div>
            <PlugDevRev />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
