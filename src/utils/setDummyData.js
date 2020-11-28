import AsyncStorage from '@react-native-async-storage/async-storage'

export const setdummydata = async () => {
    await AsyncStorage.setItem("globalUsers", JSON.stringify(
        {
            "admin": {
                password: "pass",
                profession: "dentist",
                patients: []
            },
            "ben": {
                password: "benpass",
                profession: "receptionist",
                patients: []
            },
            "sohaib": {
                password: "123",
                profession: "BME",
                patients: []
            }
        }
    ))
}

