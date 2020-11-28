import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon, Button, } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Menu, Divider, Provider } from 'react-native-paper';


import Colors from '../config/colors';

export default function PatientDetailScreen({ navigation }) {

    const [firstname, setfirstname] = useState("Alexander")
    const [middlename, setmiddlename] = useState("Gomex")
    const [lastname, setlastname] = useState("Dela Costa")
    const [age, setage] = useState("39")
    const [gender, setgender] = useState("Male")
    const [birthday, setbirthday] = useState("Aug 21,1980")
    const [dateAdded, setdateAdded] = useState("February 21,2018")
    const [dateDifference, setdateDifference] = useState("6 Months")
    const [address, setaddress] = useState("12A Kamuning Quezon City")
    const [email, setemail] = useState("lexicota@gmail.com")
    const [phone, setphone] = useState('+639139902719')
    const [uuid, setuuid] = useState("289|2018")

    // Get all data from backend , no usage data for backend



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

                centerComponent={{ text: 'View Patient', style: { color: 'darkblue', fontSize: 40, fontWeight: "bold" } }}

            />
            <Button
                title="Appointments"
                onPress={() => navigation.navigate("AddAppointment")}
            />
            {/* <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text> */}

            <Surface style={{ padding: 20, margin: 15 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Basic Information</Text>
                <Text style={{ color: 'grey', fontSize: 12 }}>ACCOUNT NUMBER {uuid}</Text>
                <View style={{ flexDirection: 'row', paddingTop: 24 }}>
                    <View style={{ flex: 2 }}>

                        <Text style={styles.textTitle}>FIRST NAME</Text>
                        <Text style={styles.textDetail}>{firstname}</Text>

                        <Text style={styles.textTitle}>MIDDLE NAME</Text>
                        <Text style={styles.textDetail}>{middlename}</Text>

                        <Text style={styles.textTitle}>LAST NAME</Text>
                        <Text style={styles.textDetail}>{lastname}</Text>

                        <Text style={styles.textTitle}>DATE ADDED</Text>
                        <Text style={styles.textDetail}>{dateAdded}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.textTitle}>AGE</Text>
                        <Text style={styles.textDetail}>{age} Years Old</Text>

                        <Text style={styles.textTitle}>SEX</Text>
                        <Text style={styles.textDetail}>{gender}</Text>

                        <Text style={styles.textTitle}>BIRTHDAY</Text>
                        <Text style={styles.textDetail}>{birthday}</Text>

                        <Text style={{ marginTop: 20, color: 'grey', fontSize: 16, fontWeight: 'bold' }}>--- {dateDifference}</Text>
                    </View>
                </View>
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({
    textTitle: { color: 'grey' }
    , textDetail: { fontWeight: '500', fontSize: 18, marginBottom: 20, marginTop: 3 }
})
