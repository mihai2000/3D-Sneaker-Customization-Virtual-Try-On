import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { fetchUserProfile, UserProfile } from "../../services/users";
import { AdminDashboard } from "./AdminDashboard";
import { UserDashboard } from "./UserDashboard";
import { AdminControlPanel } from "./AdminControlPanel";
import Orders from "../Orders/Orders";
import TexturesLogos from "../TexturesLogos/TexturesLogos";
import Profile from "./Profile";
import { ManageUsersPanel } from "./ManageUsersPanel";
import { AddProductForm } from "../Products/AddProductForm";
import { ThemeProvider } from "../../providers/ThemeProvider";
import BackToDashboardButton from "./BackToDashboardButton";
import SavedDesigns from "../SavedDesign/SavedDesigns";

export const Dashboard: React.FC = () => {
	const [userData, setUserData] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUser = async () => {
			const auth = getAuth();
			const currentUser = auth.currentUser;
			if (!currentUser) return;

			const profile = await fetchUserProfile(currentUser.uid);
			setUserData(profile);
			setLoading(false);
		};

		loadUser();
	}, []);

	if (loading)
		return (
			<div style={{ color: "#ccc", padding: "2rem" }}>
				Loading dashboard... 🌀
			</div>
		);
	if (!userData)
		return (
			<div style={{ color: "#ccc", padding: "2rem" }}>
				No user data found 🕵️
			</div>
		);

	return (
		<Routes>
			{userData.role === "admin" ? (
				<Route path="/" element={<AdminDashboard />}>
					<Route index element={<AdminControlPanel />} />
					<Route
						path="orders"
						element={
							<>
								<BackToDashboardButton />
								<Orders />
							</>
						}
					/>

					<Route
						path="textures-logos"
						element={
							<>
								<BackToDashboardButton />
								<TexturesLogos />
							</>
						}
					/>

					<Route
						path="profile"
						element={
							<ThemeProvider>
								<BackToDashboardButton />
								<ThemeProvider>
									<Profile />
								</ThemeProvider>
							</ThemeProvider>
						}
					/>
					<Route
						path="manage-users"
						element={
							<ThemeProvider>
								<BackToDashboardButton />
								<ManageUsersPanel />
							</ThemeProvider>
						}
					/>
					<Route
						path="add-products"
						element={
							<ThemeProvider>
								<BackToDashboardButton />
								<AddProductForm />
							</ThemeProvider>
						}
					/>
					<Route
						path="saved-designs"
						element={
							<>
								<BackToDashboardButton />
								<SavedDesigns />
							</>
						}
					/>
					<Route path="*" element={<Navigate to="/dashboard" replace />} />
				</Route>
			) : (
				<Route path="*" element={<UserDashboard />} />
			)}
		</Routes>
	);
};
