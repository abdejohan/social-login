import * as Font from "expo-font";
import { useEffect, useState } from "react";
import NerkoOneRegular from "../assets/fonts/NerkoOne-Regular.ttf";
import NunitoSemiBold from "../assets/fonts/Nunito-SemiBold.ttf";
import NunitoRegular from "../assets/fonts/Nunito-Regular.ttf";
import NunitoBold from "../assets/fonts/Nunito-Bold.ttf";

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				// SplashScreen.preventAutoHideAsync();
				// Load fonts
				await Font.loadAsync({
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					"Nerko-Regular": NerkoOneRegular,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					"Nunito-SemiBold": NunitoSemiBold,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					"Nunito-Bold": NunitoBold,
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					"Nunito-Regular": NunitoRegular,
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setTimeout(() => {
					setLoadingComplete(true);
				}, 1000);
				// SplashScreen.hideAsync();
			}
		}

		loadResourcesAndDataAsync()
			.then()
			.catch((error) => console.log(error));
	}, []);

	return isLoadingComplete;
}
