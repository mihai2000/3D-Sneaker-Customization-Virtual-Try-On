import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import {
	ColorPicker,
	CustomButton,
	FilePicker,
	Tab,
} from "../../components/ui";
import PlugDevRev from "../../components/ui/PlugDevRev";
import { DecalTypes, EditorTabs, FilterTabs } from "../../config/constants";
import { reader } from "../../config/helpers";
import { fadeAnimation, slideAnimation } from "../../config/motion";
import state, { resetState } from "../../store";
import { useNavigate, useParams } from "react-router";
import { fetchSavedDesignById } from "../../services/designs";
import { saveDesignToFirestore } from "../../utils/saveDesignToFirestore";
import { toast } from "react-toastify";
import "./Customizer.css";
import {
	exportModifiedModel,
	uploadModelFile,
} from "../../utils/uploadModelFile";
import CanvasEditor from "../../components/canvas/Canvas/CanvasEditor/CanvasEditor";
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

	const { designId } = useParams();

	useEffect(() => {
		if (designId) {
			(async () => {
				const data = await fetchSavedDesignById(designId);
				if (data) {
					state.currentDesignId = data.id || null;
					Object.assign(state.items, data.items ?? {});
					state.logoDecal = data.logoDecal ?? "";
					state.fullDecal = data.fullDecal ?? "";
					state.isLogoTexture = !!data.isLogoTexture;
					state.isFullTexture = !!data.isFullTexture;
					state.intro = false;
				}
			})();
		}
	}, [designId]);

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
	const navigate = useNavigate();

	const handleCustomizerPage = () => {
		document.body.style.cursor = "auto";
		state.intro = true;
		navigate("/customizer");
	};
	const handleResetDesign = () => {
		resetState();
	};
	const [loading, setLoading] = useState(false);
	const canvasRef = useRef<any>();

	const handleSave = async () => {
		try {
			setLoading(true);

			const shoe = canvasRef.current?.getScene();
			if (!shoe) throw new Error("Shoe model not available");

			const blob = await exportModifiedModel(shoe);
			const { url, path } = await uploadModelFile(blob);

			// Pass the URL to Firestore or update your existing logic
			await saveDesignToFirestore({ modelUrl: url, modelPath: path });

			toast.success("Design saved and uploaded!");
			document.body.style.cursor = "auto";

			navigate("/saved-designs");
		} catch (err) {
			console.error(err);
			toast.error("Failed to save model");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<AnimatePresence>
				{!snap.intro && (
					<>
						<motion.div
							key="custom"
							className="customizer-sidebar"
							{...slideAnimation("left")}
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

						<motion.div className="customizer-back-btn" {...fadeAnimation}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.5rem",
								}}
							>
								<CustomButton
									title="Go Back"
									customStyle="custom-button"
									handleClick={handleCustomizerPage}
								/>
								<CustomButton
									title={loading ? "Saving..." : "Save Design"}
									customStyle="text-xs"
									handleClick={handleSave}
								/>
								<CustomButton
									title="Reset Design"
									customStyle="custom-button"
									handleClick={handleResetDesign}
								/>
							</div>
						</motion.div>

						<motion.div
							className="customizer-filter-tabs"
							{...slideAnimation("up")}
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
				<CanvasEditor ref={canvasRef} />
			</AnimatePresence>
		</>
	);
};

export default Customizer;
