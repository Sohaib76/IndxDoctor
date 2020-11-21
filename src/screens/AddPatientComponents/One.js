import React from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

export default function One({ ScreenCounter, navigation }) {

    const pressed = () => {
        ScreenCounter(2)

    }
    return (
        <View style={styles.container}>
            <Text>Do you have </Text>
            <Pressable onPress={() => navigation.navigate("PatientList")}><Text>Yes</Text></Pressable>
            <Pressable onPress={pressed}><Text>No</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        height: "100%"
    }
})
