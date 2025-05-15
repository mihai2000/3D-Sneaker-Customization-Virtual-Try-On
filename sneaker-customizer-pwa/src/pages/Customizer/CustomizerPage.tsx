// import { AnimatePresence, motion } from 'framer-motion';
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSnapshot } from 'valtio';
// import { CustomButton } from '../../components/ui';
// import {
//   headContainerAnimation,
//   headContentAnimation,
//   headTextAnimation,
//   slideAnimation,
// } from '../../config/motion';
// import state, { resetState } from '../../store';
// import './CustomizerPage.css';
// const CustomizerPage: React.FC = () => {
//   const snap = useSnapshot(state);
//   const navigate = useNavigate();

//   const handleCustomize = () => {
//     resetState();
//     state.intro = false;
//     navigate('/create-design');
//   };
//   return (
//     <AnimatePresence>
//       {snap.intro && (
//         <motion.section className="home-section" {...slideAnimation('left')}>
//           <motion.div className="home-content" {...headContainerAnimation}>
//             <motion.div {...headTextAnimation}>
//               <h1 className="home-title">
//                 Your Shoes
//                 <br className="line-break" /> Your Way
//               </h1>
//             </motion.div>

//             <motion.div className="home-description" {...headContentAnimation}>
//               <p className="home-paragraph">
//                 Create your unique and exclusive shoes with our brand-new 3D
//                 customization tool. <strong>unleash your imagination</strong>{' '}
//                 and define your own style.
//               </p>

//               <CustomButton
//                 title="Customize it"
//                 handleClick={handleCustomize}
//                 customStyle="custom-button"
//               />
//               <h1 className="home-paragraph">Welcome to 3D Shoe Customizer</h1>
//               <Link to="/try-ar">
//                 <CustomButton title="Try AR" customStyle="custom-button" />
//               </Link>
//             </motion.div>
//           </motion.div>
//         </motion.section>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CustomizerPage;
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { CustomButton } from '../../components/ui';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../../config/motion';
import state, { resetState } from '../../store';
import './CustomizerPage.scss';

const CustomizerPage: React.FC = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const handleCustomize = () => {
    resetState();
    state.intro = false;
    navigate('/create-design');
  };

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home-section " {...slideAnimation('left')}>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="home-title gradient-text">
                Your Shoes
                <br className="line-break" /> Your Way
              </h1>
            </motion.div>

            <motion.div className="home-description" {...headContentAnimation}>
              <p className="home-paragraph glow-soft">
                Create your unique and exclusive shoes with our brand-new 3D
                customization tool. <strong>Unleash your imagination</strong>{' '}
                and define your own style.
              </p>

              <CustomButton
                title="Customize it"
                handleClick={handleCustomize}
                customStyle="custom-button glow-button"
              />
              <h1 className="home-paragraph">Welcome to 3D Shoe Customizer</h1>
              <Link to="/try-ar">
                <CustomButton
                  title="Try AR"
                  customStyle="custom-button glow-button"
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default CustomizerPage;
