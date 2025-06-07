import React from 'react';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

const BackToManageProductsButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/dashboard/manage-products')}
      startIcon={<KeyboardBackspaceIcon />}
      sx={{
        color: '#80D0FF',
        mb: 2,
        textTransform: 'none',
        fontWeight: 600,
        '&:hover': {
          color: '#fff',
        },
      }}
    >
      Back to Manage Products
    </Button>
  );
};

export default BackToManageProductsButton;
