import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PasswordLogin from "../components/PasswordLogin";
import { Button, Text } from "react-native-paper";
import globalStyle from "../styles";
import SocialLogin from "../components/SocialLogin";

const styles = StyleSheet.create({
	hero_text: {
		textAlign: "center",
		marginVertical: 50,
	},
});

interface LoginProps {
	navigation: any;
}

const SignInScreen: React.FC<LoginProps> = ({ navigation }) => {
	return (
		<KeyboardAwareScrollView
			keyboardShouldPersistTaps='handled'
			contentContainerStyle={globalStyle.container}>
			<Text style={styles.hero_text} variant='displaySmall'>
				Sign in
			</Text>
			<PasswordLogin />
			<SocialLogin />
			<View style={globalStyle.expand} />
			<View>
				<Text variant='bodySmall'>Do you not have an account?</Text>
				<Button onPress={() => navigation.navigate("SignUp")}>Sign up</Button>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SignInScreen;
