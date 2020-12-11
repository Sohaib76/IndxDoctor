import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../../config/colors";
import InputStyle from "../../components/InputStyle";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Seventh_Birth({ ScreenCounter, handleAddPatientData }) {
    const [calenderValue, setCalenderValue] = useState("DD/MM/YYYY");
    const [calenderShower, setCalenderShower] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));

    const [age, setAge] = useState(31);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setCalenderShower(Platform.OS === 'ios');
        setDate(currentDate);
        var yyyy = JSON.stringify(currentDate).substr(1, 4)
        var mm = JSON.stringify(currentDate).substr(6, 2)
        var dd = JSON.stringify(currentDate).substr(9, 2)
        dd = parseInt(dd) + 1
        setCalenderValue(`${dd}/${mm}/${yyyy}`)

        var now = new Date()
        var diff = now - currentDate; // This is the difference in milliseconds
        var age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25

        setAge(age)



    };

    const setBirthDay = () => {
        //setsignUpState({ dob: calenderValue })
        ScreenCounter(8)
        handleAddPatientData({ dob: calenderValue, age: age })
    }

    return (
        <View>
            <Text style={styles.textStyle}>Please Fill out Patient Date of Birth below</Text>

            <View>
                <View style={InputStyle.UserNameBlock}>
                    <Text style={[InputStyle.UserNameTextStyle, { fontSize: 12 }]}>DATE OF BIRTH</Text>
                </View>

                <View
                    style={[
                        InputStyle.InputBlockStyle,
                        {
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            width: widthPercentageToDP("60%"),
                            marginTop: 10,
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => setCalenderShower(!calenderShower)}
                        style={{ marginLeft: 10 }}
                    >
                        <AntDesign name="calendar" size={24} color={colors.lightGreen} />
                    </TouchableOpacity>

                    <View style={{ marginLeft: 50 }}>
                        <Text style={{ color: "gray", fontWeight: "300" }}>{calenderValue}</Text>
                    </View>
                </View>

                {calenderShower && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        dateFormat="day month year"
                    />
                )}

                {/* Proceed Btn */}
                {/* del gap */}
                {calenderValue !== "DD/MM/YYYY" ? (
                    <TouchableOpacity
                        onPress={setBirthDay}
                        // disabled={input !== "" ? false : true}
                        style={[
                            InputStyle.InputBlockStyle,
                            {
                                // opacity: input !== "" ? 1 : 0.3,
                                backgroundColor: colors.darkGreen,
                                width: widthPercentageToDP("60%"),
                            },
                        ]}
                    >
                        <Text style={{ color: "white" }}>Proceed</Text>
                    </TouchableOpacity>
                ) : null}

                {/* Below BelowPart */}
                <View style={styles.BelowPart}>
                    <TouchableOpacity onPress={() => ScreenCounter(6)} style={{ flexDirection: "row" }}>
                        <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
                        <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => ScreenCounter(10)} disabled={true}>
                        <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: colors.lightGreen,
        fontSize: 16,
        width: widthPercentageToDP("60%"),
        fontWeight: "700",
        lineHeight: 23,
        marginLeft: widthPercentageToDP("19%"),
        marginTop: 20,
    },
    phoneCode: {
        marginTop: 15,
        marginLeft: 30,
        color: "gray",
        height: 20,
        width: 30,
        backgroundColor: "rgba(0,0,0,0.1)",
        marginBottom: 10,
    },
    BelowPart: {
        top: "30%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});

