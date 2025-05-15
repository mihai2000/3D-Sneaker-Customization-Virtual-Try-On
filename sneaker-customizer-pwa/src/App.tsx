import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './auth/ProtectedRoute';
import Layout from './components/Layout/Layout';

import Customizer from './pages/Customizer/Customizer';
import TryOnAR from './pages/TryOnAR';

import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import Orders from './pages/Dashboard/Orders';
import Profile from './pages/Dashboard/Profile';
import SavedDesigns from './pages/Dashboard/SavedDesigns';

import CartPage from './pages/Cart/Cart';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrderConfirmation from './pages/Checkout/OrderConfirmation';
import NotFound from './pages/NotFound404/NotFound';

import { Elements } from '@stripe/react-stripe-js';
import './App.css';
import CanvasEditor from './components/canvas/Canvas/CanvasEditor/CanvasEditor';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import ProductGallery from './pages/Products/ProductGallery';
import { stripePromise } from './services/stripe';
import CanvasPreview from './components/canvas/Canvas/CanvasPreview/CanvasPreview';
import CustomizerPage from './pages/Customizer/CustomizerPage';

const App: React.FC = () => {
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);
  return (
    <main className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Layout>
                <Orders />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-designs"
          element={
            <ProtectedRoute>
              <Layout>
                <SavedDesigns />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Customizer - protected */}

        <Route
          path="/customizer"
          element={
            <ProtectedRoute>
              <Layout>
                <CustomizerPage />
                <CanvasPreview />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-design/:designId?"
          element={
            <ProtectedRoute>
              <Layout>
                <CanvasEditor />
                <Customizer />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Public Pages */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                {/* <ProductsPage /> */}
                <ProductGallery />
              </Layout>
            </ProtectedRoute>
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
          path="/try-ar"
          element={
            <Layout>
              <TryOnAR />
            </Layout>
          }
        />

        {/* Stripe pages */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Layout>
                <CheckoutPage />
              </Layout>
            </ProtectedRoute>
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
          path="/order-success"
          element={
            <Elements stripe={stripePromise}>
              <Layout>
                <OrderConfirmation />
              </Layout>
            </Elements>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
