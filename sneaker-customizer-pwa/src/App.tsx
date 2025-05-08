// import React from "react";
// import Canvas from "./components/canvas";
// import Customizer from "./pages/Customizer";
// import Home from "./pages/Home";

// import "./App.css";
// const App: React.FC = () => {
// 	return (
// 		<main className="app">
// 			<Home />
// 			<Canvas />
// 			<Customizer />
// 		</main>
// 	);
// };

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Customizer from './pages/Customizer';
import TryOnAR from './pages/TryOnAR'; // new AR page
import Canvas from './components/canvas';

import './App.css';

const App: React.FC = () => {
  return (
    <main className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Canvas />
              <Customizer />
            </>
          }
        />
        <Route path="/try-ar" element={<TryOnAR />} />
      </Routes>
    </main>
  );
};

export default App;
