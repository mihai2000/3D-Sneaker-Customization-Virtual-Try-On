import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ui.css";

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
		const session_token = import.meta.env.VITE_PLUG_SESSION_TOKEN;
		const app_id = import.meta.env.VITE_PLUG_APP_ID;

		// if (!session_token || session_token.split('.').length !== 3) {
		//   console.error('Invalid or missing Plug SDK session token.');
		//   return;
		// }
		const initPlugSDK = () => {
			if (!window.plugSDK || typeof window.plugSDK.init !== "function") {
				console.warn("PlugSDK not loaded yet.");
				return;
			}

			window.plugSDK.init({
				app_id,
				session_token,
				enable_default_launcher: false,
				disable_plug_chat_window: true,
				custom_launcher_selector: ".custom-launcher-selector",
				widget_alignment: "right",
				spacing: {
					bottom: "20px",
					side: "20px",
				},
			});

			window.plugSDK.onEvent((payload: any) => {
				if (payload.type === "ON_PLUG_WIDGET_READY") {
					setIsWidgetReady(true);
					setLoading(false);
				}
			});
		};

		const interval = setInterval(() => {
			if (window.plugSDK && typeof window.plugSDK.init === "function") {
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
						className: "custom-launcher-selector",
						whileTap: { scale: 2 },
						animate: {
							rotate: isAnimating ? [0, 0, 180, 180, 0] : 0,
							borderRadius: isAnimating
								? ["50%", "30%", "20%", "25%", "50%"]
								: "50%",
						},
						transition: isAnimating
							? {
									duration: 3,
									ease: "easeInOut",
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
								height: "100%",
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
							whileTap: { scale: 0.8 },
							animate: {
								rotate: isAnimating ? [0, 0, -180, -180, 0] : 0,
								borderRadius: isAnimating
									? ["50%", "30%", "15%", "15%", "50%"]
									: "50%",
							},
							transition: isAnimating
								? {
										duration: 3,
										ease: "easeInOut",
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
