import React, { useState } from "react";
import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { TextInput, useTheme, Text, Button } from "react-native-paper";
import InputValidation from "../common/InputValidation";
import { ValidInput } from "../types/index.js";
import ErrorMessage from "./ErrorMessage";
import useSocialLogin from "../hooks/useSocialLogin";

const PasswordLogin: React.FC = () => {
	const { colors } = useTheme();
	const { passwordSignIn } = useSocialLogin();
	const [email, setEmail] = useState<ValidInput>({ valid: false, text: "" });
	const [password, setPassword] = useState<ValidInput>({ valid: false, text: "" });
	const [errorMessage, setErrorMessage] = useState<string>("");

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
				placeholder='example@email.com'
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
				onFocus={() => setErrorMessage("")}
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
				placeholder='********'
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
				onFocus={() => setErrorMessage("")}
			/>
			<TouchableOpacity onPress={() => {}} style={{ paddingBottom: 10 }}>
				<Text style={{ textAlign: "right" }} variant='labelSmall'>
					Forgot password?
				</Text>
			</TouchableOpacity>
			<ErrorMessage error={errorMessage} />
			<Button
				disabled={email.valid ? (password.valid ? false : true) : true}
				mode='contained'
				testID='sign-in-button'
				onPress={() =>
					passwordSignIn(email.text, password.text).catch((error) =>
						setErrorMessage(error.message)
					)
				}>
				Sign in
			</Button>
		</KeyboardAvoidingView>
	);
};

export default PasswordLogin;
