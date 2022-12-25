import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { TextInput, useTheme, Text, Button } from "react-native-paper";
import InputValidation from "../components/InputValidation";
import { ValidInput } from "../types/index.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthContext from "../context/Auth";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "space-between",
	},
});

interface SignUpProps {
	navigation: any;
}

const SignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
	const { colors } = useTheme();
	const { setToken, setUser } = useContext(AuthContext);
	const [email, setEmail] = useState<ValidInput>({ valid: false, text: "" });
	const [password, setPassword] = useState<ValidInput>({ valid: false, text: "" });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const createUser = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// User is now signed in
				const user = userCredential.user;
				const { email, accessToken } = user as any;
				setToken(accessToken);
				setUser({ email });
				console.log(`
				CREATED USER:
				accessToken: ${accessToken}
				email: ${email}
				`);
			})
			.catch((error) => {
				console.log(error.code);
				setErrorMessage(error.code.replace("auth/", "").replaceAll("-", " "));
			});
	};

	return (
		<>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={styles.container}>
				<KeyboardAvoidingView>
					<Text
						style={{ color: colors.onBackground, textAlign: "center" }}
						variant='displaySmall'>
						Sign in
					</Text>
					<Text variant='labelMedium'>Email</Text>
					<InputValidation
						onValidation={(valid: boolean, text) => setEmail({ valid, text })}
						validationRule='email'
						errorMessage='Please enter a valid email address.'
						autoComplete='email'
						autoCorrect={false}
						mode='flat'
						placeholder=''
						left={
							// @ts-ignore
							<TextInput.Icon color={colors.surface} icon='account-outline' />
						}
						style={{ backgroundColor: "white" }}
						underlineColor={colors.primary}
						value={email?.text}
						onFocus={() => setErrorMessage(null)}
						keyboardType='email-address'
					/>
					<Text variant='labelMedium'>Password</Text>
					<InputValidation
						onValidation={(valid: boolean, text) => setPassword({ valid, text })}
						validationRule='min8'
						errorMessage='Password must be at least 8 characters.'
						// keyboardType="visible-password"
						// returnKeyLabel="logga in"
						autoCapitalize='none'
						autoComplete='password'
						autoCorrect={false}
						mode='flat'
						placeholder=''
						left={
							// @ts-ignore
							<TextInput.Icon color={colors.primary} icon='lock-open-outline' />
						}
						style={{ backgroundColor: "white" }}
						returnKeyType='send'
						secureTextEntry
						clearTextOnFocus
						spellCheck={false}
						underlineColor={colors.primary}
						// theme={{ colors: { text: colors.onBackground } }} // this sets the text color
						//activeOutlineColor={colors.background}
						value={password?.text}
						onSubmitEditing={() => {}}
						onFocus={() => setErrorMessage(null)}
					/>
					<View style={{ minHeight: 20 }}>
						{errorMessage && (
							<Text
								style={{
									paddingLeft: 10,
									color: colors.error,
									backgroundColor: colors.errorContainer,
								}}>
								{errorMessage}.
							</Text>
						)}
					</View>
					<Button
						mode='contained'
						onPress={() => {
							createUser(email.text, password.text);
							console.log(`
					Email: ${email.text}
					Password: ${password.text}
					`);
						}}>
						Create account
					</Button>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginVertical: 5,
						}}></View>
					<View style={{ flexGrow: 1 }} />
				</KeyboardAvoidingView>
				<Button onPress={() => navigation.navigate("Login")}>Sign in</Button>
			</KeyboardAwareScrollView>
		</>
	);
};

export default SignUpScreen;
