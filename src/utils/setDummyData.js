import AsyncStorage from '@react-native-async-storage/async-storage'

export const setdummydata = async () => {
    await AsyncStorage.setItem("globalUsers", JSON.stringify(
        {
            "admin": {
                password: "pass",
                profession: "dentist",
                patients: [],
                imageuri: "",
                firtname: "admin",
                lastname: "Last"
            },
            "ben": {
                password: "benpass",
                profession: "receptionist",
                patients: [],
                imageuri: "",
                firtname: "ben",
                lastname: "eater"
            },
            "sohaib": {
                password: "123",
                profession: "BME",
                patients: [],
                imageuri: "",
                firtname: "sohaib",
                lastname: "zafar"
            }
        }
    ))
}

