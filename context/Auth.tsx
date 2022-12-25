import React, {
	useState,
	FunctionComponent,
	useMemo,
	useCallback,
	useEffect,
} from "react";

type ContextType = {
	token: string | null;
	isSignedIn: boolean;
	user: object;
	setUser: (value: object) => void;
	setIsSignedIn: (value: boolean) => void;
	setToken: (value: string) => void;
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
});

export const AuthContextProvider: FunctionComponent<AuthContextProps> = (
	props: AuthContextProps
) => {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<{}>({});
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

	const saveToken = useCallback(
		(t: string) => {
			if (typeof t === "string") console.log("Saved token: " + t);
		},
		[token]
	);

	useEffect(() => {
		// initiliaze values
		if (user?.email && token) {
			setIsSignedIn(true);
		} else {
			setIsSignedIn(false);
		}
	}, [user]);

	const state = useMemo(
		() => ({
			token,
			isSignedIn,
			user,
			setUser,
			setIsSignedIn,
			setToken,
		}),
		[token, isSignedIn, user, setUser, setIsSignedIn, setToken]
	);

	return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
