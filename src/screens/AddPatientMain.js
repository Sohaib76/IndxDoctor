import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Menu, Divider, Provider } from 'react-native-paper';

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
            <Button
                containerStyle={{ marginBottom: 20 }}
                title="Add Existing Patient"
                onPress={() => navigation.navigate("PatientList")}
            />
            <Button
                title="Create New Patient"
                onPress={() => navigation.navigate("AddPatient")}
            />

        </View>
    )
}

const styles = StyleSheet.create({})
