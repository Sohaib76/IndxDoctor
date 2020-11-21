import React from 'react'
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';
import Colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';

export default function CustomDrawerContent({ navigation }) {
    return (
        <View style={{ backgroundColor: Colors.background }}>
            <View style={{
                paddingTop: 50, paddingLeft: 20, marginBottom: 10,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
            }}>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={styles.title}>Good Day, </Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold', color: Colors.darkGreen
                    }}>Alexander!</Text>
                </View>
                <View style={{ flexDirection: "row" }}>

                    <View style={{ paddingTop: 15 }}>

                        <Image
                            style={{ width: 60, height: 60, borderRadius: 40 }}
                            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} />
                    </View>

                    <View style={{
                        justifyContent: "space-between"
                        , padding: 15
                    }}>
                        <Text style={{
                            fontSize: 18
                            , marginBottom: 8
                        }}>Alexander Dela Costa</Text>
                        <Text style={{
                            color: Colors.lightGray,
                            fontSize: 18, marginBottom: 8
                        }}>Lexander@gmail.com</Text>
                        <Pressable ><Text style={{
                            fontSize: 18
                            , color: Colors.darkGreen
                        }}>Edit Profile ></Text></Pressable>
                    </View>
                </View>
            </View>
            <ScrollView>
                <TouchableOpacity
                    onPress={() => alert("Dashboard")}
                    style={{
                        backgroundColor: 'white',
                        flexDirection: "row", alignItems: 'center', paddingLeft: 15
                        , shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        elevation: 2,

                    }}>
                    <View style={{
                        margin: 10,
                        padding: 6,
                        borderWidth: 3, borderColor: Colors.darkGreen, borderRadius: 40
                    }}>
                        <AntDesign
                            borderRadius={20}


                            name="creditcard" size={24} color={Colors.darkGreen} />
                    </View>

                    <Text style={{
                        padding: 10,
                        fontSize: 20,
                        color: Colors.darkGreen
                    }}>Dashboard</Text>

                    <View style={{

                        width: '100%', height: '100%'
                    }}>
                        <View style={{
                            marginLeft: 82,
                            width: 8, height: '100%', backgroundColor: Colors.lightGreen
                        }}>


                        </View>

                    </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: Colors.background, height: 20 }}></View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    name: {

    },
    email: {

    },
    edit_btn: {

    },

})
