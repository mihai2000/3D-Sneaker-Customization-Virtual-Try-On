import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './auth/ProtectedRoute';
import Layout from './components/Layout/Layout';

import Customizer from './pages/Customizer/Customizer';
import TryOnAR from './pages/AR/TryOnAR';

import ForgotPassword from './pages/Auth/ForgotPassword';
import Register from './pages/Auth/Register';

import Orders from './pages/Orders/Orders';
import Profile from './pages/Dashboard/Profile';
import SavedDesigns from './pages/SavedDesign/SavedDesigns';

import CartPage from './pages/Cart/Cart';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrderConfirmation from './pages/Checkout/OrderConfirmation';
import NotFound from './pages/NotFound404/NotFound';

import { Elements } from '@stripe/react-stripe-js';
import './App.css';
import Home from './pages/Home/Home';
import ProductPage from './pages/Products/ProductPage';
import { stripePromise } from './services/stripe';
import CustomizerPage from './pages/Customizer/CustomizerPage';
import Login from './pages/Auth/Login';
import { ThemeProvider } from './providers/ThemeProvider';
import ARViewer from './pages/AR/ARViewer';
import TexturesLogos from './pages/TexturesLogos/TexturesLogos';
import { AdminDashboard } from './pages/Dashboard/AdminDashboard';
import { Dashboard } from './pages/Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <main className="app">
      <ToastContainer
        autoClose={3000}
        position="top-right"
        theme="dark"
        toastStyle={{
          background: '#1e1e22',
          color: '#fff',
          borderRadius: '10px',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />

      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Public Routes (no layout) */}
        <Route
          path="/login"
          element={
            <ThemeProvider>
              <Login />
            </ThemeProvider>
          }
        />
        <Route
          path="/register"
          element={
            <ThemeProvider>
              <Register />
            </ThemeProvider>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ThemeProvider>
              <ForgotPassword />
            </ThemeProvider>
          }
        />

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
          path="/textures-logos"
          element={
            <ProtectedRoute>
              <Layout>
                <TexturesLogos />
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
                <ThemeProvider>
                  <Profile />
                </ThemeProvider>
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
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-design/:designId?"
          element={
            <ProtectedRoute>
              <Layout>
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
                <ProductPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Layout>
                <CartPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/try-ar"
          element={
            <ProtectedRoute>
              <Layout>
                <TryOnAR />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection/shoes"
          element={
            <ProtectedRoute>
              <ARViewer />
            </ProtectedRoute>
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
            <ProtectedRoute>
              <Layout>
                <OrderConfirmation />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <Elements stripe={stripePromise}>
                <Layout>
                  <OrderConfirmation />
                </Layout>
              </Elements>
            </ProtectedRoute>
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
