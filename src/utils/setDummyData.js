import AsyncStorage from '@react-native-async-storage/async-storage'

export const setdummydata = async () => {
    await AsyncStorage.setItem("globalUsers", JSON.stringify(
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
    ))
}

