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

const Home: React.FC = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...(slideAnimation('left') as any)}>
          <motion.header {...(slideAnimation('down') as any)}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>
          <motion.div
            className="home-content"
            {...(headContainerAnimation as any)}
          >
            <motion.div {...(headTextAnimation as any)}>
              <h1 className="head-text">
                Your Shoes
                <br className="xl:block hidden" /> Your Way
              </h1>
            </motion.div>
            <motion.div
              className="flex flex-col gap-5"
              {...(headContentAnimation as any)}
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shoes with our brand-new 3D
                customization tool. <strong> unleash your imagination</strong>{' '}
                and define your own style.
              </p>
              <CustomButton
                type="filled"
                title="Customize it"
                handleClick={() => {
                  state.intro = false;
                }}
                customStyle="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
