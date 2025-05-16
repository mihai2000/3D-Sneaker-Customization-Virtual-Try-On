import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import noDesign from '../../../assets/no-designs.jpg';

export default function EmptySavedDesigns({
  onCreateNew,
}: {
  onCreateNew: () => void;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          mt: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: isDark ? '#e0e0e0' : 'inherit',
        }}
      >
        <img
          src={noDesign}
          alt="No Designs"
          style={{
            width: '100%',
            maxWidth: 360,
            marginBottom: 24,
            borderRadius: 16,
            filter: isDark ? 'brightness(0.6)' : 'none',
            boxShadow: '0 0 20px rgba(58,94,255,0.3)',
          }}
        />

        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          You haven’t saved any designs yet
        </Typography>
        <Typography
          variant="body2"
          sx={{ maxWidth: 400, color: '#aaa', mb: 3 }}
        >
          Start customizing your own sneaker and your designs will show up here!
        </Typography>

        <Button
          variant="contained"
          onClick={onCreateNew}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: '0.95rem',
            borderRadius: 2,
            color: '#fff',
            background: 'linear-gradient(90deg, #8e24aa, #5e35b1)',
            boxShadow: '0 0 16px rgba(142, 36, 170, 0.4)',
            '&:hover': {
              background: 'linear-gradient(90deg, #7b1fa2, #512da8)',
              boxShadow: '0 0 20px rgba(142, 36, 170, 0.6)',
            },
          }}
        >
          Start Designing
        </Button>
      </Box>
    </motion.div>
  );
}
