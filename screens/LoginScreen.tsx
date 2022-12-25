import React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordLogin from "../components/PasswordLogin";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
	},
});

interface LoginProps {
	navigation: any;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={styles.container}>
			<PasswordLogin navigation={navigation} />
			<Button onPress={() => navigation.navigate("SignUp")}>Sign up</Button>
		</KeyboardAwareScrollView>
	);
};

export default LoginScreen;
