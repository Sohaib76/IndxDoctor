import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";
import ButtonStyle from "../components/InputStyle";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const Eleventh = (props) => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");

  //get Permission iOS Device bcz if we don't then explain before deploying
  //it on appStore bcz appstore will reject your app if you don't explain permission
  const getPermissionAsync = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  //Here i'm using async to don't wait for the Receiver
  const getPhotoFromDevice = async () => {
    //launchImageLibraryAsync to LaunchImage and get the photo address and pass this inot result
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.cancelled === true) {
      alert("Please select Any Picture");
    } else {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <View style={styles.iconContainer}>
        <FontAwesome name="user-circle-o" size={70} color={colors.lightGreen} />
      </View>
      <Text style={styles.textStyle}>Finally, Let's add your Photo</Text>

      <Text style={styles.secondTextStyle}>
        Add your personal photo! it makes people easy to remember! Please add just one photo of you
        for your profile completion.
      </Text>

      <TouchableOpacity
        onPress={() => getPhotoFromDevice()}
        style={[
          ButtonStyle.InputBlockStyle,
          {
            marginTop: 70,
            backgroundColor: colors.darkGreen,
          },
        ]}
      >
        <Text style={{ color: "white" }}>Add Photo</Text>
      </TouchableOpacity>

      {/* Below Part */}
      <View style={styles.BelowPart}>
        <TouchableOpacity onPress={() => props.ScreenCounter(10)} style={{ flexDirection: "row" }}>
          <Ionicons name="ios-arrow-back" size={18} color={colors.darkGreen} />
          <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{ marginLeft: 5, color: colors.darkGreen }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Eleventh;

const styles = StyleSheet.create({
  textStyle: {
    color: colors.lightGreen,
    fontSize: 20,
    width: widthPercentageToDP("80%"),
    fontWeight: "700",
    lineHeight: 23,
    marginLeft: widthPercentageToDP("10%"),
    marginTop: 20,
  },
  secondTextStyle: {
    color: "gray",
    fontSize: 12,
    width: widthPercentageToDP("70%"),
    fontWeight: "800",
    lineHeight: 22,
    marginLeft: widthPercentageToDP("10%"),
    marginTop: 30,
  },
  iconContainer: {
    alignSelf: "center",
    marginTop: 30,
  },
  BelowPart: {
    top: "25%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
