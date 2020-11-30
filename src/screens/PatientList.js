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




import { updateGlobalUsersAsync } from "../utils/updateGlobalUsers"
import { ScrollView } from 'react-native-gesture-handler';

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

    const onChangeSearch = query => setSearchQuery(query);

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
        console.log(a);
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
            console.log("updatedPatientData", updatedPatientData);
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
            console.log(usersData[username].patients, "....");
            let patientsDataList = usersData[username].patients
            console.log("patient list: ", patientsDataList);
            // run only if patients exist
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
                        uuid: patient.uuid
                    }
                })
                sortedPatientList.sort(function (a, b) { return a["fullname"].localeCompare(b["fullname"]); });
                // segmented list
                setpatientsNameList(sortedPatientList)
            }
        }
    }, [usersData, username])

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const Overlay = (l) => {
        return (
            <View style={{
                // top: props.id * 75,
                position: "absolute",
                backgroundColor: 'teal', width: '100%',
                //height: `${100 / list.length}%`,
                // opacity: opaq ? 0.5 : 0,
                height: "100%"
            }}>
                <View>
                    <Text
                        onPress={() => navigation.navigate("AddAppointment", {
                            // passing patient uuid for appointment data recieving
                            patientUuid: l.uuid,
                            patientDetails: getPatientDetails(l.uuid)
                        })}
                    >
                        Add Appointment
                    </Text>
                </View>
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
            <View>
                {
                    patientsNameList.length ? (
                        patientsNameList.map((l, i) => (
                            <View key={i}>
                                <ListItem
                                    onLongPress={
                                        () => {
                                            setoverlayOn(l.uuid)
                                            setTimeout(() => {
                                                setoverlayOn("")
                                            }, 1000)
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
                                    <Avatar source={{ uri: l.avatar_url }} rounded />
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
                            <View>
                                <Text>
                                    No patients
                                </Text>
                            </View>
                        )
                }

            </View >
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
});



// const date1 = new Date('7/13/2010');
// const date2 = new Date('12/15/2010');
// const diffTime = Math.abs(date2 - date1);
// const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 