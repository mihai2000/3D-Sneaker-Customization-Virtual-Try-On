import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import state from '../store';
import { CustomButton } from '../components/ui';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion';
import './Home.css';
import { Link } from 'react-router-dom';
const Home: React.FC = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home-section" {...slideAnimation('left')}>
          <motion.header className="home-header" {...slideAnimation('down')}>
            <img src="./threejs.png" alt="logo" className="logo-img" />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="home-title">
                Your Shoes
                <br className="line-break" /> Your Way 12
              </h1>
            </motion.div>

            <motion.div className="home-description" {...headContentAnimation}>
              {/* <p className="home-paragraph">
                Create your unique and exclusive shoes with our brand-new 3D
                customization tool. <strong>unleash your imagination</strong>{' '}
                and define your own style.
              </p>

              <CustomButton
                type="filled"
                title="Customize it"
                handleClick={() => {
                  state.intro = false;
                }}
                customStyle="custom-button"
              /> */}
              <h1 className="home-paragraph">Welcome to 3D Shoe Customizer</h1>
              <Link to="/try-ar">
                <CustomButton
                  type="filled"
                  title="Try AR"
                  customStyle="custom-button"
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
