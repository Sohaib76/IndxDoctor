import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

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
            <Text>Do you have an existing</Text>
            <Button
                disabled={true}
                title="Yes"
            />
            <Button

                title="No"
                onPress={pressed}
            />

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
