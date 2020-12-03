import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';

export default function Tenth__Back({ navigation }) {
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 18, color: 'teal',
                    lineHeight: 30, letterSpacing: 0.9, width: "80%",
                    textAlign: 'center'
                }}
            >Congratulations! Patient information successfully completed!</Text>

            {/* <Text>After reviewing the patient information you can now send
            it to the dentist!
            </Text> */}
            {/* <Pressable
                style={{
                    padding: 20, marginTop: 40, backgroundColor: 'blue'


                }}
                onPress={() => {
                    navigation.navigate("HomeScreen")
                }
                }>
                <Text style={{ fontSize: 20 }}>
                    Send To Dentist
                </Text></Pressable> */}

            <Button
                onPress={() => {
                    navigation.navigate("HomeScreen")
                }}

                // style={{
                //     padding: 20, marginTop: 40


                // }}
                containerStyle={{
                    width: "80%",
                    marginTop: 80
                    // height: 500
                }}
                title="Send To Dentist"

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
