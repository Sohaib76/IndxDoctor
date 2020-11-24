import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, colors, Header, Icon } from 'react-native-elements';
import { Portal, Searchbar, Provider } from 'react-native-paper';

export default function AddAppointment({ navigation }) {
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

                centerComponent={{ text: 'Add Appointment', style: { color: 'darkblue', fontSize: 35, fontWeight: "bold" } }}
            />
            <Button
                containerStyle={{ marginBottom: 300 }}
                title="Tap to Change Patient"
                onPress={() => navigation.navigate("PatientList")}
            />


            <Button
                containerStyle={{
                    marginBottom: 20

                }}
                title="Finish Appointment"
                onPress={() => navigation.navigate("HomeScreen")}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
