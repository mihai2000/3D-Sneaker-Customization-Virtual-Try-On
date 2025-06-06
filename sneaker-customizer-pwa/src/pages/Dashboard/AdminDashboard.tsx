import React from "react";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import TextureIcon from "@mui/icons-material/Texture";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./DashboardPanel.scss";

const drawerWidth = 250;

export const AdminDashboard: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { logout } = useAuth();

	const menuItems = [
		{
			label: "Admin Control Panel",
			icon: <DashboardIcon />,
			path: "/dashboard",
		},
		{ label: "Orders", icon: <ShoppingCartIcon />, path: "/dashboard/orders" },
		{
			label: "Textures & Logos",
			icon: <TextureIcon />,
			path: "/dashboard/textures-logos",
		},
		{
			label: "Saved Designs",
			icon: <ShoppingCartIcon />,
			path: "saved-designs",
		},
		{ label: "Settings", icon: <SettingsIcon />, path: "/dashboard/profile" },
		{ label: "Logout", icon: <LogoutIcon />, path: "/logout" },
	];

	const handleNavigate = async (path: string) => {
		if (path === "/logout") {
			await logout();
			navigate("/login");
		} else {
			navigate(path);
		}
	};

	return (
		<div className="dashboard-container admin">
			<Box sx={{ display: "flex" }}>
				<Drawer
					variant="permanent"
					sx={{
						width: drawerWidth,
						[`& .MuiDrawer-paper`]: {
							marginTop: "4rem",
							width: drawerWidth,
							background: "linear-gradient(to bottom, #2a2a3d, #1e1e2f)",
							color: "#E0E0FF",
							borderRight: "1px solid rgba(255,255,255,0.08)",
						},
					}}
				>
					<Box sx={{ px: 2, py: 3 }}>
						<Typography variant="h6" sx={{ color: "#80D0FF" }}>
							Admin Panel
						</Typography>
					</Box>

					<List>
						{menuItems.map((item) => (
							<ListItem
								button
								key={item.label}
								onClick={() => handleNavigate(item.path)}
								sx={{
									cursor: "pointer",
									backgroundColor:
										location.pathname === item.path
											? "rgba(255,255,255,0.08)"
											: "transparent",
									"&:hover": {
										backgroundColor: "rgba(255, 255, 255, 0.06)",
									},
								}}
							>
								<ListItemIcon sx={{ color: "#B0B3FF" }}>
									{item.icon}
								</ListItemIcon>
								<ListItemText primary={item.label} />
							</ListItem>
						))}
					</List>
				</Drawer>

				<Box
					sx={{
						flexGrow: 1,
						mt: 4,
						p: 4,
						background: "rgba(255, 255, 255, 0.04)",
					}}
				>
					<Outlet />
				</Box>
			</Box>
		</div>
	);
};
