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
        <div>
            {!user ? (
                <button onClick={login}>login</button>
            ) : (
                <button onClick={logout}>logout</button>
            )}
        </div>
    );
};

export default Auth;
