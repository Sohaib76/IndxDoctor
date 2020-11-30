import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ButtonStyle from "../../components/InputStyle";
import colors from "../../config/colors";
import { Ionicons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../config/colors";

const uuid = require('react-native-uuid');

export default function One({ ScreenCounter, navigation, handleAddPatientData }) {

    const [pressedState, setpressedState] = useState(false)

    const pressed = () => {
        // for now keep this
        setpressedState(true)
        handleAddPatientData({ uuid: uuid.v4() })
        ScreenCounter(2)
    }
    return (

        <>
            <View style={styles.blockTextStyle}>
                {/* <View style={{ alignSelf: "center" }}>
                    <Ionicons name="md-contact" size={40} color={colors.lightGreen} />
                </View> */}
                <Text style={styles.blockTextStyles}>
                    Do you have an existing
                </Text>
            </View>

            <View style={{ marginTop: 40 }}>
                {/* <TouchableOpacity onPress={() => ScreenCounter(2)} style={styles.ButtonStyles}> */}
                <TouchableOpacity disabled={true} style={styles.ButtonStyles}>

                    <Text style={{ color: 'grey', fontWeight: '700' }}>YES</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={pressed} style={
                    [styles.ButtonStyles,
                    {
                        backgroundColor: Colors.darkGreen

                    }
                    ]}>
                    <Text style={{ color: "white" }}>NO</Text>
                </TouchableOpacity>
            </View>


            {/* Below BelowPart */}
            <View style={styles.BelowPart}>
                <TouchableOpacity onPress={() => navigation.navigate("AddPatientMain")} style={{ flexDirection: "row" }}>
                    <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
                    <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => ScreenCounter(7)} disabled={true}>
                    <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
                </TouchableOpacity>
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    blockTextStyle: {
        alignSelf: "center",
        width: wp("50"),
        marginTop: 10,
    },
    blockTextStyles: {
        fontSize: 18,
        marginTop: 20,
        // lineHeight: 20,
        // letterSpacing: 0.4,
        fontWeight: "600",
        color: colors.lightGreen,
    },
    ButtonStyles: {
        ...ButtonStyle.InputBlockStyle,
        marginTop: 30,
        // backgroundColor: "blue"
    },
    ButtonTextStyles: {
        color: colors.Gray,
    },
    BelowPart: {
        top: "70%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
