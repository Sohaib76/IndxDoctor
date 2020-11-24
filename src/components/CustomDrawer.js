import React from 'react'
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated';
import Colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';
import NavigationComponent from './NavigationComponent';

export default function CustomDrawerContent({ navigation }) {
    return (
        <View style={{ backgroundColor: Colors.background }}>
            <View style={{
                paddingTop: 90, paddingLeft: 20,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
                marginBottom: 20
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
                            , marginBottom: 10,
                            fontWeight: "bold"
                        }}>Edit Profile ></Text></Pressable>
                    </View>
                </View>
            </View>
            <ScrollView
                // contentContainerStyle={ }
                style={{
                    height: '100%'

                }}>
                <NavigationComponent name={"Dashboard"} navigation={navigation} where={"HomeStack"} />
                <NavigationComponent name={"Process Payment"} navigation={navigation} />
                <NavigationComponent name={"Set Appoinment"} navigation={navigation} where={"AddAppointmentMain"} />
                <NavigationComponent name={"Add Patient"} navigation={navigation} where={"AddPatientMain"} />
                <NavigationComponent name={"Calendar"} navigation={navigation} />
                <NavigationComponent name={"Logout"} navigation={navigation} where={"Logout"} />
                {/* <NavigationComponent />
                <NavigationComponent />
                <NavigationComponent />
                <NavigationComponent />
                <NavigationComponent /> */}
                <View style={{ backgroundColor: Colors.background, height: 20 }}></View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },

})
