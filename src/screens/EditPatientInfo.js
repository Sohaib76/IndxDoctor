import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { Ionicons } from "@expo/vector-icons";

export default function EditPatientInfo() {
    const [input, setInput] = useState("");

    return (
        <View >
            <View style={InputStyle.UserNameBlock}>
                <Text style={[InputStyle.UserNameTextStyle, { fontSize: 12 }]}>FIRST NAME</Text>
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
                    placeholder="Enter Your First Name"
                    style={[
                        InputStyle.TextInputStyle,
                        {
                            marginLeft: 70,
                        },
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
