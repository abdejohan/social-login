import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function ErrorMessage({ error }: { error: string }): JSX.Element {
	const { colors } = useTheme();

	return (
		<View style={{ minHeight: 20 }}>
			<Text
				style={{
					paddingLeft: 10,
					color: colors.error,
					backgroundColor: colors.errorContainer,
				}}>
				{error}
			</Text>
		</View>
	);
}
