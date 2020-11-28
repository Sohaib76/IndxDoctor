import React, { useState, useEffect } from 'react'
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import { getUserData } from "../utils/GetAsyncData"
import { Button, colors, Header, Icon } from 'react-native-elements';
import { Portal, Searchbar, Provider } from 'react-native-paper';

import { updateGlobalUsersAsync } from "../utils/updateGlobalUsers"

export default function ({ navigation, route }) {
    //-------------------

    // only avaiable if new appointment added
    // To Fetch
    const [totalPatients, settotalPatients] = useState("120")

    // Fetched
    const [patientsNameList, setpatientsNameList] = useState([])  //use this [{}] uuid key, patient name


    // User Data : This is to be decide
    //list of objects containing >> Patient Image, firstname, lastname, uuid
    //now igno sections
    //-------------------

    //For Search BAr
    const [searchQuery, setSearchQuery] = useState('');

    const [username, setusername] = useState(null)
    const [usersData, setallusersData] = useState({})

    const onChangeSearch = query => setSearchQuery(query);

    const DATA = [
        {
            title: "A",
            data: ["Ali", "Amir", "Aka"]
        },
        {
            title: "B",
            data: ["Bobby", "Baby", "Bonds"]
        },
        {
            title: "C",
            data: ["Caster", "Caler", "Carter"]
        },
    ];

    const [allPatientsData, setAllpatientsData] = useState([])

    // data looks like this now
    // allpatientdata = [   // appointment[{id:,done,date,time}]
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },
    //     {
    //         address: 'add', firstname, "f1",
    //         lastname: "123", phone: "123", uuid: "12kas-asdjk", appointments: []
    //     },
    // ]

    // ------------------------------------------------- //
    // ------------------------------------------------- //
    // ------------------------------------------------- //
    // ------------------------------------------------- //

    // for opening patient detials (page 40)
    const showPatientDetails = (uuid) => {
        // accepts patient uuid and returns complted info
        return allPatientsData.find(patient => {
            return patient.uuid == uuid
        })
    }

    // returns all appointments on a date/day
    const showAppointmentsOnDate = (date) => {
        allPatientsData.forEach(patient => {
            let hasApnmnt = patient.appointments.find(apnmnt => {
                apnmnt.date == date
            })
            // return patient basic details if has appointment
            if (hasApnmnt) {
                return {
                    fullname: patient.fullname,
                    uuid: patient.uuid
                }
            }
        })
    }

    // runs only for adding new appointment
    useEffect(() => {
        // add new appointment details to patient data
        const addNewAppointment = (uuid, newAppointmentDetails) => {
            let updatedPatientData = allPatientsData.map(patient => {
                if (patient.uuid == uuid && patient.appointments) {
                    return {
                        ...patient, appointments: [
                            ...patient.appointments, newAppointmentDetails
                        ]
                    }
                }
                return patient
            })
            // update asyncstorage
            console.log("updatedPatientData ", updatedPatientData);
            // add updated patient data to user
            let updatedUserDate = { ...usersData[username], patients: updatedPatientData }
            // add updated user to all data
            let updatedAllUsersData = { ...usersData, [username]: updatedUserDate }

            // util: update entire global users
            updateGlobalUsersAsync(updatedAllUsersData)
        }

        // only runs if routed from add appointments
        if (route.params) {
            addNewAppointment(route.params.patientUuid, route.params.newAppointmentDetails)
        }
    }, [route.params])
    // ------------------------------------------------- //
    // ------------------------------------------------- //
    // ------------------------------------------------- //
    // ------------------------------------------------- //

    useEffect(() => {
        getUserData([setallusersData, setusername], ["globalUsers", "username"])
    }, [])
    useEffect(() => {
        if (username && usersData) {
            let patientsDataList = usersData[username].patients
            patientsDataList = patientsDataList.map(patient => {
                return {
                    ...patient, fullname: `${patient.firstname} ${patient.middlename} ${patient.lastname}`
                }
            })
            // all data (not for list)
            setAllpatientsData(patientsDataList)
            // console.log(patientsDataList);
            let sortedPatientList = patientsDataList.map(patient => {
                return {
                    fullname: patient.fullname,
                    uuid: patient.uuid
                }
            })
            sortedPatientList.sort(function (a, b) { return a["fullname"].localeCompare(b["fullname"]); });
            // segmented list
            // list to be displayed (use this)
            setpatientsNameList(sortedPatientList)
        }
    }, [usersData, username])

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

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

                centerComponent={{ text: 'Patients', style: { color: 'darkblue', fontSize: 35, fontWeight: "bold" } }}

            />
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Button
                containerStyle={{ marginBottom: 20 }}
                title="+ Add New Patient"
                onPress={() => navigation.navigate("AddPatient")}

            />

            <View style={styles.container}>

                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) =>
                        <View >
                            <Item

                                title={item} />
                            <Text
                                onPress={() => navigation.navigate("AddAppointment", {
                                    // passing patient uuid for appointment data recieving
                                    patientUuid: "dummy-uuid"
                                })}
                                style={{ position: 'absolute', top: 35, right: 100 }}>Set appointment</Text>
                            <Text
                                onPress={() => navigation.navigate("PatientDetail")}
                                style={{ position: 'absolute', top: 35, right: 20 }}>Patient Info</Text>
                        </View>


                    }
                    renderSectionHeader={({ section: { title } }) => (

                        <Text style={styles.header}>
                            {title}
                        </Text>


                    )}
                />


                <Pressable
                    style={{ margin: 20, height: 20 }}
                    onPress={() => navigation.navigate("HomeScreen")}><Text>Back To Home</Text>
                </Pressable>
            </View >
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {

        marginTop: 30,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});



// const date1 = new Date('7/13/2010');
// const date2 = new Date('12/15/2010');
// const diffTime = Math.abs(date2 - date1);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 