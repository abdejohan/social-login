import "./navigation.ts";
type User = {
	id: number;
	email: string;
	createdAt: Date;
	updatedAt: Date;
};

type Recipe = {
	id: number;
	ownerId: number;
	title: string;
	description: string;
	instructions: string;
	category: string;
	starred: boolean;
	createdAt: Date;
	updatedAt: Date;
};

type ValidInput = {
	valid: boolean;
	text: string;
};

type ValidationRules =
	| "name"
	| "email"
	| "emailOrNull"
	| "phone"
	| "phoneOrNull"
	| "min8"
	| "min40"
	| "min1"
	| "text"
	| "onlyDigits"
	| "weightOrHeight"
	| "null";

type AutoCompleteTypes =
	| "off"
	| "username"
	| "password"
	| "email"
	| "name"
	| "tel"
	| "street-address"
	| "postal-code"
	| "cc-number"
	| "cc-csc"
	| "cc-exp"
	| "cc-exp-month"
	| "cc-exp-year";

type AutoCapitalizeTypes = "none" | "sentences" | "words" | "characters";

export {
	User,
	Recipe,
	ValidInput,
	ValidationRules,
	AutoCompleteTypes,
	AutoCapitalizeTypes,
};
