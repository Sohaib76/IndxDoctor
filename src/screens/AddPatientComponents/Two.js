import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function Two({ ScreenCounter, handleAddPatientData }) {
    const [input, setInput] = useState("");

    const pressed = () => {
        // alert(input)
        ScreenCounter(3)
        handleAddPatientData({ firstname: input })
    }
    return (
        <View style={styles.container}>
            <Text>First Name</Text>
            <TextInput
                onChangeText={(val) => setInput(val)}
                value={input}

                placeholder="Type your username"
            />
            <Pressable onPress={pressed}><Text>Proceed</Text></Pressable>
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
