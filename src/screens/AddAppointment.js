import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, colors, Header, Icon } from 'react-native-elements';
import { Portal, Searchbar, Provider } from 'react-native-paper';

export default function AddAppointment({ navigation, route }) {
    // This data will be given to backend

    // Will Decide More after selecting Calendar
    //https://github.com/amhinson/react-native-calendar
    //https://react-native-components.gitbook.io/calendar/
    // const [appointment, setappointmen] = useState("6/12/2019")

    const [appointmentTime, setappointmentTime] = useState("10:00 AM")
    //This data will be fetched
    const [lastAppointment, setlastAppointment] = useState("6 months ago")
    const [firstname, setfirstname] = useState("Alexander")
    const [lastname, setlastname] = useState("Dela Costa")

    //Will be fetched locally
    const [appointmentDate, setappointmentDate] = useState("6")
    const [appointmentMonth, setappointmentMonth] = useState("December")
    const [appointmentWeekDay, setappointmentWeekDay] = useState("Monday")

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
                onPress={() => navigation.navigate("PatientList"
                    , {
                        patientUuid: route.params.patientUuid,
                        appointmentDetails: {
                            firstname,
                            lastname,
                            appointmentDate,
                            appointmentTime
                        }
                    }
                )}
            />


            {/* <Button
                containerStyle={{
                    marginBottom: 20

                }}
                title="Finish Appointment"
                onPress={() => navigation.navigate("HomeScreen")}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({})
