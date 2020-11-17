import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StatusBar, StyleSheet } from 'react-native'

//Delete falto alerts, useEffect

//One way is pass props and at end add to async list
//other is save to async from start
//third adding items to temp async storage and then add to main

//asyncstorage.clear, show all asyncstorage

//Late state and async change in screen (Receive Code)  Done

//Future
//use filesystem if Add Photo problem occurs
//this username already taken feature

export default function AuthLoadingScreen({ navigation }) {


    // const loadData = async () => {
    //     const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    //     alert(isLoggedIn)
    //     navigation.navigate(isLoggedIn ? "App" : "Auth")
    // }
    // useEffect(() => {




    //     loadData()
    // }, [])

    const loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        alert(isLoggedIn)
        navigation.navigate(isLoggedIn ? "App" : "Auth")
    }
    useEffect(() => {




        loadData()
    }, [])
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    }
})