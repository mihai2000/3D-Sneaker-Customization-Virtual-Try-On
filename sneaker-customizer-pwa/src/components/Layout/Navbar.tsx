import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
	useScrollTrigger,
	Slide,
	SwipeableDrawer,
	Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AdbIcon from "@mui/icons-material/Adb";
import { styled } from "@mui/system";
import { useAuth } from "../../hooks/useAuth";
import LinkButton from "./LinkButton";
import state, { resetState } from "../../store";

// Menu definitions
const pages = [
	{ label: "Try AR", path: "/try-ar" },
	{ label: "Customizer", path: "/customizer" },
	{ label: "Orders", path: "/orders" },
	{ label: "Saved Designs", path: "/saved-designs" },
	{ label: "Cart", path: "/cart" },
	{ label: "Products", path: "/products" },
];
const settings = [
	{ label: "Profile", path: "/profile" },
	{ label: "Account", path: "/account" },
	{ label: "Dashboard", path: "/dashboard" },
	{ label: "Logout", action: "logout" },
];

// Styled Components
const GlassAppBar = styled(AppBar)({
	background: "rgba(15, 23, 42, 0.85)", // navy-black glass
	backdropFilter: "blur(12px)",
	boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
	borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
	zIndex: 1300,
});

const NavButton = styled(LinkButton)({
	color: "#fff",
	fontWeight: 500,
	textTransform: "none",
	transition: "all 0.3s ease",
	"&:hover": {
		background:
			"linear-gradient(90deg, rgba(0,245,255,0.2) 0%, rgba(0,122,255,0.2) 100%)",
		boxShadow: "0 0 8px rgba(0,245,255,0.5)",
	},
});

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
	const trigger = useScrollTrigger();
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

export default function ResponsiveAppBar() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [drawerOpen, setDrawerOpen] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const toggleDrawer = (open: boolean) => () => {
		setDrawerOpen(open);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => setAnchorElUser(null);

	const handleSettingClick = (item: (typeof settings)[0]) => {
		handleCloseUserMenu();
		if (item.action === "logout") {
			logout().then(() => navigate("/login"));
		} else if (item.path) {
			navigate(item.path);
		}
	};
	const handleNavClick = (path: string) => {
		if (path === "/customizer") {
			state.intro = true;
			resetState();
		}
		document.body.style.cursor = "auto";
		navigate(path);
		setDrawerOpen(false);
	};
	return (
		<HideOnScroll>
			<GlassAppBar position="fixed" elevation={0}>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* Burger icon (mobile only) */}
						<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
							<Box sx={{ display: { xs: "flex", md: "none" } }}>
								<IconButton
									onClick={toggleDrawer(!drawerOpen)}
									color="inherit"
									sx={{
										transition: "transform 0.3s ease",
										transform: drawerOpen ? "rotate(90deg)" : "rotate(0deg)",
										zIndex: 1301, // ABOVE drawer
										position: "relative",
									}}
								>
									{drawerOpen ? <CloseIcon /> : <MenuIcon />}
								</IconButton>
							</Box>
						</Box>
						{/* Logo */}
						<AdbIcon sx={{ color: "#00f5ff", mr: 1 }} />
						<Typography
							component={Link}
							to="/"
							variant="h6"
							sx={{
								mr: 2,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".2rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							LOGO
						</Typography>

						{/* Desktop Nav */}
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
								ml: 4,
							}}
						>
							{pages.map((page) => (
								<NavButton
									key={page.label}
									to={page.path}
									onClick={() => handleNavClick(page.path)}
								>
									{page.label}
								</NavButton>
							))}
						</Box>

						{/* Avatar / Settings */}
						<Box sx={{ flexGrow: 0, ml: "auto" }}>
							<Tooltip title="Account">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt="User Avatar"
										src="/static/images/avatar/2.jpg"
										sx={{
											boxShadow: "0 0 0 2px white",
											bgcolor: "primary.main",
										}}
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								anchorEl={anchorElUser}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
								anchorOrigin={{ vertical: "top", horizontal: "right" }}
								transformOrigin={{ vertical: "top", horizontal: "right" }}
							>
								{settings.map((item) => (
									<MenuItem
										key={item.label}
										onClick={() => handleSettingClick(item)}
									>
										<Typography textAlign="center">{item.label}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>

				{/* Swipeable Drawer */}
				<SwipeableDrawer
					anchor="left"
					open={drawerOpen}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
					disableBackdropTransition
					ModalProps={{
						keepMounted: true,
						sx: {
							zIndex: 1200, // Default, DO NOT increase above AppBar
						},
					}}
					PaperProps={{
						sx: {
							backgroundColor: "#111",
							width: 250,
							pt: 2,
						},
					}}
				>
					<Box role="presentation" onClick={toggleDrawer(false)}>
						<Typography variant="h6" sx={{ px: 2, pb: 1, color: "#00f5ff" }}>
							Menu
						</Typography>
						<Divider sx={{ borderColor: "#222" }} />
						{pages.map((page) => (
							<MenuItem
								key={page.label}
								onClick={() => handleNavClick(page.path)}
							>
								<Typography sx={{ color: "white" }}>{page.label}</Typography>
							</MenuItem>
						))}
					</Box>
				</SwipeableDrawer>
			</GlassAppBar>
		</HideOnScroll>
	);
}
