import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Menu, Divider, Provider } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../config/colors';

export default function AddPatientMain({ navigation }) {
    return (
        <View>
            <Header
                containerStyle={{ backgroundColor: 'white', padding: 20, height: 150 }}
                placement="left"
                leftComponent={
                    <>
                        <Icon style={{ color: '#000', padding: 10 }} name="menu" size={35} onPress={
                            () => navigation.openDrawer()
                        } />
                    </>

                }

                centerComponent={{ text: 'Add Patient', style: { color: 'darkblue', fontSize: 35, fontWeight: "bold" } }}

            />
            {/* <Button
                containerStyle={{ marginBottom: 20 }}
                title="Add Existing Patient"
                onPress={() => navigation.navigate("PatientList")}
            />

            <Button
                title="Create New Patient"
                onPress={() => navigation.navigate("AddPatient")}
            /> */}

            <ScrollView style={{ height: "100%" }} contentContainerStyle={{ alignItems: 'center' }}>

                <TouchableOpacity
                    onPress={() => navigation.navigate("PatientList")}

                    style={
                        styles.circle
                    }
                >
                    <AntDesign name="adduser" size={60} color={Colors.lightGreen} />


                </TouchableOpacity>
                <Text style={{ color: 'grey', fontSize: 20, marginTop: -35, marginBottom: 20 }}>Add Existing Patient</Text>


                <View
                    style={{ alignItems: 'center', marginBottom: 250 }}
                >

                    <TouchableOpacity
                        onPress={() => navigation.navigate("AddPatient")}

                        style={
                            styles.circle
                        }
                    >
                        <AntDesign name="addusergroup" size={60} color={Colors.lightGreen} />


                    </TouchableOpacity>
                    <Text style={{ color: 'grey', fontSize: 20, marginTop: -35 }}>Add New Patient</Text>



                </View>
            </ScrollView >


        </View >
    )
}

const styles = StyleSheet.create({
    circle: {
        borderColor: Colors.lightGreen,
        borderWidth: 6,
        alignItems: 'center',
        margin: 60,
        padding: 20,
        width: 120,
        height: 120,
        borderRadius: 150 / 2,
    }
})
