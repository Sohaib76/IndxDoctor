import AsyncStorage from '@react-native-async-storage/async-storage'

// delete this file when deploying
export const dummydataValue = {
    "admin": {
        password: "pass",
        profession: "dentist",
        patients: [],
        imageuri: "",
        firstname: "admin",
        lastname: "Last"
    },
    "ben": {
        password: "benpass",
        profession: "receptionist",
        patients: [],
        imageuri: "",
        firstname: "ben",
        lastname: "eater"
    },
    "sohaib": {
        password: "123",
        profession: "BME",
        patients: [],
        imageuri: "",
        firstname: "sohaib",
        lastname: "zafar"
    }
}

export const setdummydata = async () => {
    await AsyncStorage.setItem("globalUsers", JSON.stringify(
        dummydataValue
    ))
}


