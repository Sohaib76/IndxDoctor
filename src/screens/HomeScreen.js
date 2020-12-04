import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { getUserData } from "../utils/GetAsyncData"


import Colors from '../config/colors';
import DashboardQueue from '../components/DashboardQueue';


export default function HomeScreen({ route, navigation }) {
    //------------------

    //For Fetch
    //For Today
    const [currentAppointments, setcurrentAppointments] = useState("5")
    const [pendingAppointments, setpendingAppointments] = useState("3")
    const [cancelledAppointments, setcancelledAppointments] = useState("1")

    //list of objects containing first,lastname,pic,isqueued,iscancelled
    //sort with date then time  



    //For Upload

    //------------------


    // const [name, setname] = useState()
    var userObject = ""
    if (route.params != undefined) {
        userObject = route.params.userObject;
    }
    const [username, setusername] = useState("")
    const [allUsersData, setAllusersData] = useState(null)

    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const [noOfAppointmentsToday, setnoOfAppointmentsToday] = useState(0)
    const [totalNoOfPatients, settotalNoOfPatients] = useState(0)
    const [appointmentTimings, setappointmentTimings] = useState({})

    // returns all appointments on a date/day
    const showAppointmentsOnDate = (date, patientlist) => {
        // appointments with patient detials
        let todayAppointments = [];
        // appntmnts list only (not patient details)
        let todayAppointmentsList = []
        // appnmtnts categorized with time
        let todayAppointmentsWithTime = {}

        patientlist.forEach(patient => {
            let hasApnmnt = patient.appointments.find(apnmnt => {
                return new Date(apnmnt.fulldate).toDateString() == date.toDateString()
            })
            // return patient basic details if has appointment
            if (hasApnmnt) {
                // all appntmnts
                todayAppointmentsList.push(hasApnmnt)
                // add appnmnt to time category
                if (todayAppointmentsWithTime[hasApnmnt["time"]]) {
                    todayAppointmentsWithTime[hasApnmnt["time"]] = [...todayAppointmentsWithTime[hasApnmnt["time"]], { ...hasApnmnt, patientUuid: patient.uuid, patientfullname: patient.fullname }]
                } else {
                    // create first 
                    todayAppointmentsWithTime[hasApnmnt["time"]] = [{ ...hasApnmnt, patientUuid: patient.uuid, patientfullname: patient.fullname }]
                }
                // set patient wise appntmtnts
                todayAppointments.push({
                    fullname: patient.fullname,
                    uuid: patient.uuid,
                    appoointmentdetials: hasApnmnt
                })
            }
        })
        setappointmentTimings(todayAppointmentsWithTime)
        setnoOfAppointmentsToday(todayAppointmentsList.length)
        settotalNoOfPatients(patientlist.length)
    }

    const [today, settoday] = useState(new Date("27 December 2020"))

    useEffect(() => {
        getUserData([setAllusersData, setusername], ["globalUsers", "username"])
        if (username && allUsersData) {
            console.log("runing");
            showAppointmentsOnDate(today, allUsersData[username].patients)
        }
    }, [])


    const handleNavigation = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <Provider>
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

                centerComponent={{ text: 'Dashboard', style: { color: 'darkblue', fontSize: 40, fontWeight: "bold" } }}

            />
            {/* <Text style={{ fontSize: 20, margin: 10 }}>Logged IN: {username}</Text> */}
            <ScrollView>
                <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>APPOINTMENTS</Text>

                <Surface style={{ padding: 20, margin: 20 }}>
                    <View style={{
                        flexDirection: "row", alignItems: 'center'
                        , justifyContent: 'space-between'
                    }}>
                        <Text style={{ fontSize: 25 }}>Today</Text>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button color="darkblue" onPress={openMenu}>+ Add appointment</Button>}>
                            <Menu.Item onPress={() => { }} title="Add New Patient" />
                            <Divider />
                            <Menu.Item onPress={() => { }} title="Add Existing Patient" />

                        </Menu>
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 20, marginTop: 10
                            , color: Colors.lightGray
                        }}>{today.toDateString()}</Text>
                    </View>
                    <View style={{ marginLeft: 8, paddingBottom: 10, paddingTop: 18, flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View style={{ flex: 2 }}>
                            <View style={{
                                width: 70,
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "rgba(176,224,230,0.4)", borderRadius: 400

                            }}>
                                <Text style={{ fontSize: 50, color: "darkblue" }}>{noOfAppointmentsToday}</Text>
                            </View>
                            <Text style={{


                                marginLeft: -20, marginTop: 8, fontSize: 12, textAlign: 'center'
                            }}>Current {"\n"}Appointments</Text>
                        </View>



                        <View style={{ flex: 2 }}>
                            <View style={{
                                width: 70,
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "rgba(176,224,230,0.4)"
                                , borderRadius: 400

                            }}>
                                <Text style={{ fontSize: 50, color: "green" }}>3</Text>
                            </View>
                            <Text style={{ marginLeft: -20, marginTop: 8, fontSize: 12, textAlign: 'center' }}>Pending {"\n"} Appointments</Text>
                        </View>




                        <View style={{ flex: 2, }}>
                            <View style={{
                                width: 70,
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: "rgba(176,224,230,0.4)", borderRadius: 400

                            }}>
                                <Text style={{ fontSize: 50, color: "red" }}>1</Text>
                            </View>
                            <Text style={{ marginLeft: -20, marginTop: 8, fontSize: 12, textAlign: 'center' }}>Cancelled Appointments</Text>
                        </View>



                    </View>

                </Surface>

                {/* Another PATIENTS 1**************** */}
                <Text style={{ fontSize: 18, color: 'grey', fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>PATIENTS</Text>

                <Surface style={{ padding: 20, margin: 20 }}>
                    <View style={{
                        flexDirection: "row", alignItems: 'center'
                        // , justifyContent: 'flex-start'
                    }}>

                        <View style={{
                            marginRight: 14,
                            width: 64,
                            height: 64,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: "rgba(176,224,230,0.4)", borderRadius: 400

                        }}>
                            <Text style={{ fontSize: 40, color: "blue" }}>{totalNoOfPatients}</Text>
                        </View>


                        <Text style={{ fontSize: 20, }}>Total Patients</Text>


                    </View>

                    <View style={{
                        marginTop: -20,
                        justifyContent: 'flex-end', flexDirection: 'row'
                    }}
                    >
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button color="darkblue" onPress={openMenu}>+ Add Patient</Button>}>
                            <Menu.Item onPress={() => { }} title="Add New Patient" />
                            <Divider />
                            <Menu.Item onPress={() => { }} title="Add Existing Patient" />

                        </Menu>
                    </View>
                    <Divider style={{ margin: 20 }} />

                    <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: 'lightgreen',
                            marginLeft: 10, marginRight: 10,

                            width: 20, height: 20, borderRadius: 20
                        }}>

                        </View>
                        <Text style={{
                            color: 'green'
                            , fontSize: 20
                        }}>1 Recent Patient Added</Text>
                    </View>


                </Surface>

                {/* Another 3 */}
                <DashboardQueue patientDetails={appointmentTimings} today={today} />

                <View style={styles.container}>
                    <Text>Home</Text>
                    <Text>Hi {username}</Text>
                    <Pressable onPress={() => navigation.navigate("AddPatient")}>
                        <Text>Add Patient</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }
})
