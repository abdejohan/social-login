import { render, screen, cleanup } from "@testing-library/react-native";
import PasswordLogin from "../PasswordLogin";
jest.useFakeTimers();
afterEach(cleanup);

describe("Make sure input elements and submit buttom are visible", () => {
	test("Check if elements are truthy", async () => {
		render(<PasswordLogin />);
		screen.debug({ message: "!!Failed!!" });
		expect(screen.getByPlaceholderText("example@email.com"));
		expect(screen.getByPlaceholderText("********"));
		expect(screen.getByTestId("sign-in-button"));
	});
});
