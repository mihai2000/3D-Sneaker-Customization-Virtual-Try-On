import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        background: 'radial-gradient(circle at center, #0f172a, #1e293b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Centered Content Wrapper */}
      <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Blob behind text */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 480,
            height: 480,
            background: 'linear-gradient(145deg, #00e5ff, #3b82f6)',
            filter: 'blur(100px)',
            clipPath: `path('M400,100 Q380,30 300,80 Q180,0 100,100 Q0,180 80,300 Q0,400 100,420 Q180,520 300,460 Q400,540 420,420 Q520,380 460,300 Q540,180 400,100')`,
            opacity: 0.25,
            zIndex: 0,
            animation: 'blobMove 18s ease-in-out infinite alternate',
          }}
        />

        {/* Foreground Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 800,
              background: 'linear-gradient(90deg, #38bdf8, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(56, 189, 248, 0.4)',
            }}
          >
            404
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: '#b0dfff', mb: 4, fontWeight: 400 }}
          >
            Oops! <br />
            The page you're looking for doesn't exist.
          </Typography>

          <Button
            variant="contained"
            component={Link}
            to="/"
            sx={{
              background: 'linear-gradient(to right, #38bdf8, #0ea5e9)',
              color: '#fff',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 0 18px rgba(0,229,255,0.3)',
              '&:hover': {
                background: 'linear-gradient(to right, #0ea5e9, #0284c7)',
                boxShadow: '0 0 28px rgba(0,229,255,0.6)',
              },
            }}
          >
            Go Back Home
          </Button>
        </motion.div>
      </Box>

      {/* Animation keyframe */}
      <style>
        {`
        @keyframes blobMove {
          0% { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-50%, -50%) scale(1.25); }
        }
      `}
      </style>
    </Box>
  );
};

export default NotFound;
