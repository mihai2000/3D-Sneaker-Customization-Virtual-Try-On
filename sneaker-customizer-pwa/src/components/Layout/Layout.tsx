import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();
	const hideNav = ["/login", "/register", "/forgot-password"].includes(
		location.pathname
	);

	return (
		<>
			{!hideNav && <Navbar />}
			<div
				style={{
					position: "relative",
					height: "100vh",
					// width: "100vw",
					overflow: "hidden",
				}}
			>
				{children}
			</div>
		</>
	);
};

export default Layout;
