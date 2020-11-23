import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';


import Colors from '../config/colors';

export default function PatientDetailScreen({ navigation }) {
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

                centerComponent={{ text: 'Patient Details', style: { color: 'darkblue', fontSize: 40, fontWeight: "bold" } }}

            />
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
