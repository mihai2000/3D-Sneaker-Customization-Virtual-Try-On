import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Customizer from './pages/Customizer';
import TryOnAR from './pages/TryOnAR';
import Canvas from './components/canvas';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Auth/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import NotFound from './pages/NotFound404/NotFound';
const App: React.FC = () => {
  return (
    <main className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Protected Home Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/try-ar" element={<TryOnAR />} />
        <Route
          path="/customizer"
          element={
            <>
              <Home />
              <Canvas />
              <Customizer />
            </>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
