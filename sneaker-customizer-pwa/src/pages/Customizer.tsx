import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import { reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { ColorPicker, FilePicker, Tab, CustomButton } from "../components/ui";
import PlugDevRev from "../components/ui/PlugDevRev";
import state from "../store";

interface DecalType {
	stateProperty: string;
	filterTab: string;
}

const Customizer: React.FC = () => {
	const snap = useSnapshot(state);

	const [file, setFile] = useState<File | null>(null);
	const [activeEditorTab, setActiveEditorTab] = useState<string>("");
	const [activeFilterTab, setActiveFilterTab] = useState<{
		[key: string]: boolean;
	}>({
		logoShoe: true,
		stylishShoe: false,
	});

	const generateTabContent = () => {
		switch (activeEditorTab) {
			case "filepicker":
				return (
					<FilePicker
						file={file}
						setFile={(file: File) => setFile(file)}
						readFile={readFile}
					/>
				);
			default:
				return null;
		}
	};

	const handleDecals = (type: string, result: string | ArrayBuffer | null) => {
		const decalType: DecalType = DecalTypes[type];
		(state as any)[decalType.stateProperty] = result;

		if (!activeFilterTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab);
		}
	};

	const handleActiveFilterTab = (tabName: string) => {
		switch (tabName) {
			case "logoShoe":
				state.isLogoTexture = !activeFilterTab[tabName];
				break;
			case "stylishShoe":
				state.isFullTexture = !activeFilterTab[tabName];
				break;
			default:
				state.isFullTexture = false;
				state.isLogoTexture = true;
				break;
		}

		setActiveFilterTab((prevState) => ({
			...prevState,
			[tabName]: !prevState[tabName],
		}));
	};

	const readFile = (type: string) => {
		if (!file) return;
		reader(file).then((result) => {
			handleDecals(type, result);
			setActiveEditorTab("");
		});
	};

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key="custom"
						className="customizer-sidebar"
						{...(slideAnimation("left") as any)}
					>
						<ColorPicker />
						<div className="editor-container">
							<div className="editor-tab-panel glassmorphism">
								{EditorTabs.map((tab) => (
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() => setActiveEditorTab(tab.name)}
									/>
								))}
								{generateTabContent()}
							</div>
						</div>
					</motion.div>

					<motion.div
						className="customizer-back-btn"
						{...(fadeAnimation as any)}
					>
						<CustomButton
							type="filled"
							title="Go Back"
							customStyle="custom-button"
							handleClick={() => (state.intro = true)}
						/>
					</motion.div>

					<motion.div
						className="customizer-filter-tabs"
						{...(slideAnimation("up") as any)}
					>
						{FilterTabs.map((tab) => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilteredTab
								isActiveTab={activeFilterTab[tab.name]}
								handleClick={() => handleActiveFilterTab(tab.name)}
							/>
						))}
					</motion.div>

					<motion.div>
						<PlugDevRev />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Customizer;
