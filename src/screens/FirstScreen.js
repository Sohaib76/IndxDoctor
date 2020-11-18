import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ButtonStyle from "../components/InputStyle";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function FirstScreen({ ScreenCounter }) {

  const [allusersData, setallusersData] = useState(null)
  const [username, setusername] = useState(null)
  const [personDict, setpersonDict] = useState({})

  useEffect(() => {
    const getusername = async () => {
      try {
        const asynData = await AsyncStorage.multiGet(["globalUsers", "username"]);
        let allUsersData = JSON.parse(asynData[0][1]);
        setallusersData(allUsersData)
        setusername(JSON.parse(asynData[1][1]))
      } catch (e) {
        console.log(e);
      }
    }
    getusername()
  }, [])

  const selectProfession = async (profession) => {
    const currentUser = { ...allusersData[username], role: profession }
    const globalData = { ...allusersData, [username]: currentUser }
    await AsyncStorage.setItem("globalUsers", JSON.stringify(globalData))
  }

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
        {/* <TouchableOpacity onPress={() => ScreenCounter(2)} style={styles.ButtonStyles}> */}
        <TouchableOpacity onPress={() => selectProfession("dentist")} style={styles.ButtonStyles}>

          <Text style={styles.ButtonTextStyles}> DENTIST</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => selectProfession("receptionist")} style={styles.ButtonStyles}>
          <Text style={styles.ButtonTextStyles}>RECEPTIONIST</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}




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
