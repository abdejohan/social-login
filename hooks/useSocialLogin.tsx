import { useContext } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import AuthContext from "../context/Auth";

// Format and prettify the default firebase error message
const firebaseError = (errorMessage: any): string => {
	const message = errorMessage?.code?.replace("auth/", "").replaceAll("-", " ");
	if (typeof message === "string") return message;
	return "Undefined Error.";
};

const useSocialLogin = () => {
	const auth = getAuth();
	const { handleSignIn } = useContext(AuthContext);

	const createUser = async (email: string, password: string) => {
		// Create account and then login
		// Throw firebase error message if sign in fails
		try {
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			return handleSignIn(userCredential.user);
		} catch (error) {
			throw new Error(firebaseError(error));
		}
	};

	const passwordSignIn = async (email: string, password: string) => {
		// Sign in with firebase auth, using email and password
		// Throw firebase error message if needed
		try {
			const auth = getAuth();
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			return handleSignIn(userCredential.user);
		} catch (error) {
			throw new Error(firebaseError(error));
		}
	};

	const googleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			// This gives you a Google Access Token. You can use it to access Google APIs.
			// const credential = GoogleAuthProvider.credentialFromResult(result);
			return null;
		} catch (error) {
			throw new Error(firebaseError(error));
		}
	};

	const facebookSignIn = async () => {
		const provider = new FacebookAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			return null;
		} catch (error) {
			throw new Error(firebaseError(error));
		}
	};

	return {
		googleSignIn,
		facebookSignIn,
		createUser,
		passwordSignIn,
	};
};
export default useSocialLogin;
