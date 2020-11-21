import AsyncStorage from '@react-native-async-storage/async-storage'

export const setdummydata = async () => {
    try {
        await AsyncStorage.multiSet([["isLoggedIn", "1"], ["username", "ben"], [
            "globalUsers", JSON.stringify(
                {
                    "admin": {
                        password: "pass",
                        role: "dentist",
                        patients: []
                    },
                    "ben": {
                        password: "benpass",
                        role: "receptionist",
                        patients: []
                    },
                    "sohaib": {
                        password: "123",
                        role: "BME",
                        patients: []
                    }
                }
            )
        ]], (e, r) => {
            console.log("data set ", e, r);
        });
    } catch (e) {
        console.log(e);
    }
}
