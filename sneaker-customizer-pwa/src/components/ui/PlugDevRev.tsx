import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ui.css';

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
    // const session_token = import.meta.env.VITE_PLUG_SESSION_TOKEN;
    // const app_id = import.meta.env.VITE_PLUG_APP_id;

    // if (!session_token || session_token.split('.').length !== 3) {
    //   console.error('Invalid or missing Plug SDK session token.');
    //   return;
    // }
    const initPlugSDK = () => {
      if (!window.plugSDK || typeof window.plugSDK.init !== 'function') {
        console.warn('PlugSDK not loaded yet.');
        return;
      }

      window.plugSDK.init({
        // app_id,
        // session_token,
        // app_id: 'don:core:dvrv-us-1:devo/10exEYkD3:plug_setting/1',
        app_id: 'don:core:dvrv-us-1:devo/Lr25Qqs7:plug_setting/1',
        session_token:
          'eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtdXMtMTpkZXZvL0xyMjVRcXM3OnN2Y2FjYy85IiwiZXhwIjoxNzAxNDQzMzEwLCJodHRwOi8vZGV2cmV2LmFpL2FjY2lkIjoiQUNDLVpTOW00MVRtIiwiaHR0cDovL2RldnJldi5haS9jbGllbnRpZCI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9McjI1UXFzNzpzdmNhY2MvOSIsImh0dHA6Ly9kZXZyZXYuYWkvZGV2b19kb24iOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vTHIyNVFxczciLCJodHRwOi8vZGV2cmV2LmFpL2Rldm9pZCI6IkRFVi1McjI1UXFzNyIsImh0dHA6Ly9kZXZyZXYuYWkvZGlzcGxheW5hbWUiOiJTaG9lIEN1c3QgVXNlciIsImh0dHA6Ly9kZXZyZXYuYWkvZW1haWwiOiJzZWNvbmR1c2VyQGdtYWlsLmNvbSIsImh0dHA6Ly9kZXZyZXYuYWkvZnVsbG5hbWUiOiJTZWNvbmQgQXR0ZW1wdFx1MDAzZSIsImh0dHA6Ly9kZXZyZXYuYWkvaXNfdmVyaWZpZWQiOnRydWUsImh0dHA6Ly9kZXZyZXYuYWkvcGFyZW50X2p0aSI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9McjI1UXFzNzp0b2tlbi8xN1g4TVJkVFoiLCJodHRwOi8vZGV2cmV2LmFpL3Jldm9pZCI6IlJFVi1qT3h2ck5VMyIsImh0dHA6Ly9kZXZyZXYuYWkvcmV2dWlkIjoiUkVWVS0xNlhkWmxINWoiLCJodHRwOi8vZGV2cmV2LmFpL3Nlc3Npb25fdG9rZW50eXBlIjoidXJuOmRldnJldjpwYXJhbXM6b2F1dGg6dG9rZW4tdHlwZTpzZXNzaW9uOnJldiIsImh0dHA6Ly9kZXZyZXYuYWkvdG9rZW50eXBlIjoidXJuOmRldnJldjpwYXJhbXM6b2F1dGg6dG9rZW4tdHlwZTpzZXNzaW9uIiwiaWF0IjoxNjk5MDI0MTEwLCJpc3MiOiJodHRwczovL2F1dGgtdG9rZW4uZGV2cmV2LmFpLyIsImp0aSI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9McjI1UXFzNzp0b2tlbi91Z3I5Uk5RNnwwMDEiLCJzdWIiOiJkb246aWRlbnRpdHk6ZHZydi11cy0xOmRldm8vTHIyNVFxczc6cmV2dS8xNlhkWmxINWoifQ.Kcvgchr1VG1YV7RbJ4jpEVWkRoMHAjnnTlXUoEXBB6XncGHgRMdN-nt0W-PKidjJKRxK5xhlhEbIrR14oVbFBIQICESn_aL7jQosM98zNi0dnbLOSdYSryG-Q5Ttk_umm5J7onk3zALnWkkDMOsD3M6cjYqPLTaTRldRvPR-EKerXhTDlZvv3bOcuKOrr6yA9DhwZcq7pQ_544hlv-YgITvA16FUVua3VJMVNwLADaRpbINY-e_g5Sx7iGwdJvFaXqiz1ix4_C1cmdgZhMWjH_LoP4vyU1tn67h47gvRAMLw9SZ3kuWz8ThxhqVCV2WC8iW1VJf8CVK1mrUfQ83LvA',
        enable_default_launcher: false,
        disable_plug_chat_window: true,
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
    };

    const interval = setInterval(() => {
      if (window.plugSDK && typeof window.plugSDK.init === 'function') {
        clearInterval(interval);
        initPlugSDK();
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (window.plugSDK && isWidgetReady) {
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
