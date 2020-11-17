import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity, StyleSheet, View, Text } from "react-native";
import colors from "../config/colors";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import InputStyle from "../components/InputStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Fifth({ ScreenCounter }) {
  const [input, setInput] = useState("");
  const [inputOne, setInputOne] = useState("");
  const [colorOne, SetColorOne] = useState(colors.Gray);

  const [inputTwo, setInputTwo] = useState("");
  const [colorTwo, SetColorTwo] = useState(colors.Gray);

  const [inputThree, setInputThree] = useState("");
  const [colorThree, SetColorThree] = useState(colors.Gray);

  const [inputFour, setInputFour] = useState("");
  const [colorFour, SetColorFour] = useState(colors.Gray);

  const [numb, setnumb] = useState(0)


  useEffect(() => {
    const getNumber = async () => {
      const jsonValue = await AsyncStorage.getItem("tempPersonDict")
      x = JSON.parse(jsonValue)
      setnumb(x.number)

    }
    setTimeout(function () {
      getNumber()
    }, 100);
  }, [])

  return (
    <View>
      <Text style={styles.textStyle}>Please verify by entering your 4 digit code</Text>
      <Text style={styles.textStyleTwo}>We sent a text message to {numb}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[
            styles.textStyleTwo,
            {
              width: widthPercentageToDP("30%"),
              marginLeft: widthPercentageToDP("19%"),
              marginTop: 0,
            },
          ]}
        >
          Did't get a code?
        </Text>
        <Text
          onPress={() => alert("Try Again")}
          style={[
            styles.textStyleTwo,
            {
              width: widthPercentageToDP("30%"),
              marginLeft: widthPercentageToDP("0%"),
              marginTop: 0,
              color: colors.darkGreen,
            },
          ]}
        >
          Try Again
        </Text>
      </View>

      {/**Input Validation */}
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="numeric"
          onTouchStart={() => {
            SetColorOne(colors.darkGreen);
            if (inputOne !== "" && inputTwo !== "" && inputThree !== "" && inputFour !== "") {
              setInput("True");
            } else {
              setInput("");
            }
          }}
          value={inputOne}
          onChangeText={(val) => setInputOne(val)}
          maxLength={1}
          style={[styles.textInputStyle, { borderBottomWidth: 3, borderBottomColor: colorOne }]}
        />

        <TextInput
          keyboardType="numeric"
          onTouchStart={() => {
            SetColorTwo(colors.darkGreen);
            if (inputOne !== "" && inputTwo !== "" && inputThree !== "" && inputFour !== "") {
              setInput("True");
            } else {
              setInput("");
            }
          }}
          value={inputTwo}
          onChangeText={(val) => setInputTwo(val)}
          maxLength={1}
          style={[styles.textInputStyle, { borderBottomWidth: 3, borderBottomColor: colorTwo }]}
        />

        <TextInput
          keyboardType="numeric"
          onTouchStart={() => {
            SetColorThree(colors.darkGreen);
            if (inputOne !== "" && inputTwo !== "" && inputThree !== "" && inputFour !== "") {
              setInput("True");
            } else {
              setInput("");
            }
          }}
          value={inputThree}
          onChangeText={(val) => setInputThree(val)}
          maxLength={1}
          style={[styles.textInputStyle, { borderBottomWidth: 3, borderBottomColor: colorThree }]}
        />

        <TextInput
          keyboardType="numeric"
          onChange={() => {
            setInput("true");
          }}
          onTouchStart={() => {
            if (inputOne !== "" && inputTwo !== "" && inputThree !== "" && inputFour !== "") {
              setInput("True");
            } else {
              setInput("");
            }
            SetColorFour(colors.darkGreen);
          }}
          value={inputFour}
          onChangeText={(val) => setInputFour(val)}
          maxLength={1}
          style={[styles.textInputStyle, { borderBottomWidth: 3, borderBottomColor: colorFour }]}
        />
      </View>

      {/* Proceed */}
      <TouchableOpacity
        onPress={() => ScreenCounter(6)}
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

      {/*Footer */}
      <View style={styles.BelowPart}>
        <TouchableOpacity onPress={() => ScreenCounter(4)} style={{ flexDirection: "row" }}>
          <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
          <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ScreenCounter(6)}>
          <Text style={{ marginLeft: 5, opacity: 0.45, color: colors.darkGreen }}>Skip</Text>
        </TouchableOpacity>
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
    marginLeft: widthPercentageToDP("12%"),
    marginTop: 20,
    textAlign: "center"
  },
  textStyleTwo: {
    color: "gray",
    fontSize: 12,
    width: widthPercentageToDP("80%"),
    fontWeight: "700",
    lineHeight: 23,
    marginLeft: widthPercentageToDP("12%"),
    marginTop: 20,
  },
  inputContainer: {
    alignSelf: "center",
    height: 50,
    flexDirection: "row",
    width: widthPercentageToDP("68%"),
    //  backgroundColor: "pink",
  },
  textInputStyle: {
    height: 50,
    width: 60,
    marginLeft: 3,
    textAlign: "center",

    borderBottomWidth: 2,
    borderBottomColor: colors.Gray,
    //backgroundColor: "red",
  },
  BelowPart: {
    top: "60%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
