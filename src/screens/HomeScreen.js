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
                let keys = await AsyncStorage.getAllKeys()
                let alldata = await AsyncStorage.multiGet(keys)
                console.log(alldata);
                setusername(username)
            } catch (e) {
                console.log(e);
            }
        }
        getusername()
    }, [route])


    const navigateFirstScreen = () => {
        navigation.navigate("FirstScreen")
    }

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>Hi {username}</Text>
            <Button
                onPress={navigateFirstScreen}
                title="Open First Screen"
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
