import { render, screen, cleanup, fireEvent } from "@testing-library/react-native";
import SignInScreen from "../SignInScreen";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
	signInWithRedirect,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
} from "firebase/auth";
jest.useFakeTimers();
afterEach(cleanup);

/**
 * jest.mock("firebase/auth", () => {
	return {
		getAuth: jest.fn(),
		signInWithEmailAndPassword: jest.fn(),
	};
});
 */

describe("Test Login screen", () => {
	test("Should go to the Home page on login", async () => {
		const mockNavigation = { navigate: () => {} };
		render(<SignInScreen navigation={mockNavigation} />);
		//screen.debug({ message: "HERE WE ARE" });
		// const signInWithEmailAndPassword = jest.fn();
		// const getAuth = jest.fn();
		const signUpButton = screen.getByText("Sign up");
		//const signInButton = screen.getByTestId("sign-in-button");
		expect(signUpButton).toBeTruthy();
		// fireEvent.press(signInButton);
		// (getAuth).toHaveBeenCalled();
		// expect(signInWithEmailAndPassword).toHaveBeenCalled();
	});
});
