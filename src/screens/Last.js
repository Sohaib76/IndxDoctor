import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function Last({ navigation }) {

    // useEffect(() => {
    //     var globalList;
    //     const addUser = async () => {
    //         const jsonValuex = await AsyncStorage.getItem("tempPersonDict")
    //         var personDict = JSON.parse(jsonValuex)

    //         const jsonValue = await AsyncStorage.getItem("globalUsers")
    //         if (jsonValue != null) { globalList = JSON.parse(jsonValue) }
    //         else { globalList = [] }


    //         // let obj = objArray.find(obj => obj.id == 3);
    //         // let indx = globalList.indexOf(personDict);
    //         // if (indx != -1) {
    //         globalList.push(personDict)
    //         //     alert("OOO")
    //         // }
    //         // else if (personDict in globalList) {
    //         //     alert("111")
    //         // }

    //         console.log(JSON.stringify(globalList), globalList.length);

    //         await AsyncStorage.setItem("globalUsers", JSON.stringify(globalList))
    //         alert(JSON.stringify(globalList))
    //     }
    //     addUser()

    // }, [])//navigation

    return (
        <View style={styles.container}>
            <Text>Profile Completed</Text>
            <Pressable onPress={() => navigation.navigate("Login")}><Text>Click here to go Back To Login Page</Text></Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }
})