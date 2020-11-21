import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserData = async (stateHandler, getItemList) => {
    try {
        const asyncData = await AsyncStorage.multiGet(getItemList);
        let allUsersData = JSON.parse(asyncData[0][1]);
        // console.log("allUsersData",allUsersData,asynData[1][1]);
        stateHandler[0](allUsersData)
        stateHandler[1](JSON.parse(asyncData[1][1]))
        // console.log();
    } catch (e) {
        console.log(e);
    }
}
