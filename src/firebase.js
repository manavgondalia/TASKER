// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD2HZeXgpaUSzz4DCAAeoqNYm6Bm67k3Cs",
	authDomain: "tasker-data.firebaseapp.com",
	projectId: "tasker-data",
	storageBucket: "tasker-data.appspot.com",
	messagingSenderId: "209833969440",
	appId: "1:209833969440:web:06328b89bd2222c9acb945",
	measurementId: "G-3F3CXVFTLL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
