import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { useColorScheme } from "react-native";
import { useTheme } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types/navigation.js";
import { NavigationDarkTheme, NavigationLightTheme } from "../context/Theme";
import LoginScreen from "../screens/LoginScreen";
import AuthContext from "../context/Auth";
import LinkingConfiguration from "./LinkingConfiguration";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const { colors } = useTheme();
	const { isSignedIn } = useContext(AuthContext);

	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: {
					borderWidth: 1,
					width: "100%",
				},
				headerShadowVisible: false,
				headerTitleAlign: "center",
				headerStyle: { backgroundColor: colors.background },
			}}>
			{!isSignedIn ? (
				<Stack.Screen name='Login' component={LoginScreen} />
			) : (
				<>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
}

export default function Navigation() {
	const colorScheme = useColorScheme();
	console.log(colorScheme);

	return (
		<NavigationContainer
			theme={colorScheme === "dark" ? NavigationDarkTheme : NavigationLightTheme}
			linking={LinkingConfiguration}>
			<RootNavigator />
		</NavigationContainer>
	);
}