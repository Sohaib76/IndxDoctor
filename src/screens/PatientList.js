import React, { useState, useEffect } from 'react'
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native'
import { getUserData } from "../utils/GetAsyncData"
import { Button, colors, Header, Icon } from 'react-native-elements';
import { Portal, Searchbar, Provider, Divider } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements'
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



import { updateGlobalUsersAsync } from "../utils/updateGlobalUsers"
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../config/colors';

// for dev purpose only
const dummyUuid = "c9464676-adfb-4c8c-9be1-197369a7d10e"

export default function ({ navigation, route }) {
    //-------------------

    // only avaiable if new appointment added
    // To Fetch
    const [totalPatients, settotalPatients] = useState("120")

    // Fetched
    const [patientsNameList, setpatientsNameList] = useState([])  //use this [{}] uuid key, patient name

    //What if first time, dummy for test
    //Search, touch view myself
    // Give Image??
    //pop up mashwara (is clicked)
    //Rerenders , Infinite loop Errors
    const [filteredpatientsNameList, setfilteredpatientsNameList] = useState([])


    // const [opaq, setopaq] = useState(false)
    // User Data : This is to be decide
    //list of objects containing >> Patient Image, firstname, lastname, uuid
    //now igno sections
    //-------------------

    //For Search BAr
    const [searchQuery, setSearchQuery] = useState('');

    const [username, setusername] = useState(null)
    const [usersData, setallusersData] = useState({})
    const [allPatientsData, setAllpatientsData] = useState([])
    // for overlay
    const [overlayOn, setoverlayOn] = useState("")

    const onChangeSearch = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = patientsNameList.filter(
                function (item) {
                    // Applying filter for the inserted text in search bar
                    const itemData = item.fullname
                        ? item.fullname.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    console.log(itemData)
                    return itemData.indexOf(textData) > -1;
                }

            );

            setfilteredpatientsNameList(newData);
            setSearchQuery(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setfilteredpatientsNameList(patientsNameList);
            setSearchQuery(text);
        }
    };

    // const onChangeSearch = query => {

    //     setSearchQuery(query)
    //     patientsNameList.filter((x) => {
    //         //console.log(x.fullname);
    //         var arr = []
    //         if (x.fullname.includes(query)) {
    //             console.log([x]);

    //             arr.push(x)

    //         }
    //         // else {
    //         //     arr = []
    //         // }

    //         // else {
    //         //     setfilteredpatientsNameList([])
    //         // }
    //         //Saif (arr.length >= 1) {
    //         setfilteredpatientsNameList(arr)




    //     })
    //     if (query == "") {
    //         setfilteredpatientsNameList(patientsNameList)
    //     }
    //     console.log(query);

    // }

    // ------------------------------------------------------------------------------------------------ //
    // ------------------------------------------------------------------------------------------------ //
    // ------------------------------------------------------------------------------------------------ //
    // ------------------------------------------------------------------------------------------------ //

    // for opening patient detials (page 40)
    const getPatientDetails = (uuid) => {
        // accepts patient uuid and returns complted info
        const a = allPatientsData.find(patient => {
            return patient.uuid == uuid
        })
        return a
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
                    // if (patient.appointments.length > 1) {
                    //     let sortedAppointmentList = [...patient.appointments, newAppointmentDetails];
                    //     sortedAppointmentList.sort(function (a, b) { return a["fulldate"].localeCompare(b["fulldate"]); });
                    //     console.log("sortedAppointmentList", sortedAppointmentList);
                    // }
                    return {
                        ...patient, appointments: [
                            ...patient.appointments, newAppointmentDetails
                        ]
                    }
                }
                return patient
            })
            // console.log("updatedPatientData", updatedPatientData);
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
    // ------------------------------------------------------------------------------------------------------------------- //
    // ------------------------------------------------------------------------------------------------------------------- //
    // ------------------------------------------------------------------------------------------------------------------- //
    // ------------------------------------------------------------------------------------------------------------------- //

    useEffect(() => {
        getUserData([setallusersData, setusername], ["globalUsers", "username"])
    }, [])
    // working
    useEffect(() => {
        if (username && usersData) {
            // console.log(usersData[username].patients, "....");
            try {
                var patientsDataList = usersData[username].patients
                if (patientsDataList.length) {
                    patientsDataList = patientsDataList.map(patient => {
                        return {
                            ...patient, fullname: `${patient.firstname} ${patient.middlename} ${patient.lastname}`
                        }
                    })
                    // all data (not for list)
                    setAllpatientsData(patientsDataList)
                    let sortedPatientList = patientsDataList.map(patient => {
                        return {
                            fullname: patient.fullname,
                            uuid: patient.uuid,
                            imageuri: patient.patientImage
                        }
                    })
                    sortedPatientList.sort(function (a, b) { return a["fullname"].localeCompare(b["fullname"]); });
                    // segmented list
                    setpatientsNameList(sortedPatientList)
                    setfilteredpatientsNameList(sortedPatientList)
                    settotalPatients(sortedPatientList.length)
                }
            }
            catch {
                console.log("No Users");
            }
        }
    }, [usersData, username])

    // const Item = ({ title }) => (
    //     <View style={styles.item}>
    //         <Text style={styles.title}>{title}</Text>
    //     </View>
    // );

    const Overlay = (l) => {
        return (
            <View style={{
                // top: props.id * 75,
                position: "absolute",
                backgroundColor: 'rgba(0,128,128,0.6)', width: '100%',
                //height: `${100 / list.length}%`,
                // opacity: opaq ? 0.5 : 0,
                height: "100%"
                , flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 15
            }}>
                <TouchableOpacity
                    onPress={() => alert("Call")}
                    style={{ alignItems: 'center' }}>
                    <Feather name="phone-call" size={30} color="white" />
                    <Text
                        style={styles.overlayText}
                    >CALL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddAppointment", {
                        // passing patient uuid for appointment data recieving
                        patientUuid: l.id.uuid,
                        patientDetails: getPatientDetails(l.id.uuid)
                    })}
                    style={{ alignItems: 'center' }}>
                    <AntDesign name="calendar" size={30} color="white" />
                    <Text
                        style={styles.overlayText}
                    >SET APPOINTMENT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("PatientDetail", {
                        // passing patient uuid for appointment data recieving
                        patientUuid: l.id.uuid,
                        patientDetails: getPatientDetails(l.id.uuid)
                    })}
                    style={{ alignItems: 'center' }}>
                    <AntDesign name="user" size={30} color="white" />
                    <Text
                        style={styles.overlayText}
                    >PATIENT INFO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => alert("Dental Document")}
                    style={{ alignItems: 'center' }}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={30} color="white" />
                    <Text
                        style={styles.overlayText}
                    >DENTAL DOCUMENT</Text>
                </TouchableOpacity>

                {/* <View>
                    <Text
                        onPress={() => navigation.navigate("AddAppointment", {
                            // passing patient uuid for appointment data recieving
                            patientUuid: l.id.uuid,
                            patientDetails: getPatientDetails(l.id.uuid)
                        })}
                    >
                        Add Appointment
                    </Text>
                </View>
                <View>
                    <Text
                        onPress={() => navigation.navigate("PatientDetail", {
                            // passing patient uuid for appointment data recieving
                            patientUuid: l.id.uuid,
                            patientDetails: getPatientDetails(l.id.uuid)
                        })}
                    >
                        Patient Info
                    </Text>
                </View> */}
            </View>
        )



    }

    {/* const showOverlay = (i) => {
        console.log(i);

    } */}


    return (
        <Provider>
            <Header
                containerStyle={{ backgroundColor: 'white', padding: 20, height: 120 }}
                placement="left"
                leftComponent={
                    <>
                        <Icon style={{ color: '#000', padding: 10 }} name="menu" size={35} onPress={
                            () => navigation.openDrawer()
                        } />
                    </>

                }

                centerComponent={{ text: 'Patients', style: { color: 'darkblue', fontSize: 35, fontWeight: "bold" } }}

                rightComponent={
                    <Text
                        onPress={() => navigation.navigate("AddPatient")}

                        style={{ color: 'darkblue' }}
                    >
                        + Add Patient
                    </Text>
                }

            />
            <View style={{ backgroundColor: 'white' }}>
                <Searchbar
                    style={{
                        backgroundColor: 'lightgrey', opacity: 0.4
                        , borderRadius: 20,
                        margin: 20
                    }}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <Divider />
            <ScrollView style={{ height: '100%', }} contentContainerStyle={{ height: "100%" }}>
                {
                    patientsNameList.length ? (
                        filteredpatientsNameList.map((l, i) => (  //patientNameList
                            <View key={i}>
                                <ListItem
                                    onLongPress={
                                        () => {
                                            setoverlayOn(l.uuid)
                                            setTimeout(() => {
                                                setoverlayOn("")
                                            }, 3000)
                                        }
                                    }
                                    // onPress={() => navigation.navigate("AddAppointment", {
                                    //     // passing patient uuid for appointment data recieving
                                    //     patientUuid: l.uuid,
                                    //     patientDetails: getPatientDetails(l.uuid)
                                    // })}
                                    containerStyle={{
                                        paddingTop: 20, paddingBottom: 20
                                    }} bottomDivider>
                                    <Avatar source={{ uri: l.imageuri }} rounded />
                                    <ListItem.Content>
                                        <ListItem.Title style={{ fontWeight: 'bold', color: 'grey' }}>{l.fullname}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                                {
                                    overlayOn == l.uuid ? (<Overlay id={l} />) : (null)
                                }



                            </View>






                        ))



                    ) : (
                            <View style={{
                                justifyContent: 'center'
                                , alignItems: 'center',
                                height: '60%'
                            }}>
                                <Text
                                    style={{
                                        color: 'grey',
                                        fontSize: 20
                                    }}>
                                    No patients
                                </Text>
                            </View>
                        )
                }





                {/* {patientsNameList.length && <Text style={{
                    textAlign: 'center',
                    color: 'grey',
                    fontSize: 20,
                    // justifyContent: 'flex-end',
                    // alignItems: 'flex-end'
                    position: 'absolute',
                    bottom: 50,
                    right: 100,
                    left: 100
                }}>{totalPatients} Patients</Text>} */}

            </ScrollView >
            {console.log("Total Patients", totalPatients)}
            {/* {patientsNameList.length &&

                <Text style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: 40,
                    fontWeight: '700',
                    fontSize: 25,
                    color: 'grey',
                    opacity: 0.5

                }}>{totalPatients} Patients</Text>
            } */}

            {/* Code phatt rha he if we add this, solve */}


        </Provider >
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
    ,
    overlayText: {
        textAlign: 'right',
        // marginLeft: 5,
        paddingTop: 10,
        color: 'white'
        , fontSize: 10,
        fontWeight: 'bold'
    },

});



// const date1 = new Date('7/13/2010');
// const date2 = new Date('12/15/2010');
// const diffTime = Math.abs(date2 - date1);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 