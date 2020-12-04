import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';


import Colors from '../config/colors';
import PatientQueue from './PatientQueue';

export default function DashboardQueue({ patientDetails, today, handleCancel, handleQueue }) {
    const [dayname, setdayname] = useState("")
    const [date, setdate] = useState("")
    useEffect(() => {
        setdayname(today.toDateString().slice(0, 4))
        setdate(today.toDateString().slice(4,))
    }, [today, patientDetails])

    const mapAll = (data) => {
        let timeslots = Object.keys(data)
        let main = []
        timeslots.forEach(slot => {
            data[slot].map(appnmnt => {
                main.push(<PatientQueue key={appnmnt.uuid} time={slot} details={appnmnt} handleCancel={handleCancel} handleQueue={handleQueue} />)
            })
        })
        return main
    }
    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>{dayname}</Text>
            <Text style={{ fontSize: 20, color: 'grey', fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>{date}</Text>
            {patientDetails ? (
                // patientDetails.
                mapAll(patientDetails)
                // <PatientQueue isQueued={true} isCancelled={false} details={patientDetails} />
            ) : (
                    <View>
                        <Text>No Apponitments</Text>
                    </View >
                )
            }
            {/* <PatientQueue isQueued={false} isCancelled={false} />
            <PatientQueue isCancelled={true} /> */}
        </View >
    )
}

const styles = StyleSheet.create({})
