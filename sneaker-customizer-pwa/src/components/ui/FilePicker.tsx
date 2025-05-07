import React from "react";
import CustomButton from "./CustomButton";

interface FilePickerProps {
	file: File | null;
	setFile: (file: File) => void;
	readFile: (type: "logo" | "full") => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ file, setFile, readFile }) => {
	return (
		<div className="absolute left-full ml-3 glassmorphism p-3 w-[195px] h-[220px] flex flex-col rounded-md">
			<div className="flex flex-1 flex-col">
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={(e) => {
						if (e.target.files && e.target.files[0]) {
							setFile(e.target.files[0]);
						}
					}}
				/>
				<label
					htmlFor="file-upload"
					className="border border-gray-300 py-1.5 px-2 rounded-md shadow-sm text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer w-fit"
				>
					Upload File
				</label>
				<p className="mt-2 text-gray-500 text-xs truncate">
					{file === null ? "No File Selected" : file.name}
				</p>
				<div className="mt-4 flex flex-wrap gap-3">
					<CustomButton
						type="outline"
						title="logo"
						handleClick={() => readFile("logo")}
						customStyle="text-xs"
					/>
					<CustomButton
						type="filled"
						title="full"
						handleClick={() => readFile("full")}
						customStyle="text-xs"
					/>
				</div>
			</div>
		</div>
	);
};

export default FilePicker;
