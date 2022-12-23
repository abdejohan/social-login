import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

const LoginScreen = () => {
	return (
		<View style={styles.container}>
			<Text>LOGIN Screen</Text>
		</View>
	);
};

export default LoginScreen;
