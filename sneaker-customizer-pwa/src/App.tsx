import React from 'react';
import {
  // Navigate,
  Route,
  Routes,
} from 'react-router-dom';
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
import NotFound from './pages/NotFound404/NotFound';
import Layout from './components/Layout/Layout';
import ForgotPassword from './pages/Auth/ForgotPassword';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Orders from './pages/Dashboard/Orders';
import SavedDesigns from './pages/Dashboard/SavedDesigns';
import Profile from './pages/Dashboard/Profile';
import CartPage from './pages/Cart/Cart';
import ProductsPage from './pages/Products/Products';
import OrderConfirmation from './pages/Checkout/OrderConfirmation';
import CheckoutPage from './pages/Checkout/CheckoutPage';
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
                <DashboardLayout />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard/orders"
          element={
            <Layout>
              <Orders />
            </Layout>
          }
        />
        <Route
          path="dashboard/saved"
          element={
            <Layout>
              <SavedDesigns />
            </Layout>
          }
        />
        <Route
          path="dashboard/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
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
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <ProductsPage />
            </Layout>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <Layout>
              <OrderConfirmation />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <CheckoutPage />
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
