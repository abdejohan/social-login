import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

// To apply the default browser preference instead of explicitly setting it.
//firebase.auth().useDeviceLanguage();

/**
 * Authenticate with Firebase using the Google provider object.
 * You can prompt your users to sign in with their Google Accounts either by opening a pop-up window or by redirecting to the sign-in page.
 * The redirect method is preferred on mobile devices.
 */

const useSocialLogin = () => {
	const provider = new GoogleAuthProvider();
	const auth = getAuth();

	const googleSignIn = async () => {
		try {
			const result = await signInWithRedirect(auth, provider);
			// This gives you a Google Access Token. You can use it to access Google APIs.
			//const credential = GoogleAuthProvider.credentialFromResult(result);
			return null;
		} catch (error) {
			return null;
		}
	};

	return { googleSignIn };
};

export default useSocialLogin;
