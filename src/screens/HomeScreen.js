import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }) {
    // const [name, setname] = useState()
    var userObject = ""
    if (route.params != undefined) {
        userObject = route.params.userObject;
    }
    const [username, setusername] = useState("")

    useEffect(() => {
        const getusername = async () => {
            try {
                const username = await AsyncStorage.getItem("username");
                const item = await AsyncStorage.getItem("globalUsers");
                console.log("Start", item, "End")
                // let keys = await AsyncStorage.getAllKeys()
                // let alldata = await AsyncStorage.multiGet(keys)
                // // console.log(alldata);
                setusername(username)
            } catch (e) {
                console.log(e);
            }
        }
        getusername()
    }, [route])


    const handleNavigation = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>Hi {username}</Text>
            <Button
                onPress={() => {
                    handleNavigation("FirstScreen")
                }}
                title="Open First Screen"
                color="#841584"
            />
            <Text></Text>
            <Button
                onPress={() => {
                    handleNavigation("SecondScreen")
                }}
                title="Open Second Screen"
                color="#841584"
            />
            <Text></Text>

            <Button
                onPress={() => {
                    handleNavigation("ThirdScreen")
                }}
                title="Open Third Screen"
                color="#841584"
            />

            <Text></Text>

            <Button
                onPress={() => {
                    handleNavigation("FourthScreen")
                }}
                title="Open Fourth Screen"
                color="#841584"
            />
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
