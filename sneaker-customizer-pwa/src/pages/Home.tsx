import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { CustomButton } from "../components/ui";
import {
	headContainerAnimation,
	headContentAnimation,
	headTextAnimation,
	slideAnimation,
} from "../config/motion";
import './Home.css'
const Home: React.FC = () => {
	const snap = useSnapshot(state);

	return (
		<AnimatePresence>
			{snap.intro && (
				<motion.section
					className="home-section"
					{...(slideAnimation("left") as any)}
				>
					<motion.header
						className="home-header"
						{...(slideAnimation("down") as any)}
					>
						<img
							src="./threejs.png"
							alt="logo"
							className="logo-img"
						/>
					</motion.header>

					<motion.div
						className="home-content"
						{...(headContainerAnimation as any)}
					>
						<motion.div {...(headTextAnimation as any)}>
							<h1 className="home-title">
								Your Shoes
								<br className="line-break" /> Your Way
							</h1>
						</motion.div>

						<motion.div
							className="home-description"
							{...(headContentAnimation as any)}
						>
							<p className="home-paragraph">
								Create your unique and exclusive shoes with our brand-new 3D
								customization tool. <strong>unleash your imagination</strong>{" "}
								and define your own style.
							</p>

							<CustomButton
								type="filled"
								title="Customize it"
								handleClick={() => {
									state.intro = false;
								}}
								customStyle="custom-button"
							/>
						</motion.div>
					</motion.div>
				</motion.section>
			)}
		</AnimatePresence>
	);
};

export default Home;
