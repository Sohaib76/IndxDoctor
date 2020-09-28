import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ButtonStyle from "../components/InputStyle";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FirstScreen = (props) => {
  return (
    <>
      <View style={styles.blockTextStyle}>
        <View style={{ alignSelf: "center" }}>
          <Ionicons name="md-contact" size={40} color={colors.lightGreen} />
        </View>
        <Text style={styles.blockTextStyles}>
          Let's get Started! Please choose which of following you are below !{" "}
        </Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <TouchableOpacity onPress={() => props.ScreenCounter(2)} style={styles.ButtonStyles}>
          <Text style={styles.ButtonTextStyles}> DENTIST</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.ScreenCounter(2)} style={styles.ButtonStyles}>
          <Text style={styles.ButtonTextStyles}>RECEPTIONIST</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  blockTextStyle: {
    alignSelf: "center",
    width: wp("50"),
    marginTop: 10,
  },
  blockTextStyles: {
    fontSize: 18,
    marginTop: 20,
    lineHeight: 20,
    letterSpacing: 0.4,
    fontWeight: "600",
    color: colors.lightGreen,
  },
  ButtonStyles: {
    ...ButtonStyle.InputBlockStyle,
    marginTop: 30,
  },
  ButtonTextStyles: {
    color: colors.Gray,
  },
});
