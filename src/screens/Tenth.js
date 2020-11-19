import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { Ionicons } from "@expo/vector-icons";
import Images from "../assets/Images";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tenth = ({ ScreenCounter, signupState, setsignUpState }) => {
  const [input, setInput] = useState("Male");
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [genderShower, setGenderShower] = useState(false);
  const setGender = async () => {
    setsignUpState({ gender: input })
    ScreenCounter(11)
  }

  return (
    <View>
      <Text style={styles.textStyle}>Please Fill out your Contact Details below</Text>

      <View>
        <View style={InputStyle.UserNameBlock}>
          <Text style={[InputStyle.UserNameTextStyle, { fontSize: 12 }]}>GENDER</Text>
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
          <TouchableOpacity
            onPress={() => {
              setGenderShower(!genderShower);
              setMale(true);
            }}
          >
            <Text style={{ paddingLeft: 10, marginLeft: -100, color: colors.Gray }}>Choose your gender </Text>
          </TouchableOpacity>
        </View>

        {genderShower === true ? (
          <>
            <TouchableOpacity
              onPress={() => {
                setMale(true), setFemale(false), setInput("Male");
              }}
              style={[
                InputStyle.InputBlockStyle,
                {
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  borderColor: "rgba(0,0,0,0.05)",
                  marginTop: 0,
                  width: widthPercentageToDP("60%"),
                },
              ]}
            >
              {male === true ? (
                <Image
                  source={Images.filled}
                  style={{ marginLeft: 10, tintColor: colors.lightGreen, width: 20, height: 20 }}
                  resizeMode="contain"
                />
              ) : (
                  <Image
                    source={Images.empty}
                    style={{ marginLeft: 10, tintColor: colors.lightGreen, width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                )}
              <Text style={{ marginLeft: 10, color: colors.Gray }}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMale(false);
                setFemale(true);
                setInput("Female");
              }}
              style={[
                InputStyle.InputBlockStyle,
                {
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  borderColor: "rgba(0,0,0,0.05)",
                  marginTop: 0,
                  width: widthPercentageToDP("60%"),
                },
              ]}
            >
              {female === true ? (
                <Image
                  source={Images.filled}
                  style={{ marginLeft: 10, tintColor: colors.lightGreen, width: 20, height: 20 }}
                  resizeMode="contain"
                />
              ) : (
                  <Image
                    source={Images.empty}
                    style={{ marginLeft: 10, tintColor: colors.lightGreen, width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                )}
              <Text style={{ marginLeft: 10, color: colors.Gray }}>Female</Text>
            </TouchableOpacity>
          </>
        ) : null}

        {/* Proceed */}

        <TouchableOpacity
          onPress={setGender}
          disabled={genderShower === true ? false : true}
          style={[
            InputStyle.InputBlockStyle,
            {
              opacity: genderShower === true ? true : 0.3,
              backgroundColor: colors.darkGreen,
              width: widthPercentageToDP("60%"),
            },
          ]}
        >
          <Text style={{ color: "white" }}>Proceed</Text>
        </TouchableOpacity>

        {/* Below_Part */}
        <View style={styles.BelowPart}>
          <TouchableOpacity onPress={() => ScreenCounter(9)} style={{ flexDirection: "row" }}>
            <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
            <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => ScreenCounter(11)}>
            <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Tenth;

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
    top: "35%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
