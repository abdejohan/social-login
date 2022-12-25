import { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import AuthContext from "../context/Auth";

const HomeScreen = () => {
	const { handleSignOut } = useContext(AuthContext);
	return (
		<View>
			<Text>Home Screen</Text>
			<Button onPress={() => handleSignOut()}>Sign out</Button>
		</View>
	);
};

export default HomeScreen;
