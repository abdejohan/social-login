import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = () => {
	const storeData = async (key: string, value: string): Promise<void> => {
		try {
			await AsyncStorage.setItem(key, value);
			console.log("Successfully stored item!");
		} catch (e) {
			// saving error
			console.log("Could not save data, try again.");
		}
	};

	const getData = async (key: string) => {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				// value previously stored
				console.log("Successfully fetched item!");
				return value;
			}
		} catch (e) {
			// error reading value
			console.log("Could not fetch data, try again.");
		}
	};

	const removeData = async (key: string) => {
		try {
			await AsyncStorage.removeItem(key);
			console.log("Removed: " + key);
		} catch (e) {
			console.log("Could not remove key: " + key);
		}
	};

	return { storeData, getData, removeData };
};

export default useAsyncStorage;
