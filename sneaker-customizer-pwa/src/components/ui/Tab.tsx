import React from "react";

interface TabProps {
	tab: {
		name: string;
		icon: string;
	};
	isFilteredTab?: boolean;
	isActiveTab?: boolean;
	handleClick: () => void;
}

const Tab: React.FC<TabProps> = ({
	tab,
	isFilteredTab,
	isActiveTab,
	handleClick,
}) => {
	const activeStyles =
		isFilteredTab && isActiveTab
			? { backgroundColor: "#000", opacity: 0.5 } // you can hook up snap.color here if needed
			: { backgroundColor: "transparent", opacity: 1 };

	return (
		<div
			key={tab.name}
			className={`w-14 h-14 flex justify-center items-center cursor-pointer select-none ${
				isFilteredTab ? "rounded-full glassmorphism" : "rounded-4"
			}`}
			onClick={handleClick}
			style={activeStyles}
		>
			<img
				src={tab.icon}
				alt={tab.name}
				className={`${
					isFilteredTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
				}`}
			/>
		</div>
	);
};

export default Tab;
