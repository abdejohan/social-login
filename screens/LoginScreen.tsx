import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordLogin from "../components/PasswordLogin";
import { Button, Text, useTheme } from "react-native-paper";
import useSocialLogin from "../hooks/useSocialLogin";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import globalStyle from "../styles";

const styles = StyleSheet.create({
	hero_text: {
		textAlign: "center",
		marginVertical: 50,
	},
	social_wrapper: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	icon: {
		margin: 5,
		padding: 10,
	},
	sign_up_wrapper: {},
	error_container: { minHeight: 20 },
});

interface LoginProps {
	navigation: any;
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
	const { googleSignIn, facebookSignIn } = useSocialLogin();
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { colors } = useTheme();
	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={globalStyle.container}>
			<Text style={styles.hero_text} variant='displaySmall'>
				Sign in
			</Text>
			<PasswordLogin />
			<View style={styles.social_wrapper}>
				<Text variant='bodySmall'>or sign in with</Text>
				<View style={globalStyle.horizontal_container}>
					<AntDesign
						style={styles.icon}
						name='google'
						size={40}
						color='#EA4335'
						onPress={() =>
							googleSignIn().catch((error) => setErrorMessage(error?.message))
						}
					/>
					<FontAwesome5
						style={styles.icon}
						name='apple'
						size={40}
						color='#000000'
						onPress={() =>
							googleSignIn().catch((error) => setErrorMessage(error?.message))
						}
					/>
					<FontAwesome5
						style={styles.icon}
						name='facebook'
						size={40}
						color='#2374E1'
						onPress={() =>
							facebookSignIn().catch((error) => setErrorMessage(error?.message))
						}
					/>
				</View>
			</View>
			<View style={styles.error_container}>
				{errorMessage && (
					<Text
						variant='bodySmall'
						style={{ color: colors.error, backgroundColor: colors.errorContainer }}>
						{errorMessage}.
					</Text>
				)}
			</View>
			<View style={{ flexGrow: 1 }} />
			<View style={styles.sign_up_wrapper}>
				<Text variant='bodySmall'>Do you not have an account?</Text>
				<Button onPress={() => navigation.navigate("SignUp")}>Sign up</Button>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default LoginScreen;
