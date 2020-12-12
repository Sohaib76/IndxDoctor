import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { getUserData } from "../utils/GetAsyncData"
import { updateGlobalUsersAsync } from "../utils/updateGlobalUsers"
import { useIsFocused } from '@react-navigation/native'



import Colors from '../config/colors';
import DashboardQueue from '../components/DashboardQueue';

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default function HomeScreen({ route, navigation }) {
    //------------------

    //For Fetch
    //For Today
    const [currentAppointments, setcurrentAppointments] = useState("5")
    const [pendingAppointments, setpendingAppointments] = useState("0")
    const [cancelledAppointments, setcancelledAppointments] = useState("0")

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


        var totalPendingAppointments = 0
        var totalCancelledAppointments = 0
        patientlist.forEach(patient => {
            let hasApnmnt = patient.appointments.find(apnmnt => {
                return new Date(apnmnt.fulldate).toDateString() == date.toDateString()
            })
            // return patient basic details if has appointment

            console.log(patient.appointments);

            let noOfCancelled = patient.appointments.filter(a => {
                return a.cancelled == true

            })
            console.log(noOfCancelled.length);

            totalPendingAppointments += patient.appointments.length
            totalCancelledAppointments += noOfCancelled.length
            // setcancelledAppointments(noOfCancelled.length)
            // setpendingAppointments(patient.appointments.length - noOfCancelled.length)

            if (hasApnmnt) {
                // all appntmnts
                todayAppointmentsList.push(hasApnmnt)
                // add appnmnt to time category
                if (todayAppointmentsWithTime[hasApnmnt["time"]]) {
                    todayAppointmentsWithTime[hasApnmnt["time"]] = [...todayAppointmentsWithTime[hasApnmnt["time"]], { ...hasApnmnt, patientUuid: patient.uuid, patientfullname: patient.fullname, image: patient.patientImage }]
                } else {
                    // create first 
                    todayAppointmentsWithTime[hasApnmnt["time"]] = [{ ...hasApnmnt, patientUuid: patient.uuid, patientfullname: patient.fullname, image: patient.patientImage }]
                }
                // set patient wise appntmtnts
                todayAppointments.push({
                    fullname: patient.fullname,
                    uuid: patient.uuid,
                    appoointmentdetials: hasApnmnt,
                    image: patient.patientImage
                })
            }
        })
        setappointmentTimings(todayAppointmentsWithTime)
        setnoOfAppointmentsToday(todayAppointmentsList.length - totalCancelledAppointments)
        settotalNoOfPatients(patientlist.length)


        var noOfAppointmentNow = todayAppointmentsList.length - totalCancelledAppointments
        setpendingAppointments(totalPendingAppointments - totalCancelledAppointments - noOfAppointmentNow)
        setcancelledAppointments(totalCancelledAppointments)
    }

    const [today, settoday] = useState(new Date())

    const isFocused = useIsFocused()

    // const restart = async () => {
    //     await getUserData([setAllusersData, setusername], ["globalUsers", "username"])
    //     // if (username && allUsersData) {
    //     //     alert("oo")
    //     //     showAppointmentsOnDate(today, allUsersData[username].patients)
    //     // }
    // }

    //create your forceUpdate hook


    const forceUpdate = useForceUpdate();

    const [message, setMessage] = useState(0);


    useEffect(() => {
        // restart()
        getUserData([setAllusersData, setusername], ["globalUsers", "username"])

        const unsubscribe = navigation.addListener('focus', () => {
            const massage = message + 1;
            setMessage(massage);
        });

        return unsubscribe;
        // alert(allUsersData)
        // alert("ppp")
        // getUserData([setAllusersData, setusername], ["globalUsers", "username"])

    }, [message])

    useEffect(() => {
        if (username && allUsersData) {
            // alert("oo")
            showAppointmentsOnDate(today, allUsersData[username].patients)
        }
    }, [allUsersData])
    // useEffect(() => {
    //     alert(allUsersData)
    //     if (username && allUsersData) {
    //         alert("oo")
    //         showAppointmentsOnDate(today, allUsersData[username].patients)
    //     }
    // }, [allUsersData])

    // cancell appointment
    const handleCancel = (appnmntuuid, pntuuid) => {
        const userPatientsData = allUsersData[username].patients
        let updatedPatientData = userPatientsData.map(ptnt => {
            if (ptnt.uuid == pntuuid) {
                let allapnmtns = ptnt.appointments.map(appntmnt => {
                    if (appntmnt.uuid == appnmntuuid) {
                        return { ...appntmnt, cancelled: true }
                    }
                    return appntmnt
                })
                return { ...ptnt, appointments: allapnmtns }
            } else {
                return ptnt
            }
        })
        const updatedAllUsersData = {
            ...allUsersData, [username]: {
                ...allUsersData[username], patients: updatedPatientData
            }
        }
        setAllusersData(updatedAllUsersData)
        showAppointmentsOnDate(today, updatedAllUsersData[username].patients)
        updateGlobalUsersAsync(updatedAllUsersData)
    }

    // queu appointment
    const handleQueue = (appnmntuuid, pntuuid) => {
        const userPatientsData = allUsersData[username].patients
        let updatedPatientData = userPatientsData.map(ptnt => {
            if (ptnt.uuid == pntuuid) {
                let allapnmtns = ptnt.appointments.map(appntmnt => {
                    if (appntmnt.uuid == appnmntuuid) {
                        return { ...appntmnt, queued: false }
                    }
                    return appntmnt
                })
                return { ...ptnt, appointments: allapnmtns }
            } else {
                return ptnt
            }
        })
        const updatedAllUsersData = {
            ...allUsersData, [username]: {
                ...allUsersData[username], patients: updatedPatientData
            }
        }
        setAllusersData(updatedAllUsersData)
        showAppointmentsOnDate(today, updatedAllUsersData[username].patients)
        updateGlobalUsersAsync(updatedAllUsersData)
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
                            anchor={<Button color="darkblue" onPress={
                                () => navigation.navigate("PatientList")
                            }
                            >+ Add appointment</Button>}>
                            {/* 
                                onPress={openMenu}*/}
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
                                <Text style={{ fontSize: 50, color: "green" }}>{pendingAppointments}</Text>
                                {/* Uncomment  ??? */}
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
                                <Text style={{ fontSize: 50, color: "red" }}>{cancelledAppointments}</Text>
                                {/* Uncomment  ??? */}
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
                            anchor={<Button onPress={() => navigation.navigate("AddPatient")} color="darkblue" >+ Add Patient</Button>}>
                            {/* onPress={openMenu} */}
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
                        }}>{totalNoOfPatients} Recent Patient Added</Text>
                        {/* Uncomment ??? */}
                    </View>


                </Surface>

                {/* Another 3 */}
                <DashboardQueue patientDetails={appointmentTimings} today={today} handleCancel={handleCancel} handleQueue={handleQueue} />

                {/* <View style={styles.container}>
                    <Text>Home</Text>
                    <Text>Hi {username}</Text>
                    <Pressable onPress={() => navigation.navigate("AddPatient")}>
                        <Text>Add Patient</Text>
                    </Pressable>

                </View> */}
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
