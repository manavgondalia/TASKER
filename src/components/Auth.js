import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./Auth.css";
import TextInput from "../elements/TextInput";
import Button from "../elements/Button";
import * as EmailValidator from "email-validator";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [isSignUp, setIsSignUp] = useState(true);

	// eslint-disable-next-line
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
	}, []);

	const isValidPassword = (password) => {
		return password.length >= 6;
	};

	const register = async () => {
		console.log(registerEmail, registerPassword);
		// eslint-disable-next-line
		const user = await createUserWithEmailAndPassword(
			auth,
			registerEmail,
			registerPassword
		);
	};

	const login = async () => {
		// eslint-disable-next-line
		const user = await signInWithEmailAndPassword(
			auth,
			loginEmail,
			loginPassword
		);
	};

	const handleChangeRegisterEmail = (e) => {
		const emailInput = e.target.value;
		setRegisterEmail(e.target.value);
		setIsValidEmail(
			EmailValidator.validate(emailInput) || emailInput.length === 0
		);
	};

	const handleChangeRegisterPassword = (e) => {
		setRegisterPassword(e.target.value);
	};

	const handleSubmitRegister = (e) => {
		e.preventDefault();
		console.log(registerEmail, registerPassword);
		if (!isValidEmail || registerEmail.length === 0) {
			toast.error("Email is invalid.");
			return;
		}
		if (!isValidPassword(registerPassword)) {
			toast.error("Password must be at least 6 characters long.");
			return;
		}
		const registerPromise = register();
		toast.promise(registerPromise, {
			loading: "Registering...",
			success: () => {
				"Registered successfully!";
				navigate("/tasks");
			},
			error: (err) => {
				switch (err.code) {
					case "auth/email-already-in-use":
						return "Email already registered.";
					default:
						return "Something went wrong.";
				}
			},
		});
	};

	const handleChangeLoginEmail = (e) => {
		const emailInput = e.target.value;
		setLoginEmail(e.target.value);
		setIsValidEmail(
			EmailValidator.validate(emailInput) || emailInput.length === 0
		);
	};

	const handleChangeLoginPassword = (e) => {
		setLoginPassword(e.target.value);
	};

	const handleSubmitLogin = (e) => {
		e.preventDefault();
		if (!isValidEmail || loginEmail.length === 0) {
			toast.error("Email is invalid.");
			return;
		}
		if (loginPassword.length === 0) {
			toast.error("Password cannot be empty.");
			return;
		}
		const loginPromise = login();
		toast.promise(loginPromise, {
			loading: "Logging in...",
			success: () => {
				setTimeout(() => {
					navigate("/tasks");
				}, 1000);
				return "Logged in successfully!";
			},
			error: (err) => {
				switch (err.code) {
					case "auth/user-not-found":
						return "Email not registered.";
					case "auth/wrong-password":
						return "Invalid credentials.";
					default:
						return "Something went wrong.";
				}
			},
		});
	};

	const changeForm = (e) => {
		e.preventDefault();
		setIsSignUp(!isSignUp);
		setLoginEmail("");
		setLoginPassword("");
		setRegisterEmail("");
		setRegisterPassword("");
		setLoginPassword("");
		setIsValidEmail(true);
	};

	return (
		<div className="container mx-auto">
			<Toaster />
			<p className="font-chivo font-semibold text-center text-xl mt-10">
				You must be logged in to use the app.
			</p>
			<div>
				<div className="auth-card text-align-center mx-auto mt-5 px-4 pb-1">
					<p className="text-center mt-4 font-chivo text-lg font-semibold">
						{isSignUp ? "Sign Up" : "Login"}
					</p>
					<form>
						<div className="flex flex-col justify-center content-center">
							<TextInput
								type="email"
								onChange={
									isSignUp ? handleChangeRegisterEmail : handleChangeLoginEmail
								}
								label="Enter email"
								variant="outlined"
								name="email"
								needsValidation={true}
								isValid={isValidEmail}
								errorType="Invalid email!"
								errorMessage="Please enter a valid email"
								value={isSignUp ? registerEmail : loginEmail}
							/>
							<TextInput
								type="password"
								onChange={
									isSignUp
										? handleChangeRegisterPassword
										: handleChangeLoginPassword
								}
								label={isSignUp ? "Set password" : "Enter password"}
								variant="outlined"
								name="password"
								value={isSignUp ? registerPassword : loginPassword}
							/>
							<Button
								variant="filled"
								label={isSignUp ? "Register" : "Login"}
								type="submit"
								onClick={isSignUp ? handleSubmitRegister : handleSubmitLogin}
								disabled={false}
							/>

							<Button
								variant="outlined"
								className="mb-4"
								type="submit"
								onClick={changeForm}
								label={isSignUp ? "Already Registered?" : "New user?"}
								disabled={false}
							></Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Auth;
