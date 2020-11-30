import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'

export default function Tenth__Back({ navigation }) {
    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 18 }}
            >Patient Profile Completed</Text>
            <Pressable
                style={{ padding: 10 }}
                onPress={() => alert("Patient added"),
                    navigation.navigate("HomeScreen")}><Text
                        style={{ fontSize: 20 }}
                    >Send To Dentist</Text></Pressable>
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
