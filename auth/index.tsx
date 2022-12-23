import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/connection";

// To apply the default browser preference instead of explicitly setting it.
//firebase.auth().useDeviceLanguage();

const GoogleAuth = () => {
	const provider = new GoogleAuthProvider();

	return signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			console.log("token");
			console.log(token);

			// The signed-in user info.
			const user = result.user;
			console.log("user");
			console.log(user);
			// ...
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
};

export { GoogleAuth };
