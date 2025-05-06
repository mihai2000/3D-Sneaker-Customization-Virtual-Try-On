import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    plugSDK: any;
  }
}

const PlugDevRev: React.FC = () => {
  const [buttonState, setState] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const onClick = () => {
    setIsAnimating(!isAnimating);
    setState(!buttonState);
  };

  useEffect(() => {
    window.plugSDK.init({
      app_id: 'don:core:dvrv-us-1:devo/Lr25Qqs7:plug_setting/1',
      session_token: 'your_session_token_here',
      enable_default_launcher: false,
      custom_launcher_selector: '.custom-launcher-selector',
      widget_alignment: 'right',
      spacing: {
        bottom: '20px',
        side: '20px',
      },
    });

    window.plugSDK.onEvent((payload: any) => {
      if (payload.type === 'ON_PLUG_WIDGET_READY') {
        setIsWidgetReady(true);
        setLoading(false);
      }
    });

    if (isWidgetReady) {
      window.plugSDK.toggleWidget(buttonState);
    }
  }, [buttonState, isWidgetReady]);

  return (
    <div className="spacing-container-styles">
      {loading ? (
        <div className="loading-text-styles">
          <span>Loading</span>
          <span className="typing-dots-styles">...</span>
        </div>
      ) : (
        <motion.div
          {...({
            onClick: onClick,
            className: 'custom-launcher-selector',
            whileTap: { scale: 2 },
            animate: {
              rotate: isAnimating ? [0, 0, 180, 180, 0] : 0,
              borderRadius: isAnimating
                ? ['50%', '30%', '20%', '25%', '50%']
                : '50%',
            },
            transition: isAnimating
              ? {
                  duration: 3,
                  ease: 'easeInOut',
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1,
                }
              : {},
          } as React.ComponentProps<typeof motion.div>)}
        >
          <motion.div
            {...({
              onClick: onClick,
              style: {
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
              whileTap: { scale: 0.8 },
              animate: {
                rotate: isAnimating ? [0, 0, -180, -180, 0] : 0,
                borderRadius: isAnimating
                  ? ['50%', '30%', '15%', '15%', '50%']
                  : '50%',
              },
              transition: isAnimating
                ? {
                    duration: 3,
                    ease: 'easeInOut',
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }
                : {},
            } as React.ComponentProps<typeof motion.div>)}
          >
            <div className="waving-palm">
              <span role="img" aria-label="Hi">
                &#x2753;
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PlugDevRev;
