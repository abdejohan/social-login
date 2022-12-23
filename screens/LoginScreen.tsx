import React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordLogin from "../components/PasswordLogin";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
		backgroundColor: "black",
	},
});

const LoginScreen: React.FC = () => {
	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={styles.container}>
			<PasswordLogin />
		</KeyboardAwareScrollView>
	);
};

export default LoginScreen;
