import React, { useState } from 'react'
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
const uuid = require('react-native-uuid');

export default function One({ ScreenCounter, navigation, handleAddPatientData }) {

    const [pressedState, setpressedState] = useState(false)

    const pressed = () => {
        // for now keep this
        setpressedState(true)
        handleAddPatientData({ uuid: uuid.v4() })
        console.log("AIF");
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
