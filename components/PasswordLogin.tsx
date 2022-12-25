import React, { useState, useContext } from "react";
import { KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { TextInput, useTheme, Text, Divider, Button } from "react-native-paper";
import InputValidation from "./InputValidation";
import { ValidInput } from "../types/index.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../context/Auth";

const PasswordLogin: React.FC = () => {
	const { colors } = useTheme();
	const { handleSignIn } = useContext(AuthContext);
	const [email, setEmail] = useState<ValidInput>({ valid: false, text: "" });
	const [password, setPassword] = useState<ValidInput>({ valid: false, text: "" });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Sign in with email and password
	// Display error message if sign in fails
	const loginWithPassword = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => handleSignIn(userCredential.user))
			.catch((error) =>
				setErrorMessage(error.code.replace("auth/", "").replaceAll("-", " "))
			);
	};

	return (
		<KeyboardAvoidingView>
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
					<TextInput.Icon
						color={colors.surface}
						icon='account-outline'
						style={{ left: -10 }}
					/>
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
					<TextInput.Icon
						color={colors.primary}
						icon='lock-open-outline'
						style={{ left: -10 }}
					/>
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
			<TouchableOpacity onPress={() => {}} style={{ paddingBottom: 10 }}>
				<Text style={{ textAlign: "right" }} variant='labelSmall'>
					Forgot password?
				</Text>
			</TouchableOpacity>
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
				onPress={() => loginWithPassword(email.text, password.text)}>
				Sign in
			</Button>
		</KeyboardAvoidingView>
	);
};

export default PasswordLogin;
