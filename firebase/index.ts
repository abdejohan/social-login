import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAhsjdiP2mxoDRXXpQuz8Pco64zrA7oqjk",
	authDomain: "social-login-8a192.firebaseapp.com",
	projectId: "social-login-8a192",
	storageBucket: "social-login-8a192.appspot.com",
	messagingSenderId: "611002235396",
	appId: "1:611002235396:web:9afb9a021e3e85a4d81351",
	measurementId: "G-WQZ6HWJQCT",
};

// Initialize Firebase
const initializeFirebaseApp = () => {
	const app: FirebaseApp = initializeApp(firebaseConfig);
	getAuth(app);
	console.log("Initialized Firebase App.");
};

export { initializeFirebaseApp };
