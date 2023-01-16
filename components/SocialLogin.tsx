import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import globalStyle from "../styles";
import useSocialLogin from "../hooks/useSocialLogin";
import ErrorMessage from "./ErrorMessage";

const styles = StyleSheet.create({
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
});

const SocialLogin = () => {
	const { colors } = useTheme();
	const { googleSignIn, facebookSignIn } = useSocialLogin();
	const [errorMessage, setErrorMessage] = useState<string>("");

	return (
		<View style={styles.social_wrapper}>
			<Text variant='bodySmall'>or continue with</Text>
			<View style={globalStyle.horizontal_container}>
				<AntDesign
					style={styles.icon}
					name='google'
					size={40}
					color='#EA4335'
					onPress={() => googleSignIn().catch((error) => setErrorMessage(error.message))}
				/>
				{false && (
					<FontAwesome5
						style={styles.icon}
						name='apple'
						size={40}
						color='#000000'
						onPress={() =>
							googleSignIn().catch((error) => setErrorMessage(error.message))
						}
					/>
				)}
				<FontAwesome5
					style={styles.icon}
					name='facebook'
					size={40}
					color='#2374E1'
					onPress={() =>
						facebookSignIn().catch((error) => setErrorMessage(error.message))
					}
				/>
			</View>
			<ErrorMessage error={errorMessage} />
		</View>
	);
};
export default SocialLogin;
