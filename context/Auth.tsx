import React, { useState, FunctionComponent, useMemo } from "react";

type ContextType = {
	token: string | null;
	isSignedIn: boolean;
	setIsSignedIn: (value: boolean) => void;
};

type AuthContextProps = {
	children: React.ReactNode;
};

const AuthContext = React.createContext<ContextType>({
	token: null,
	isSignedIn: false,
	setIsSignedIn: () => {},
});

export const AuthContextProvider: FunctionComponent<AuthContextProps> = (
	props: AuthContextProps
) => {
	const [token, setToken] = useState<string | null>(null);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

	const state = useMemo(
		() => ({
			token,
			isSignedIn,
			setIsSignedIn,
		}),
		[token, isSignedIn, setIsSignedIn]
	);

	return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
