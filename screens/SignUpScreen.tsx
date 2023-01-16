import React, { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { TextInput, useTheme, Text, Button } from "react-native-paper";
import InputValidation from "../components/InputValidation";
import { ValidInput } from "../types/index.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useSocialLogin from "../hooks/useSocialLogin";
import ErrorMessage from "../components/ErrorMessage";
import globalStyle from "../styles";

interface SignUpProps {
	navigation: any;
}

const SignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
	const { colors } = useTheme();
	const { createUser } = useSocialLogin();
	const [email, setEmail] = useState<ValidInput>({ valid: false, text: "" });
	const [password, setPassword] = useState<ValidInput>({ valid: false, text: "" });
	const [errorMessage, setErrorMessage] = useState<string>("");

	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={globalStyle.stretch_container}>
			<KeyboardAvoidingView>
				<Text style={globalStyle.hero_text} variant='displaySmall'>
					Sign up
				</Text>
				<Text variant='labelMedium'>Email</Text>
				<InputValidation
					onValidation={(valid: boolean, text) => setEmail({ valid, text })}
					validationRule='email'
					errorMessage='Please enter a valid email address.'
					placeholder='example@email.com'
					autoComplete='email'
					autoCorrect={false}
					mode='flat'
					left={<TextInput.Icon color={colors.surface} icon='account-outline' />}
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
					autoCapitalize='none'
					autoComplete='password'
					autoCorrect={false}
					mode='flat'
					placeholder='********'
					left={<TextInput.Icon color={colors.primary} icon='lock-open-outline' />}
					style={{ backgroundColor: "white" }}
					returnKeyType='send'
					secureTextEntry
					clearTextOnFocus
					spellCheck={false}
					underlineColor={colors.primary}
					value={password?.text}
					onSubmitEditing={() => {}}
					onFocus={() => setErrorMessage("")}
				/>
				<ErrorMessage error={errorMessage} />
				<Button
					mode='contained'
					onPress={() =>
						createUser(email.text, password.text).catch((error) =>
							setErrorMessage(error.message)
						)
					}>
					Create account
				</Button>
				<View style={{ flexGrow: 1 }} />
			</KeyboardAvoidingView>
			<Button onPress={() => navigation.navigate("SignIn")}>Sign in</Button>
		</KeyboardAwareScrollView>
	);
};

export default SignUpScreen;
