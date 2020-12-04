import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateGlobalUsersAsync = async (updatedUserData) => {
    console.log("called");
    try {
        await AsyncStorage.setItem("globalUsers", JSON.stringify(updatedUserData));
    }
    catch (e) {
        console.log(e);
    }
}