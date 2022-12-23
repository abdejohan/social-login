import React, { useState } from "react";
import {
	View,
	TextStyle,
	ReturnKeyType,
	KeyboardType,
	ViewStyle,
	Platform,
} from "react-native";
import { useTheme, TextInput, Text } from "react-native-paper";
import {
	AutoCapitalizeTypes,
	AutoCompleteTypes,
	ValidationRules,
} from "../types/index.js";

interface Props {
	inputLabel?: string;
	right?: React.ReactNode;
	validationContainerStyle?: ViewStyle;
	multiline?: boolean;
	value?: string;
	maxLength?: number;
	textAlign?: "right" | "left" | "center" | undefined;
	minHeight?: number;
	numberOfLines?: number | undefined;
	validationRule?: ValidationRules;
	errorMessage?: string;
	blurOnSubmit?: boolean;
	returnKeyType?: ReturnKeyType;
	keyboardType?: KeyboardType;
	onSubmitEditing?: (event: { nativeEvent: { text: string } }) => void;
	onValidation?(isValid: boolean | boolean[], text: string): any;
	onChangeText?(value: string): string;
	autoCapitalize?: AutoCapitalizeTypes;
	autoCorrect?: boolean;
	autoCompleteType?: AutoCompleteTypes;
	autoComplete?: any;
	outlineColor?: any;
	left?: React.ReactNode;
	theme?: any;
	onFocus?: any;
	secureTextEntry?: any;
	clearTextOnFocus?: any;
	spellCheck?: any;
	placeholder?: any;
	placeholderTextColor?: any;
	mode?: any;
	style?: TextStyle;
	activeOutlineColor?: any;
}

const InputValidation: React.FC<Props> = (props) => {
	const { colors } = useTheme();
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const {
		inputLabel,
		validationRule,
		onValidation,
		onChangeText,
		errorMessage,
		numberOfLines,
		right,
		validationContainerStyle,
	} = props;
	const [isValidated, setIsValidated] = useState<boolean>(false);
	const [interactedWithField, setInteractedWithField] = useState<boolean>(false);

	const regExRules = {
		name: "^.{2,}$", // min 2 char
		email: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
		emailOrNull: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$|^$",
		phone: "^\\+?((\\d\\-|\\d)+\\d){4,}$",
		phoneOrNull: "^\\+?((\\d\\-|\\d)+\\d){4,}$|^$",
		min8: "^.{8,}$", // min 8 char
		min40: "^.{40,}$", // min 40 char
		min1: "^.{1,}$", // min 1 char
		text: "(.|\n){1,}$", // min 1 char
		onlyDigits: "^[0-9]+$",
		weightOrHeight: "^[1-9]\\d*(\\.\\d+)?$",
		null: "^$|",
	};

	// Tests the input against the RegEx string(s) provided
	const handleValidation = (value: string) => {
		if (!validationRule) return true;
		// string pattern, one validation rule
		if (Object.keys(regExRules).includes(validationRule)) {
			const condition = new RegExp(regExRules[validationRule], "g");
			return condition.test(value);
		}
		return true;
	};

	// this validates the input everytime the input is changed
	const onChange = (text: string) => {
		const isValid = handleValidation(text);
		setIsValidated(isValid);
		return (
			onValidation && onValidation(isValid, text), onChangeText && onChangeText(text)
		);
	};

	return (
		<View style={{ ...validationContainerStyle }}>
			<TextInput
				mode='outlined'
				outlineColor={colors.background}
				numberOfLines={Platform.OS === "ios" ? undefined : numberOfLines}
				minHeight={
					Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : undefined
				}
				onBlur={() => setInteractedWithField(true)}
				underlineColor='transparent'
				onChangeText={(text) => onChange(text)}
				right={right}
				{...props}
				style={{ backgroundColor: colors.surface, ...props.style }}
			/>
			<View style={{ flexDirection: "row", minHeight: 14 }}>
				{validationRule && errorMessage && (
					<Text
						key={errorMessage}
						style={{
							paddingLeft: 5,
							// eslint-disable-next-line no-nested-ternary
							color: interactedWithField
								? isValidated
									? "transparent"
									: colors.error
								: "transparent",
						}}>
						{`\u00B7 ${errorMessage}`}
					</Text>
				)}
			</View>
		</View>
	);
};
export default InputValidation;
