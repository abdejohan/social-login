import { StyleSheet } from "react-native";

const globalStyle = StyleSheet.create({
	expand: {
		flexGrow: 1,
	},
	test: {
		borderWidth: 1,
		borderColor: "red",
	},
	container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
	},
	horizontal_container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "nowrap",
	},
});

export default globalStyle;
