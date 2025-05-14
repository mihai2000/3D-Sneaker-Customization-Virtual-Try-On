import React from 'react';
import CustomButton from './CustomButton';
import './ui.css';

interface FilePickerProps {
  file: File | null;
  setFile: (file: File) => void;
  readFile: (type: 'logo' | 'full') => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ file, setFile, readFile }) => {
  return (
    <div className="file-picker-wrapper glassmorphism ">
      <div className="flex flex-1 flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <label htmlFor="file-upload" className="file-upload-label">
          Upload File
        </label>
        <p className="file-status-text">
          {file === null ? 'No File Selected' : file.name}
        </p>
        <div className="file-button-group">
          <CustomButton
            title="logo"
            handleClick={() => readFile('logo')}
            customStyle="text-xs"
          />
          <CustomButton
            title="full"
            handleClick={() => readFile('full')}
            customStyle="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default FilePicker;
