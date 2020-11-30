import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../../config/colors";
import InputStyle from "../../components/InputStyle";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Fifth({ ScreenCounter, handleAddPatientData }) {
    const [input, setInput] = useState("");

    const setFirstName = () => {
        ScreenCounter(6)
        handleAddPatientData({ address: input })
    }

    return (
        <View>
            <Text style={styles.textStyle}>Enter Patient Address</Text>

            <View>
                <View style={InputStyle.UserNameBlock}>
                    <Text style={[InputStyle.UserNameTextStyle, { fontSize: 12 }]}>Address</Text>
                </View>

                <View
                    style={[
                        InputStyle.InputBlockStyle,
                        {
                            width: widthPercentageToDP("60%"),
                            marginTop: 10,
                        },
                    ]}
                >
                    <TextInput
                        onChangeText={(val) => setInput(val)}
                        value={input}
                        placeholder="Enter Your Address"
                        style={[
                            InputStyle.TextInputStyle,
                            {
                                marginLeft: 70,
                            },
                        ]}
                    />
                </View>

                {/* Proceed */}

                <TouchableOpacity
                    onPress={setFirstName}
                    disabled={input !== "" ? false : true}
                    style={[
                        InputStyle.InputBlockStyle,
                        {
                            opacity: input !== "" ? 1 : 0.3,
                            backgroundColor: colors.darkGreen,
                            width: widthPercentageToDP("60%"),
                        },
                    ]}
                >
                    <Text style={{ color: "white" }}>Proceed</Text>
                </TouchableOpacity>

                {/* Below BelowPart */}
                <View style={styles.BelowPart}>
                    <TouchableOpacity onPress={() => ScreenCounter(4)} style={{ flexDirection: "row" }}>
                        <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
                        <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => ScreenCounter(7)} disabled={true}>
                        <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
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
        top: "70%",
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
