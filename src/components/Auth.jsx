import React from "react";
import { auth, provider } from "../firebase";

const Auth = ({ user }) => {
	const login = () => {
		auth.signInWithPopup(provider);
	};

	const logout = () => {
		auth.signOut();
	};

	return user ? (
		<button
			className=" text-white shadow-lg py-2 px-2 rounded  flex items-center justify-center"
			onClick={logout}
		>
			<i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>
			Logout
		</button>
	) : (
		<button
			className=" text-white shadow-lg py-2 px-2 rounded  flex items-center justify-center"
			onClick={login}
		>
			<i className="fa-solid fa-arrow-right-to-bracket mr-2"></i>
			Login
		</button>
	);
};

export default Auth;
