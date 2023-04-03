import { Button, Box, TextField, Tooltip } from '@mui/material';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react';
import './Auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Auth = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSignUp, setIsSignUp] = useState(true);
    
    // eslint-disable-next-line
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    }, [])

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const isValidPassword = (password) => {
        return password.length >= 6;
    }

    const register = async () => {

        if (!isValidEmail(registerEmail) || !isValidPassword(registerPassword)) {
            setError("Please enter a valid email address and a password of minimum 6 characters.")
        }
        else {
            setError(null)
        }
        console.log(registerEmail, registerPassword);
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async () => {

        if (!isValidEmail(loginEmail) || !isValidPassword(loginPassword)) {
            setError("Please enter a valid email address and a password of minimum 6 characters.")
        }
        else {
            setError(null)
        }

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    // eslint-disable-next-line
    const logout = async () => {
        await signOut(auth);
    }

    const handleChangeRegisterEmail = (e) => {
        setRegisterEmail(e.target.value)
    }

    const handleChangeRegisterPassword = (e) => {
        setRegisterPassword(e.target.value)
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        register();
    }

    const handleChangeLoginEmail = (e) => {
        setLoginEmail(e.target.value)
    }

    const handleChangeLoginPassword = (e) => {
        setLoginPassword(e.target.value)
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        login();
    }

    const changeForm = (e) => {
        e.preventDefault()
        setIsSignUp(!isSignUp);
    }


    return (
        <div className='container auth-container'>
            <h2 className='heading-text text-center mt-5'>You must be logged in to use the app.</h2>
            <div className='row gx-4'>
                <div className='col-md-6 col-sm-12 auth-card text-align-center mx-auto mt-5 px-4 pb-1'>
                    <h5 className='text-center mt-3 logo-text'>{isSignUp ? "New User?" : "Already registered?"}</h5>
                    <form >
                        <Box className="details-box">
                            <TextField type={"email"} className="mt-4 details-field" onChange={isSignUp ? handleChangeRegisterEmail : handleChangeLoginEmail} margin='normal' label="Enter email address" variant="outlined" name='email' />
                            <TextField type="password" className="details-field" onChange={isSignUp ? handleChangeRegisterPassword : handleChangeLoginPassword} margin='normal' label="Set password (minimum 6 characters)" variant="outlined" name='password' />
                            <Tooltip title={error == null ? "" : error}>
                                <Button
                                    sx={{ backgroundColor: "#FC2947", color: "white", "&:hover": { color: "white", backgroundColor: "#7149C6" } }}
                                    variant="text"
                                    className='mt-2 mb-1'
                                    type="submit"
                                    onClick={isSignUp ? handleSubmitRegister : handleSubmitLogin}>
                                    {isSignUp ? "REGISTER" : "LOGIN"}
                                </Button>
                            </Tooltip>
                            <Button
                                sx={{ color: "black", "&:hover": { color: "white", backgroundColor: "#25316D" } }}
                                variant="text"
                                className='mt-1 mb-2'
                                type="submit"
                                onClick={changeForm}>
                                {isSignUp ? "Already Registered?" : "New user?"}
                            </Button>
                        </Box>
                    </form >
                </div>
            </div>
        </div>
    )
}

export default Auth
