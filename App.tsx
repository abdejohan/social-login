import { Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider } from "./context/Auth";
import ThemeProvider from "./context/Theme";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

export default function App() {
	const isLoadingComplete = useCachedResources();

	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<AuthContextProvider>
					{isLoadingComplete ? <Navigation /> : <Text>LOADING</Text>}
				</AuthContextProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
