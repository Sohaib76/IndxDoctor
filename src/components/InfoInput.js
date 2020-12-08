import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { Ionicons } from "@expo/vector-icons";
import { set } from 'react-native-reanimated';

export default function InfoInput({ label, fill, set }) {
    const [input, setInput] = useState("")

    useEffect(() => {
        setInput(fill)
    }, [fill])
    return (
        <View style={{ marginLeft: -30 }}>
            <View style={InputStyle.UserNameBlock}>
                <Text style={[InputStyle.UserNameTextStyle, { fontSize: 12 }]}>{label}</Text>
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
                    onChangeText={(val) => set(val)}
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
