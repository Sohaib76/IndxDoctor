import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
//Second
const Second = (props) => {
  const [input, setInput] = useState("");

  return (
    <View>
      <Text style={styles.textStyle}>Fill Out your username below</Text>

      <View>
        <View style={InputStyle.UserNameBlock}>
          <Text style={InputStyle.UserNameTextStyle}>USERNAME</Text>
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
            style={[InputStyle.TextInputStyle, { marginLeft: 70 }]}
            placeholder="Type your username"
          />
        </View>
      </View>

      {/* Proceed */}

      <TouchableOpacity
        onPress={() => props.ScreenCounter(3)}
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

      <View style={styles.BelowPart}>
        <TouchableOpacity onPress={() => props.ScreenCounter(1)} style={{ flexDirection: "row" }}>
          <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
          <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.ScreenCounter(3)}>
          <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Second;

//Styles
const styles = StyleSheet.create({
  textStyle: {
    color: colors.lightGreen,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
  BelowPart: {
    top: "75%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
