export type DesignData = {
	id: string;
	userId: string;
	items: Record<string, string>;
	logoDecal: string;
	fullDecal: string;
	isLogoTexture: boolean;
	isFullTexture: boolean;
	previewImageUrl: string;
	previewImagePath: string;
	modelUrl: string;
	modelPath: string;
	createdAt?: any;
};
