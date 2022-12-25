import {
	getAuth,
	signInWithRedirect,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
} from "firebase/auth";

/**
 * Authenticate with Firebase using the Google provider object.
 * You can prompt your users to sign in with their Google Accounts either by opening a pop-up window or by redirecting to the sign-in page.
 * The redirect method is preferred on mobile devices.
 */

// Format and prettify the default firebase error message
const firebaseError = (errorMessage: any) => {
	const message = errorMessage?.code?.replace("auth/", "").replaceAll("-", " ");
	if (typeof message === "string") return message;
	return "Undefined Error.";
};

const useSocialLogin = () => {
	const auth = getAuth();

	const googleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithRedirect(auth, provider);
			console.log("inside");
			console.log(result);
			// This gives you a Google Access Token. You can use it to access Google APIs. const credential = GoogleAuthProvider.credentialFromResult(result);
			return null;
		} catch (error) {
			throw new Error(firebaseError(error));
		}
	};

	const facebookSignIn = async () => {
		const provider = new FacebookAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			console.log("inside");
			console.log(result);
		} catch (error) {
			throw new Error(firebaseError(error));
		}
	};

	return { googleSignIn, facebookSignIn };
};
export default useSocialLogin;
