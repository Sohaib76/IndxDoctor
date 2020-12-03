import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';


export default function Last({ navigation }) {

    useEffect(() => {

    }, [])//navigation

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 18, color: 'teal',
                    lineHeight: 30, letterSpacing: 0.9, width: "80%",
                    textAlign: 'center'
                }}
            >Congratulations! Your profile is now completed! You can
            now use your account</Text>
            {/* <Pressable
                style={{ padding: 10 }}
                onPress={() => navigation.navigate("Login", { newUserAdded: true })}><Text
                    style={{ fontSize: 20 }}
                >Click here to go Back To Login Page</Text></Pressable> */}


            <Button
                onPress={() => navigation.navigate("Login", { newUserAdded: true })}

                // style={{
                //     padding: 20, marginTop: 40


                // }}
                containerStyle={{
                    width: "80%",
                    marginTop: 80
                    // height: 500
                }}
                title="Back To Login Page"

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