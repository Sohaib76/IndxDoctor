import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserData = async (stateHandler,getItemList) => {
    try {
        const asynData = await AsyncStorage.multiGet(getItemList);
        let allUsersData = JSON.parse(asynData[0][1]);
        // console.log("allUsersData",allUsersData,asynData[1][1]);
        stateHandler[0](allUsersData)
        stateHandler[1](asynData[1][1])
    } catch (e) {
        console.log(e);
    }
}
