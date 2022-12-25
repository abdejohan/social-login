import { useContext } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import AuthContext from "../context/Auth";
import globalStyle from "../styles";

const HomeScreen = () => {
	const { handleSignOut, user } = useContext(AuthContext);
	return (
		<View style={globalStyle.container}>
			<Text>{user?.email}</Text>
			<Text>user is signed in</Text>
			<Button onPress={() => handleSignOut()}>Sign out</Button>
		</View>
	);
};

export default HomeScreen;
