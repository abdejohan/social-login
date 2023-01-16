import React, {
	useState,
	FunctionComponent,
	useMemo,
	useCallback,
	useEffect,
} from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

type ContextType = {
	isSignedIn: boolean;
	user: object;
	handleSignIn: (userCredential: any) => void;
	handleSignOut: () => void;
};

type AuthContextProps = {
	children: React.ReactNode;
};

const AuthContext = React.createContext<ContextType>({
	isSignedIn: false,
	user: {},
	handleSignIn: () => {},
	handleSignOut: () => {},
});

export const AuthContextProvider: FunctionComponent<AuthContextProps> = (
	props: AuthContextProps
) => {
	const [user, setUser] = useState<{}>({});
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

	const checkAuthState = useCallback(async () => {
		const auth = getAuth();

		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				handleSignIn(user);
				const uid = user.uid;
			} else {
				console.log("Did not find a valid token, no user is signed in.");
				// User is signed out
				// ...
			}
		});
	}, []);

	const handleSignIn = useCallback(async (user: any) => {
		const { email } = user;
		setUser({ email });
		setIsSignedIn(true);
		console.log(`
			User signed in:
			email: ${email}
			`);
	}, []);

	const handleSignOut = useCallback(async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			setIsSignedIn(false);
			console.log("Sign out successful.");
		} catch (error) {
			console.log("An error happened, could not sign out user: " + error);
		}
	}, []);

	useEffect(() => {
		// Only runs once, and checks for a access token
		checkAuthState();
	}, []);

	const state = useMemo(
		() => ({ isSignedIn, user, handleSignIn, handleSignOut }),
		[isSignedIn, user, handleSignIn, handleSignOut]
	);

	return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
