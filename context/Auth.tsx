import React, {
	useState,
	FunctionComponent,
	useMemo,
	useCallback,
	useEffect,
} from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { getAuth, signOut } from "firebase/auth";

type ContextType = {
	token: string | null;
	isSignedIn: boolean;
	user: object;
	setUser: (value: object) => void;
	setIsSignedIn: (value: boolean) => void;
	setToken: (value: string) => void;
	handleSignIn: (userCredential: any) => void;
	handleSignOut: () => void;
};

type AuthContextProps = {
	children: React.ReactNode;
};

const AuthContext = React.createContext<ContextType>({
	token: null,
	isSignedIn: false,
	user: {},
	setIsSignedIn: () => {},
	setUser: () => {},
	setToken: () => {},
	handleSignIn: () => {},
	handleSignOut: () => {},
});

export const AuthContextProvider: FunctionComponent<AuthContextProps> = (
	props: AuthContextProps
) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<{}>({});
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const { getData, storeData, removeData } = useAsyncStorage();

	const fetchToken = useCallback(async () => {
		const accessToken = await getData("ACCESS_TOKEN");
		saveTokenToStorage(accessToken);
	}, []);

	const saveTokenToStorage = useCallback(async (t: string) => {
		if (typeof t === "string") {
			await storeData("ACCESS_TOKEN", t);
			setToken(t);
			setIsSignedIn(true);
		}
	}, []);

	const handleSignIn = useCallback(async (userCredential: any) => {
		const { user } = userCredential;
		const { accessToken, email } = user as any;
		setUser({ email });
		saveTokenToStorage(accessToken);
		console.log(`
			User signed in:
			accessToken: ${accessToken}
			email: ${email}
			`);
	}, []);

	const handleSignOut = useCallback(async () => {
		const auth = getAuth();
		await signOut(auth)
			.then(() => console.log("Sign-out successful."))
			.catch((error) => console.log("An error happened: " + error));
		await removeData("ACCESS_TOKEN");
		setToken(null);
		setIsSignedIn(false);
	}, []);

	useEffect(() => {
		// Only runs once
		// Fetches access token
		fetchToken();
	}, []);

	const state = useMemo(
		() => ({
			token,
			isSignedIn,
			user,
			setUser,
			setIsSignedIn,
			setToken,
			handleSignIn,
			handleSignOut,
		}),
		[
			token,
			isSignedIn,
			user,
			setUser,
			setIsSignedIn,
			setToken,
			handleSignIn,
			handleSignOut,
		]
	);

	return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
