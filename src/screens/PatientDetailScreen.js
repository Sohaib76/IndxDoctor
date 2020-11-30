import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon, Button, } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Menu, Divider, Provider } from 'react-native-paper';
import { Avatar, Accessory } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../config/colors';

export default function PatientDetailScreen({ navigation, route }) {

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
    const [accountNumber, setaccountNumber] = useState("289|2018")
    const [image, setimage] = useState("https://reactnative.dev/img/tiny_logo.png")

    // Get all data from backend , no usage data for backend

    useEffect(() => {
        // console.log(route.params);
        const { firstname, middlename, createdon, lastname, phone, gender, address, dob, patientImage } = route.params.patientDetails;
        // get difference
        let createdDiff = new Date() - new Date(createdon)
        createdDiff = Math.floor(createdDiff / (1000 * 60 * 60))
        console.log(createdDiff);
        if (createdDiff > 24) {
            createdDiff = Math.floor(createdDiff / 24) + " Days"
        }
        else {
            if (createdDiff > 30) {
                createdDiff = Math.floor(createdDiff / 30) + " Months"
            } else {
                createdDiff = createdDiff + " Hours"
            }
        }

        // get age
        // let agenow = new Date() - new Date(dob)
        // console.log(new Date(dob), dob);
        // Math.floor(agenow / (1000 * 60 * 60 * 24 * 30))
        // setage(agenow)
        setfirstname(firstname)
        setmiddlename(middlename)
        setlastname(lastname)
        setaddress(address)
        setgender(gender)
        setbirthday(dob)
        setphone(phone)
        setimage(patientImage)
        setdateAdded(createdon.slice(0, 10))
        setdateDifference(createdDiff)
    }, [route.params])


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
            {/* <Button
                title="Appointments"
                onPress={() => navigation.navigate("AddAppointment")}
            /> */}
            {/* <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text> */}
            <ScrollView>
                <Surface style={{ flexDirection: 'row', margin: 12, padding: 30, marginBottom: 65 }}>
                    <View>


                        <Avatar
                            rounded
                            size='large'
                            source={{
                                uri:
                                    image,
                            }}
                        />

                    </View>
                    <View style={{ justifyContent: 'flex-start', marginLeft: 15 }}>
                        <Text
                            style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}
                        >{firstname} {lastname}</Text>
                        <Text
                            onPress={() => navigation.navigate("PatientList")}
                            style={{ color: 'teal' }}>Tap to edit patient information</Text>
                    </View>

                    <View style={{

                        width: '100%',
                        borderRadius: 10,
                        padding: 20,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'absolute',
                        bottom: -60,
                        left: 30,
                        right: 30,
                        backgroundColor: 'teal', flexDirection: 'row',
                        paddingRight: 40,
                        paddingLeft: 40
                    }}>
                        <View>
                            <Feather name="phone-call" size={28} color="white" />
                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>CALL</Text>
                        </View>
                        <Pressable
                            onPress={() => navigation.navigate("AddAppointment")}
                            style={{ alignItems: 'center' }}>
                            <Octicons name="calendar" size={30} color="white" />
                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>APPOINTMENT</Text>
                        </Pressable>
                        <View>
                            <MaterialCommunityIcons name="chat-processing" size={30} color="white" />
                            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>CHAT</Text>
                        </View>

                    </View>
                </Surface>



                <Surface style={{ padding: 20, margin: 15 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Basic Information</Text>
                    <Text style={{ color: 'grey', fontSize: 12, marginTop: 8 }}>ACCOUNT NUMBER {accountNumber}</Text>
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

                <Surface style={{ padding: 20, margin: 15 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Contact Information</Text>
                    <Text style={{ color: 'grey', fontSize: 12, marginTop: 8 }}>Let us know who to reach you</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.textTitle}>ADDRESS</Text>
                        <Text style={styles.textDetail}>{address}</Text>

                        <Text style={styles.textTitle}>EMAIL ADDRESS</Text>
                        <Text style={styles.textDetail}>{email}</Text>

                        <Text style={styles.textTitle}>PHONE NUMBER</Text>
                        <Text style={styles.textDetail}>{phone}</Text>


                    </View>
                </Surface>
                <View style={{ marginBottom: 200 }}></View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    textTitle: { color: 'grey', fontWeight: 'bold' }
    , textDetail: { fontWeight: '500', fontSize: 18, marginBottom: 20, marginTop: 3 }
})
