import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Seventh({ ScreenCounter, signupState, setsignUpState }) {
  const [input, setInput] = useState("");
  const setMiddleName = async () => {
    setsignUpState({ middlename: input })
    ScreenCounter(8)
    // const jsonValue = await AsyncStorage.getItem("tempPersonDict")
    // x = JSON.parse(jsonValue)
    // x.middleName = input
    // await AsyncStorage.setItem("tempPersonDict", JSON.stringify(x))
    // alert(JSON.stringify(x))
  }
  return (
    <View>
      <Text style={styles.textStyle}>Please Fill out your Contact Details below</Text>

      <View>
        <View style={InputStyle.UserNameBlock}>
          <Text style={[InputStyle.UserNameTextStyle, { fontSize: 12 }]}>MIDDLE NAME</Text>
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
            placeholder="Enter Your Middle Name"
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
          onPress={setMiddleName}
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
          <TouchableOpacity onPress={() => ScreenCounter(6)} style={{ flexDirection: "row" }}>
            <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
            <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => ScreenCounter(8)} disabled={true}>
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
