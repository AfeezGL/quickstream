import React from "react";
import { auth, provider } from "../firebase";

const Auth = ({ user }) => {
	const login = () => {
		auth.signInWithPopup(provider);
	};

	const logout = () => {
		auth.signOut();
	};

	return (
		<div className="auth">
			{!user ? (
				<button onClick={login}>
					<i className="fa-solid fa-arrow-right-to-bracket"></i> Login
				</button>
			) : (
				<button onClick={logout}>
					<i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
				</button>
			)}
		</div>
	);
};

export default Auth;
