import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeProvider from "./context/Theme";
import useCachedResources from "./hooks/useCachedResources";

export default function App() {
	const isLoadingComplete = useCachedResources();

	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<View style={styles.container}>
					{isLoadingComplete ? (
						<Text>Open up App.tsx to start working on your app!</Text>
					) : (
						<Text>NOT YET LOADED!</Text>
					)}
				</View>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
