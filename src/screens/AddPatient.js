import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Platform, StyleSheet } from "react-native";
import colors from "../config/colors";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getUserData } from "../utils/GetAsyncData"
import { updateGlobalUsersAsync } from "../utils/updateGlobalUsers"

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";
import BlockStyle from "../components/BlockStyle";
import One from './AddPatientComponents/One'
import Two from './AddPatientComponents/Two';
import Third from './AddPatientComponents/Third';
import Fourth from './AddPatientComponents/Fourth';
import Fifth from './AddPatientComponents/Fifth';
import Sixth from './AddPatientComponents/Sixth';
import Seventh_Birth from "./AddPatientComponents/Seventh_Birth";
import Eight_Gender from "./AddPatientComponents/Eight_Gender";
import Ninth_Photo from "./AddPatientComponents/Ninth_Photo";
import Tenth__Back from "./AddPatientComponents/Tenth__Back";

export default function AddPatient({ navigation }) {
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [fifth, setFifth] = useState(false);
    const [sixth, setSixth] = useState(false);
    const [seventh, setSeventh] = useState(false);
    const [eighth, setEigth] = useState(false);
    const [ninth, setNineth] = useState(false);
    const [tenth, setTenth] = useState(false)

    const [last, setLast] = useState(false);
    const [counter, setCounter] = useState(1);

    const [allusersData, setallusersData] = useState(null)
    const [username, setusername] = useState(null)

    const [addPatientState, setaddPatientState] = useState({})

    useEffect(() => {
        getUserData([setallusersData, setusername], ["globalUsers", "username"])
        if (username && allusersData) {
            console.log("all users: ", allusersData, username);
        }
    }, [])

    const handleAddPatientData = (state) => {
        let newState = { ...addPatientState, ...state }
        setaddPatientState(newState)
        console.log(newState);
    }

    // sign up 
    const registerPatient = (state = { phone: "123" }) => {
        // navigation.navigate("SendToDentist")

        let finalState = { ...addPatientState, ...state, createdon: new Date(), appointments: [] }
        handleAddPatientData(state)

        let currentUser = allusersData[username];
        currentUser = {
            ...currentUser, patients: [...currentUser.patients, finalState]
        }
        console.log("Add patient file:: new patient: ", addPatientState);
        const updatedUserData = { ...allusersData, [username]: currentUser }
        // update entire global users
        updateGlobalUsersAsync(updatedUserData)
    }

    const Counter = (count) => {
        setCounter(count);
        if (count === 1) {
            setFirst(true);
        } else if (count === 2) {
            setFirst(false);
            setSecond(true);
        } else if (count === 3) {
            setFirst(false);
            setSecond(false);
            setThird(true);
        } else if (count === 4) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(true);
        } else if (count === 5) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(false);
            setFifth(true);
        } else if (count === 6) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(false);
            setFifth(false);
            setSixth(true);
        } else if (count === 7) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(false);
            setFifth(false);
            setSixth(false);
            setSeventh(true);
        } else if (count === 8) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(false);
            setFifth(false);
            setSixth(false);
            setSeventh(false);
            setEigth(true);
        } else if (count === 9) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(false);
            setFifth(false);
            setSixth(false);
            setSeventh(false);
            setEigth(false);
            setNineth(true);
        } else if (count === 10) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(false);
            setFifth(false);
            setSixth(false);
            setSeventh(false);
            setEigth(false);
            setNineth(false);
            setTenth(true);
        } else if (count === 11) {
            setFirst(false);
            setSecond(false);
            setThird(false);
            setFourth(false);
            setFifth(false);
            setSixth(false);
            setSeventh(false);
            setEigth(false);
            setNineth(false);
            setTenth(false);
            setEleventh(true);
        }
        // else if (count === 12) {
        //   setFirst(false);
        //   setSecond(false);
        //   setThird(false);
        //   setFourth(false);
        //   setFifth(false);
        //   setSixth(false);
        //   setSeventh(false);
        //   setEigth(false);
        //   setNineth(false);
        //   setTenth(false);
        //   setEleventh(false);
        //   setLast(true);
        // }

        else {
            return;
        }
    };


    const ScreenViewer = () => {
        if (first === true) {
            return <One ScreenCounter={Counter} navigation={navigation} handleAddPatientData={handleAddPatientData} />;
        } else if (second === true) {
            return <Two ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} />;
        }
        else if (third === true) {
            return <Third ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} />;
        }
        else if (fourth === true) {
            return <Fourth ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} />;
        }
        else if (fifth === true) {
            return <Fifth ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} />;
        }
        else if (sixth === true) {
            return <Sixth ScreenCounter={Counter} navigation={navigation} handleAddPatientData={handleAddPatientData} />;
        }
        else if (seventh === true) {
            return <Seventh_Birth ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} />;
        }
        else if (eighth === true) {
            return <Eight_Gender ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} />;
        }
        else if (ninth === true) {
            return <Ninth_Photo ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} registerPatient={registerPatient} navigation={navigation} />;
        }
        else if (tenth === true) {
            return <Tenth__Back ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} navigation={navigation} />;
        }

        else {
            return;
        }
    };


    const greenBorderCounter = () => {
        if (counter === 1) {
            return <View style={styles.borderBlockStyle}></View>;
        } else if (counter == 2) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 3) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 4) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 5) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 6) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 7) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 8) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 9) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 10) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        } else if (counter == 11) {
            return (
                <>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                    <View style={styles.borderBlockStyle}></View>
                </>
            );
        }
        else {
            return;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddPatientMain")}
                    style={{ flexDirection: "row" }}
                >
                    <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
                    <Text style={[styles.headerTextStyle, { marginLeft: 2 }]}> Back to ADD PATIENT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.headerText}>
                    <Text style={styles.headerTextStyle}>VIEW FULL FORM</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.borderBlock}>{greenBorderCounter()}</View>
            <View style={BlockStyle.blockStyle}>
                <Text style={styles.screenCounterTextStyle}>{counter === 11 ? "10" : counter} of 10</Text>
                {ScreenViewer()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.02)",
        marginTop: Platform.OS === "android" ? 30 : 0,
    },
    header: {
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    headerTextStyle: {
        color: colors.darkGreen,
        fontWeight: "500",
    },
    screenCounterTextStyle: {
        textAlign: "center",
        color: colors.Gray,
        fontSize: 12,
        marginTop: 10,
    },
    borderBlock: {
        flexDirection: "row",
        marginTop: 25,
        alignSelf: "center",
        width: wp("85%"),
    },
    borderBlockStyle: {
        width: 29,
        height: 5,
        backgroundColor: colors.lightGreen,
    },
});

