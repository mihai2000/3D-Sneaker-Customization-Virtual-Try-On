import { DesignData } from "../../../types/designs";
import ShoeModelViewer from "../ShoeModelViewer/ShoeModelViewer";
interface Props {
	design: DesignData;
	onClose: () => void;
}
export default function DesignViewer({ design, onClose }: Props) {
	return (
		<ShoeModelViewer
			isOpen={true}
			onClose={onClose}
			modelUrl={design.modelUrl}
			shoeName="Your Saved Design"
		/>
	);
}
