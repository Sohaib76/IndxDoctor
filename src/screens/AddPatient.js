import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Platform, StyleSheet } from "react-native";
import colors from "../config/colors";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getUserData } from "../utils/GetAsyncData"

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";
import BlockStyle from "../components/BlockStyle";
import One from './AddPatientComponents/One'
import Two from './AddPatientComponents/Two';
import Third from './AddPatientComponents/Third';
import Fourth from './AddPatientComponents/Fourth';
import Fifth from './AddPatientComponents/Fifth';
import Sixth from './AddPatientComponents/Sixth';

export default function AddPatient({ navigation }) {
    const [first, setFirst] = useState(true);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [fifth, setFifth] = useState(false);
    const [sixth, setSixth] = useState(false);

    const [last, setLast] = useState(false);
    const [counter, setCounter] = useState(1);

    const [allusersData, setallusersData] = useState(null)
    const [username, setusername] = useState(null)

    const [addPatientState, setaddPatientState] = useState({})

    useEffect(() => {
        getUserData([setallusersData, setusername], ["globalUsers", "username"])
    }, [])


    const handleAddPatientData = (state) => {
        let newState = { ...addPatientState, ...state }
        setaddPatientState(newState)
    }
    const registerPatient = () => {
        console.log("registered");
        let currentUser = allusersData[username];
        currentUser = {
            ...currentUser, patients: [...currentUser.patients, addPatientState]
        }
        const updatedUserData = { ...allusersData, [username]: currentUser }
        const addUserAsync = async () => {
            try {
                await AsyncStorage.setItem("globalUsers", JSON.stringify(updatedUserData));
            }
            catch (e) {
                console.log(e);
            }
        }
        addUserAsync()
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
            return <One ScreenCounter={Counter} handleAddPatientData={handleAddPatientData} />;
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
            return <Sixth ScreenCounter={Counter} navigation={navigation} registerPatient={registerPatient} handleAddPatientData={handleAddPatientData} />;
        }

        else {
            return;
        }
    };

    return (
        <View>
            {ScreenViewer()}
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Login")}
                        style={{ flexDirection: "row" }}
                    >
                        <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
                        <Text style={[styles.headerTextStyle, { marginLeft: 2 }]}> Back to login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.headerText}>
                        <Text style={styles.headerTextStyle}>VIEW FULL FORM</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.borderBlock}>{greenBorderCounter()}</View> */}
                <View style={BlockStyle.blockStyle}>
                    <Text style={styles.screenCounterTextStyle}>{counter === 11 ? "10" : counter} of 10</Text>
                </View>
            </SafeAreaView>
        </View>
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

