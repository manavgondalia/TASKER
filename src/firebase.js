// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD76wJ4DkmbhIQf_iovd8MRij3f5Ov-NMM",
	authDomain: "tasker-zen.firebaseapp.com",
	projectId: "tasker-zen",
	storageBucket: "tasker-zen.appspot.com",
	messagingSenderId: "166723614517",
	appId: "1:166723614517:web:1ac1eacdf2a27da37f7e7c",
	measurementId: "G-WGK37ZNJK2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
