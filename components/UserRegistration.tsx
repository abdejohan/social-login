import React, { useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { TextInput, useTheme, Text, Divider, Button } from "react-native-paper";
import InputValidation from "./InputValidation";
import { ValidInput } from "../types/index.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const UserRegistration: React.FC = (props) => {
	const { colors } = useTheme();
	const [email, setEmail] = useState<ValidInput>({ valid: false, text: "" });
	const [password, setPassword] = useState<ValidInput>({ valid: false, text: "" });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const createUser = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				const { accessToken, email } = userCredential.user as any;
				console.log(`
				CREATED USER:
				accessToken: ${accessToken}
				email: ${email}
				`);

				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("ERROR");
				console.log(errorCode, errorMessage);
				setErrorMessage(errorCode.replace("auth/", "").replaceAll("-", " "));
				// ..
			});
	};

	return (
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
				onPress={() => {
					createUser(email.text, password.text);
					console.log(`
					Email: ${email.text}
					Password: ${password.text}
					`);
				}}>
				Sign in
			</Button>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					marginVertical: 5,
				}}>
				{/* @ts-ignore */}
				<Divider bold style={{ flexGrow: 1 }} horizontalInset />
				<Text
					style={{ textAlign: "center", color: colors.onBackground, margin: 5 }}
					variant='bodySmall'>
					or
				</Text>
				{/* @ts-ignore */}
				<Divider bold style={{ flexGrow: 1 }} horizontalInset />
			</View>
			<Button onPress={() => {}}>Register</Button>
			<TouchableOpacity onPress={() => {}} style={{ padding: 10, marginTop: 20 }}>
				<Text
					style={{ textAlign: "center", color: colors.onBackground }}
					variant='labelSmall'>
					Forgot password?
				</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

export default UserRegistration;
