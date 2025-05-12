import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { auth, db } from "../services/firebase";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			setUser(firebaseUser);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	const logout = async () => {
		try {
			await signOut(auth);
			toast.success("Logged out successfully!");
		} catch (err: any) {
			toast.error("Logout failed!");
			console.error("Logout error:", err);
		}
	};

	const register = async (email: string, password: string, name?: string) => {
		try {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (name) {
				await setDoc(doc(db, "users", userCred.user.uid), {
					name,
					email,
					createdAt: new Date().toISOString(),
				});
			}
			toast.success("Registered successfully!");
		} catch (err: any) {
			console.error("[AuthProvider] Registration error:", err);
			toast.error(err.message);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			toast.success("Login successful!");
		} catch (err: any) {
			toast.error(err.message);
			console.error("Login error:", err);
		}
	};

	const forgotPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			toast.success("Password reset email sent!");
		} catch (err: any) {
			console.error("Forgot password error:", err);
			toast.error(err.message);
		}
	};

	const isAuthenticated = !!user;

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				isAuthenticated,
				register,
				forgotPassword,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};
