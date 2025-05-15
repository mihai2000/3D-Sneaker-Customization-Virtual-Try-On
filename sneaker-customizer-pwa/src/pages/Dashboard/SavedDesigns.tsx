import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Grid, Typography } from "@mui/material";
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
import { toast } from "react-toastify";
import { AddShoppingCart } from "@mui/icons-material";
import BrushIcon from "@mui/icons-material/Brush";
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

		try {
			const storage = getStorage();

			// 🔥 Delete preview image
			if (design.previewImagePath) {
				const imgRef = storageRef(storage, design.previewImagePath);
				await deleteObject(imgRef);
			}

			// 🔥 Delete GLB model if path is known
			if (design.modelUrl) {
				// Try to infer the model path from its URL
				const pathStart = design.modelUrl.indexOf("/o/") + 3;
				const pathEnd = design.modelUrl.indexOf("?alt=");
				if (pathStart > 2 && pathEnd > pathStart) {
					const encodedPath = design.modelUrl.substring(pathStart, pathEnd);
					const decodedPath = decodeURIComponent(encodedPath);
					const modelRef = storageRef(storage, decodedPath);
					await deleteObject(modelRef);
				}
			}
		} catch (err) {
			console.warn("Failed to delete assets from storage:", err);
		}

		// 🧼 Delete Firestore document
		const ref = doc(db, "users", user.uid, "designs", designId);
		await deleteDoc(ref);

		// 🧹 Refresh UI
		loadDesigns();
		toast.success("Design and its files were deleted.");
	};

	const { addToCart } = useCart();

	const existingNames = cart.map((c) => c.name);
	const generateName = () => {
		let n = 1;
		const prefix = "Custom product ";
		while (existingNames.includes(`${prefix}${n}`)) n++;
		return `${prefix}${n}`;
	};

	const handleAddToCart = (design: DesignData) => {
		const name = generateName();
		addToCart({
			id: design.id,
			name,
			price: 0.2,
			quantity: 1,
			image: design.previewImageUrl,
		});
		toast.success(`${name} added to cart!`);
	};
	useEffect(() => {
		loadDesigns();
	}, [loadDesigns]);

	useEffect(() => {
		const style = document.createElement("style");
		style.innerHTML = `
			@keyframes gradientMove {
				0% { background-position: 0% 50%; }
				50% { background-position: 100% 50%; }
				100% { background-position: 0% 50%; }
			}
		`;
		document.head.appendChild(style);
	}, []);
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
				<Box
					sx={{
						background: "radial-gradient(circle at top, #0e0e11, #08090c)",
						minHeight: "100vh",
						py: 6,
					}}
				>
					<EmptySavedDesigns onCreateNew={handleCreateNew} />
				</Box>
			) : (
				<Box
					sx={{
						background: "radial-gradient(circle at top, #0e0e11, #08090c)",
						minHeight: "100vh",
						py: 6,
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 3,
							px: 4,
						}}
					>
						<SectionTitle title="Saved Designs" />
						<Button className="morph-button create" onClick={handleCreateNew}>
							<AddIcon className="icon" />
							<span className="label">Create New</span>
						</Button>
					</Box>
					<Grid container spacing={3} className="saved-designs" sx={{ px: 4 }}>
						{designs.map((design) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								lg={3}
								sx={{
									minWidth: 340,
									display: "flex",
									justifyContent: "center",
								}}
								key={design.id}
							>
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
													<li
														key={part}
														style={{
															display: "flex",
															alignItems: "center",
															marginBottom: 6,
														}}
													>
														<Typography
															variant="body2"
															sx={{
																width: 60,
																textTransform: "capitalize",
																color: "#ddd",
																fontWeight: 500,
															}}
														>
															{part}
														</Typography>
														<Box
															sx={{
																display: "flex",
																alignItems: "center",
																ml: 1,
																px: 1.5,
																py: 0.5,
																backgroundColor: "#1e1e1e",
																borderRadius: "999px",
																boxShadow:
																	"inset 0 0 2px rgba(255,255,255,0.1)",
															}}
														>
															<Box
																sx={{
																	width: 14,
																	height: 14,
																	borderRadius: "4px",
																	backgroundColor: color,
																	border: "1px solid rgba(255,255,255,0.15)",
																	mr: 1,
																}}
															/>
															<Typography
																variant="caption"
																sx={{ color: "#aaa", fontSize: "0.75rem" }}
															>
																{color}
															</Typography>
														</Box>
													</li>
												))}
										</ul>

										<Box sx={{ overflow: "visible", width: "100%" }}>
											<Box className="card-footer">
												<Button
													className="morph-button edit"
													onClick={() => handleLoadDesign(design)}
												>
													<BrushIcon className="icon" />
													<span className="label">Load & Edit</span>
												</Button>

												<Button
													className="morph-button cart"
													onClick={() => handleAddToCart(design)}
												>
													<AddShoppingCart className="icon" />
													<span className="label">Add to Cart</span>
												</Button>

												<Button
													className="morph-button delete"
													onClick={() => handleDelete(design.id)}
												>
													<DeleteIcon className="icon" />
													<span className="label">Delete</span>
												</Button>
											</Box>
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
					onClose={() => setSelectedDesign(null)}
				/>
			)}
		</>
	);
}
