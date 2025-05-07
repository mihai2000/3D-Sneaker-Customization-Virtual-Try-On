import React from "react";
import Canvas from "./components/canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import "./App.css";
const App: React.FC = () => {
	return (
		<main className="app">
			<Home />
			<Canvas />
			<Customizer />
		</main>
	);
};

export default App;
