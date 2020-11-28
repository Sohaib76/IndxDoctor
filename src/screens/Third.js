import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import InputStyle from "../components/InputStyle";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import Images from "../assets/Images";

export default function Third({ ScreenCounter, signupState, setsignUpState }) {
  useEffect(() => {
  }, [])

  const [pwdInput, setpwdInput] = useState("");
  const [repeat, setRepeat] = useState("");
  const [inputOne, setInputOne] = useState(true);
  const [inputTwo, setInputTwo] = useState(true);

  const setPassword = () => {
    if (pwdInput === repeat) {
      setsignUpState({ password: pwdInput })
      ScreenCounter(4)
    }
    else {
      alert("Passwords do not match")
    }
  }


  return (
    <View>
      <Text style={styles.textStyle}>Now Fill Out password below</Text>

      <View>
        <View style={InputStyle.UserNameBlock}>
          <Text style={[InputStyle.UserNameTextStyle]}>Password</Text>
          <Text style={[InputStyle.UserNameTextStyle, { fontWeight: "300", fontSize: 12 }]}>
            Password must be minimum of six
          </Text>
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
          <View style={{ flexDirection: "row" }}>
            <TextInput
              secureTextEntry={inputOne}
              onChangeText={(val) => setpwdInput(val)}
              value={pwdInput}
              style={[
                InputStyle.TextInputStyle,
                { marginLeft: 0, width: widthPercentageToDP("40%") },
              ]}
              placeholder="Enter your password"
            />

            {/* PasswordViewer*/}
            <TouchableOpacity
              onPress={() => setInputOne(!inputOne)}
              style={{ marginLeft: 25, marginTop: 14 }}
            >
              <Image source={Images.Eye} style={{ width: 18, height: 18 }} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={[
            InputStyle.InputBlockStyle,
            {
              width: widthPercentageToDP("60%"),
              marginTop: 20,
            },
          ]}
        >
          <View style={{ flexDirection: "row" }}>
            <TextInput
              secureTextEntry={inputTwo}
              onChangeText={(val) => setRepeat(val)}
              value={repeat}
              style={[
                InputStyle.TextInputStyle,
                {
                  marginLeft: 0,
                  width: widthPercentageToDP("40%"),
                },
              ]}
              placeholder="Repeat Password"
            />

            {/* Image_Viewer */}
            <TouchableOpacity
              onPress={() => setInputTwo(!inputTwo)}
              style={{ marginLeft: 25, marginTop: 14 }}
            >
              <Image source={Images.Eye} style={{ width: 18, height: 18 }} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Proceed */}

      <TouchableOpacity
        onPress={setPassword}
        disabled={pwdInput !== "" ? false : true}
        style={[
          InputStyle.InputBlockStyle,
          {
            opacity: pwdInput !== "" ? 1 : 0.3,
            backgroundColor: colors.darkGreen,
            width: widthPercentageToDP("60%"),
          },
        ]}
      >
        <Text style={{ color: "white" }}>Proceed</Text>
      </TouchableOpacity>

      <View style={styles.BelowPart}>
        <TouchableOpacity onPress={() => ScreenCounter(2)} style={{ flexDirection: "row" }}>
          <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
          <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ScreenCounter(4)} disabled={true}>
          <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


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
    top: "48%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
