import React from "react";
import { useColorScheme } from "react-native";
import {
	Provider as PaperProvider,
	MD3LightTheme,
	MD3DarkTheme,
	configureFonts,
} from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { Theme as NavigationThemeType } from "@react-navigation/native/lib/typescript/src/types";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { fontConfig, darkColors, defaultColors } from "../utils/theme";

type ThemeProps = {
	children: React.ReactNode;
};

const PaperThemeLight: ThemeProp = {
	...MD3LightTheme,
	roundness: 5,
	colors: {
		...MD3LightTheme.colors,
		...defaultColors,
	},
	fonts: configureFonts({ config: fontConfig }),
};

const PaperThemeDark: ThemeProp = {
	...MD3DarkTheme,
	roundness: 5,
	colors: {
		...MD3DarkTheme.colors,
		...darkColors,
	},
	dark: true,
	fonts: configureFonts({ config: fontConfig }),
};

export const NavigationLightTheme: NavigationThemeType = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...defaultColors,
	},
};

export const NavigationDarkTheme: NavigationThemeType = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		...darkColors,
	},
};

export const ThemeProvider: React.FC<ThemeProps> = ({ children }: ThemeProps) => {
	const colorScheme = useColorScheme();

	return (
		<PaperProvider theme={colorScheme === "dark" ? PaperThemeDark : PaperThemeLight}>
			{children}
		</PaperProvider>
	);
};

export default ThemeProvider;
