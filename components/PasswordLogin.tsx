/* eslint-disable no-tabs */
import React, { useContext, useEffect, useState, RefObject } from "react";
import { KeyboardAvoidingView, TouchableOpacity, View } from "react-native";
import { TextInput, useTheme, Text, Divider, Button } from "react-native-paper";
import { Buffer } from "buffer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AuthContext from "../context/Auth";
import InputValidation from "./InputValidation";
import { ValidInput } from "../types/index.js";
import { RootStackParamList } from "../types/navigation";

const PasswordLogin: React.FC = (props) => {
	const { colors } = useTheme();
	const { setIsSignedIn } = useContext(AuthContext);
	const [email, setEmail] = useState<ValidInput>({ valid: false, text: "" });
	const [password, setPassword] = useState<ValidInput>({ valid: false, text: "" });
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	return (
		<KeyboardAvoidingView>
			<Text
				style={{ color: colors.onBackground, textAlign: "center" }}
				variant='displaySmall'>
				Sign in
			</Text>
			<InputValidation
				onValidation={(valid: boolean, text) => setEmail({ valid, text })}
				validationRule='email'
				errorMessage='Please enter a valid email address.'
				autoComplete='email'
				autoCorrect={false}
				mode='outlined'
				placeholder='Email'
				right={
					// @ts-ignore
					<TextInput.Icon color={colors.surface} icon='account-outline' />
				}
				style={{ backgroundColor: "white" }}
				theme={{ roundness: 15 }}
				value={email?.text}
				onFocus={() => setErrorMessage(null)}
				keyboardType='email-address'
			/>
			<InputValidation
				onValidation={(valid: boolean, text) => setPassword({ valid, text })}
				validationRule='min8'
				errorMessage='Password must be at least 8 characters.'
				// keyboardType="visible-password"
				// returnKeyLabel="logga in"
				autoCapitalize='none'
				autoComplete='password'
				autoCorrect={false}
				mode='outlined'
				placeholder='Password'
				right={
					// @ts-ignore
					<TextInput.Icon color={colors.primary} icon='lock-open-outline' />
				}
				style={{ backgroundColor: "white" }}
				theme={{ roundness: 15 }}
				returnKeyType='send'
				secureTextEntry
				clearTextOnFocus
				spellCheck={false}
				// theme={{ colors: { text: colors.onBackground } }} // this sets the text color
				activeOutlineColor={colors.background}
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
						{errorMessage}, try again.
					</Text>
				)}
			</View>

			<Button onPress={() => {}}>Sign in</Button>
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

export default PasswordLogin;
