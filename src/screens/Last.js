import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function Last({ navigation }) {

    useEffect(() => {

    }, [])//navigation

    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 18 }}
            >Profile Completed</Text>
            <Pressable
                style={{ padding: 10 }}
                onPress={() => navigation.navigate("Login")}><Text
                    style={{ fontSize: 20 }}
                >Click here to go Back To Login Page</Text></Pressable>
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