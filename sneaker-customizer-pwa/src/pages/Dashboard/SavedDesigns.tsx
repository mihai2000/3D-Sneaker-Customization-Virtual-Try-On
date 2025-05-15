import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Fab, Grid, Tooltip, Typography } from "@mui/material";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { deleteObject, getStorage, ref as storageRef } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DesignViewer from "../../components/canvas/SavedDesign/DesignViewer";
import SectionTitle from "../../components/Shared/SectionTitle";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { fetchSavedDesigns } from "../../services/designs";
import state, { ItemsType, resetState } from "../../store";
import { DesignData } from "../../types/designs";
import "./SavedDesigns.scss";
import EmptySavedDesigns from "../../components/canvas/SavedDesign/EmptySavedDesign";
import SavedDesignsSkeleton from "../../components/canvas/SavedDesign/SavedDesignsSkeleton";

export default function SavedDesigns() {
	const { user } = useAuth();
	const { cart } = useCart();
	const [designs, setDesigns] = useState<DesignData[]>([]);
	const navigate = useNavigate();
	const db = getFirestore();
	const [selectedDesign, setSelectedDesign] = useState<DesignData | null>(null);
	const [loading, setLoading] = useState(false);

	const loadDesigns = useCallback(async () => {
		if (!user) return;
		setLoading(true);
		const data = await fetchSavedDesigns(user);
		setDesigns(data);
		setLoading(false);
	}, [user]);

	const handleLoadDesign = (design: DesignData) => {
		const knownKeys: (keyof ItemsType)[] = [
			"laces",
			"mesh",
			"caps",
			"inner",
			"sole",
			"stripes",
			"band",
			"patch",
		];

		for (const key of knownKeys) {
			if (design.items?.[key]) {
				state.items[key] = design.items[key];
			}
		}

		state.logoDecal = design.logoDecal || "";
		state.fullDecal = design.fullDecal || "";
		state.isLogoTexture = !!design.isLogoTexture;
		state.isFullTexture = !!design.isFullTexture;
		state.intro = false;
		state.currentDesignId = design.id;

		navigate(`/create-design/${design.id}`);
	};

	const handleCreateNew = () => {
		resetState();
		state.intro = false;
		navigate("/create-design");
	};

	const handleDelete = async (designId: string) => {
		if (!user) return;
		const design = designs.find((d) => d.id === designId);
		if (!design) return;

		if (design.previewImagePath) {
			try {
				const storage = getStorage();
				const imgRef = storageRef(storage, design.previewImagePath);
				await deleteObject(imgRef);
			} catch (err) {
				console.warn("Failed to delete preview image:", err);
			}
		}

		const ref = doc(db, "users", user.uid, "designs", designId);
		await deleteDoc(ref);
		loadDesigns();
	};

	useEffect(() => {
		loadDesigns();
	}, [loadDesigns]);

	if (loading) {
		return (
			<Box sx={{ p: 4 }}>
				<SavedDesignsSkeleton />
			</Box>
		);
	}
	return (
		<>
			{designs.length === 0 ? (
				<EmptySavedDesigns onCreateNew={handleCreateNew} />
			) : (
				<Box
					sx={{ p: 4 }}
					// className="dark"
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 3,
						}}
					>
						<SectionTitle title="Saved Designs" />
						<Tooltip title="Create New Design">
							<Fab
								color="primary"
								onClick={handleCreateNew}
								sx={{
									boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
									background: "linear-gradient(45deg, #2196f3, #1e88e5)",
									color: "white",
									"&:hover": {
										background: "linear-gradient(45deg, #1976d2, #1565c0)",
									},
								}}
							>
								<AddIcon />
							</Fab>
						</Tooltip>
					</Box>
					<Grid container spacing={3} className="saved-designs">
						{designs.map((design) => (
							<Grid item xs={12} sm={6} md={4} key={design.id}>
								<Box className="design-card">
									{design.previewImageUrl && (
										<div
											className="preview"
											onClick={() => setSelectedDesign(design)}
											style={{ cursor: "pointer" }}
										>
											<img src={design.previewImageUrl} alt="Preview" />
											<div className="overlay">
												Logo: {design.isLogoTexture ? "Yes" : "No"} | Full:{" "}
												{design.isFullTexture ? "Yes" : "No"}
											</div>
										</div>
									)}

									<Box p={2}>
										<Typography variant="body2" mt={1}>
											<strong>Colors:</strong>
										</Typography>
										<ul className="colors-list">
											{design.items &&
												Object.entries(design.items).map(([part, color]) => (
													<li key={part}>
														{part}
														<span
															style={{
																backgroundColor:
																	color.toLowerCase() === "#fff"
																		? "#e0e0e0"
																		: "transparent",
																borderRadius: "4px",
																color,
															}}
														>
															{color}
														</span>
													</li>
												))}
										</ul>

										<Box className="card-footer">
											<Button
												className="load-btn"
												startIcon={<AddIcon />}
												onClick={() => handleLoadDesign(design)}
											>
												Load & Edit
											</Button>
											<Button
												className="delete-btn"
												startIcon={<DeleteIcon />}
												onClick={() => handleDelete(design.id)}
											>
												Delete
											</Button>
										</Box>
									</Box>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			)}

			{selectedDesign && (
				<DesignViewer
					design={selectedDesign}
					existingNames={cart.map((c) => c.name)}
					onClose={() => setSelectedDesign(null)}
				/>
			)}
		</>
	);
}
