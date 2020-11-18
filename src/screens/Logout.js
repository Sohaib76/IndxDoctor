import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { View, Text, Alert } from 'react-native'

export default function Logout({ navigation }) {
    const _logout = async () => {
        await AsyncStorage.setItem("isLoggedIn", "0")
        navigation.navigate('Auth', { screen: 'Login' });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            Alert.alert(
                "Confirmation",
                "Are you sure you want to Log Out?",
                [
                    {
                        text: "Cancel",
                        onPress: () => navigation.navigate("Home"),
                        style: "cancel"
                    },
                    { text: "Log Out", onPress: _logout }
                ],
                { cancelable: false }
            )
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);




    return (
        <View>


        </View>
    )
}
