import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./auth/ProtectedRoute";

import Canvas from "./components/canvas";
import Customizer from "./pages/Customizer/Customizer";
import Home from "./pages/Home/Home";
import TryOnAR from "./pages/TryOnAR";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Orders from "./pages/Dashboard/Orders";
import SavedDesigns from "./pages/Dashboard/SavedDesigns";
import Profile from "./pages/Dashboard/Profile";

import CartPage from "./pages/Cart/Cart";
import ProductsPage from "./pages/Products/Products";
import OrderConfirmation from "./pages/Checkout/OrderConfirmation";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import NotFound from "./pages/NotFound404/NotFound";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./services/stripe";

const App: React.FC = () => {
	return (
		<main className="app">
			<ToastContainer position="top-right" autoClose={3000} />
			<Routes>
				{/* Public Routes (no layout) */}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />

				{/* Protected Routes */}
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
					path="/dashboard/orders"
					element={
						<ProtectedRoute>
							<Layout>
								<Orders />
							</Layout>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard/saved"
					element={
						<ProtectedRoute>
							<Layout>
								<SavedDesigns />
							</Layout>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard/profile"
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
								<Home />
								<Canvas />
								<Customizer />
							</Layout>
						</ProtectedRoute>
					}
				/>

				{/* Public Pages */}
				<Route
					path="/products"
					element={
						<Layout>
							<ProductsPage />
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
