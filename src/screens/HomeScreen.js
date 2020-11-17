import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function HomeScreen({ route, navigation }) {
    // const [name, setname] = useState()
    var userObject = ""
    if (route.params != undefined) {
        userObject = route.params.userObject;
    }

    console.log(route);

    const [username, setusername] = useState("")

    useEffect(() => {
        // const getInfo = async () => {

        //     const jsonValue = await AsyncStorage.getItem("tempPersonDict")
        //     x = JSON.parse(jsonValue)
        //     x.gender = input

        //   }
        // if (userObject) {
        //     alert(userObject)
        // }
        if (route.params != undefined) {

            setusername(userObject.username)
        }

        // getInfo()
    }, [route])

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Text>Hi {username}</Text>

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
