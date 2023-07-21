import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ children }) => {
	const [user, setUser] = useState({});
	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	return user ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
