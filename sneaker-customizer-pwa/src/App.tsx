import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Canvas from './components/canvas';
import Customizer from './pages/Customizer/Customizer';
import Home from './pages/Home/Home';
import TryOnAR from './pages/TryOnAR';

import './App.css';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/NotFound404/NotFound';
import Layout from './components/Layout/Layout';
import ForgotPassword from './pages/Auth/ForgotPassword';
const App: React.FC = () => {
  return (
    <main className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customizer"
          element={
            <Layout>
              <Home />
              <Canvas />
              <Customizer />
            </Layout>
          }
        />
        <Route path="/try-ar" element={<TryOnAR />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
