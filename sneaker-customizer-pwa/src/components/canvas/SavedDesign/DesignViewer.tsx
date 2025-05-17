import { Box } from '@mui/material';
import { DesignData } from '../../../types/designs';
import ShoeModelViewer from '../ShoeModelViewer/ShoeModelViewer';
import { Suspense } from 'react';

interface Props {
  design: DesignData;
  onClose: () => void;
}

export default function DesignViewer({ design, onClose }: Props) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1500,
        background: 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 200px rgba(0, 136, 255, 0.05)',
      }}
    >
      {' '}
      <Suspense fallback={null}>
        <ShoeModelViewer
          isOpen={true}
          onClose={onClose}
          modelUrl={design.modelUrl}
          shoeName="Your Saved Design"
        />
      </Suspense>
    </Box>
  );
}
