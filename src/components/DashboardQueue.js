import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, Header } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Surface } from 'react-native-paper';
import { Button, Menu, Divider, Provider } from 'react-native-paper';


import Colors from '../config/colors';
import PatientQueue from './PatientQueue';

export default function DashboardQueue() {
    return (
        <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>Thursday</Text>
            <Text style={{ fontSize: 20, color: 'grey', fontWeight: 'bold', marginStart: 20, marginTop: 20 }}>November 22, 2018</Text>
            <PatientQueue isQueued={true} isCancelled={false} />
            <PatientQueue isQueued={false} isCancelled={false} />
            <PatientQueue isCancelled={true} />
        </View>
    )
}

const styles = StyleSheet.create({})
