import React from "react";
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import InputStyle from "../components/InputStyle";

import Logo from "../assets/Images";

//LoginScreen
const LoginScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <View style={styles.logoContainer}>
          <Image source={Logo.Logo} style={{ flex: 1 }} resizeMode="contain" />
        </View>

        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextStyle}>
            Login to start using INDX dental app right now!
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.HeaderButtonContainer}>
          <TouchableOpacity style={styles.HeaderLoginButton}>
            <Text style={styles.HeaderButtonTextColor}>LOG IN</Text>

            <View style={styles.BottomColor}></View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("SignUpScreen");
            }}
            style={styles.HeaderSignUpButton}
          >
            <Text style={styles.HeaderButtonTextColor}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Center}>
        <View style={styles.InputBlock}>
          {/* Username */}
          <View style={InputStyle.InputBlockStyle}>
            <TextInput placeholder="Username" style={InputStyle.TextInputStyle} />
          </View>

          {/* Password */}
          <View style={InputStyle.InputBlockStyle}>
            <TextInput placeholder="Password" style={InputStyle.TextInputStyle} />
          </View>

          {/* LogIn */}

          <TouchableOpacity
            style={[
              InputStyle.InputBlockStyle,
              {
                backgroundColor: colors.darkGreen,
              },
            ]}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>LOG IN</Text>
          </TouchableOpacity>

          {/* Log In With Email */}

          <TouchableOpacity
            style={[
              InputStyle.InputBlockStyle,
              {
                borderColor: colors.lightGreen,
              },
            ]}
          >
            <Text style={{ fontWeight: "600", color: colors.lightGreen }}>LOG IN VIA EMAIL</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Footer}>
          <Text style={styles.FooterText} onPress={() => alert("Terms")}>
            TERMS & CONDITIONS
          </Text>

          <Text onPress={() => alert("Forgot Password!")} style={styles.FooterText}>
            FORGOT PASSWORD
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  Header: {
    flex: 2.2,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  logoContainer: {
    marginTop: 10,
    height: hp("17%"),
    width: wp("60%"),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink",
  },

  headerTextContainer: {
    alignSelf: "center",
    marginTop: 15,
    width: wp("55%"),
  },
  headerTextStyle: {
    textAlign: "center",
    color: colors.Gray,
  },
  HeaderButtonContainer: {
    marginTop: 15,
    flexDirection: "row",
    width: wp("100%"),
    height: hp("8%"),
  },
  HeaderLoginButton: {
    width: wp("49.3%"),
    height: hp("8%"),
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  HeaderButtonTextColor: {
    color: colors.Gray,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 15,
  },
  HeaderSignUpButton: {
    marginLeft: wp("0.4%"),
    width: wp("49.3%"),
    height: hp("8%"),
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  BottomColor: {
    width: wp("49%"),
    backgroundColor: colors.lightGreen,
    height: 5,
    marginTop: 15,
  },
  Center: {
    flex: 3.8,
    backgroundColor: "rgba(0,0,0,0.02)",
  },
  InputBlock: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "white",
    height: hp("50%"),
    width: wp("90%"),
  },

  Footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  FooterText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.Gray,
  },
});
