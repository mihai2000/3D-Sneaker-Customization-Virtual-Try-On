import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Shoe from './HomeShoe';
import './Home.scss';

const Home = () => {
  return (
    <Box className="home-root">
      <Box className="hero-left">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" className="hero-title gradient-text">
            Step Into the Future
          </Typography>
          <Typography
            variant="subtitle1"
            className="hero-subtitle gradient-text"
          >
            Explore next-gen 3D custom sneakers with our immersive experience.
          </Typography>
          <Button
            variant="contained"
            size="large"
            className="hero-button-glow"
            onClick={() => (window.location.href = '/products')}
          >
            Shop Collection
          </Button>
        </motion.div>
      </Box>

      <Box className="hero-right">
        <div className="blob-shape-dark" />
        <motion.div
          className="canvas-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Canvas camera={{ position: [0, 0, 3.2], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 2]} />
            <Environment preset="sunset" />
            <Shoe />
          </Canvas>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;
