import React, { useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Ninth = (props) => {
  const [calenderValue, setCalenderValue] = useState("DD/MM/YYYY");
  const [calenderShower, setCalenderShower] = useState(false);

  return (
    <View>
      <Text style={styles.textStyle}>Please Fill out your Contact Details below</Text>

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

        {/* Proceed Btn */}

        {calenderValue !== "DD/MM/YYYY" ? (
          <TouchableOpacity
            onPress={() => props.ScreenCounter(10)}
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
        ) : null}

        {/* Below BelowPart */}
        <View style={styles.BelowPart}>
          <TouchableOpacity onPress={() => props.ScreenCounter(8)} style={{ flexDirection: "row" }}>
            <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
            <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.ScreenCounter(10)}>
            <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Ninth;

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
