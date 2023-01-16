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
	stretch_container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "space-between",
	},
	horizontal_container: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "nowrap",
	},
	hero_text: {
		textAlign: "center",
		marginVertical: 50,
	},
});

export default globalStyle;
