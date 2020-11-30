import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,

} from "react-native";
import colors from "../config/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import InputStyle from "../components/InputStyle";
import Logo from "../assets/Images";
import { dummydataValue, setdummydata } from "../utils/setDummyData"

export default function LoginScreen({ navigation, route }) {

  // AsyncStorage.clear()

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  // const [userData, setuserData] = useState({})
  const [globalData, setglobalData] = useState({})

  // empty async storage
  const clearAsyncStorage = async () => {
    alert("Storage cleared")
    AsyncStorage.clear();
  }

  const handleUsername = text => {
    setusername(text)
  };
  const handlePassword = text => {
    setpassword(text)
  };

  const getGlobalData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("globalUsers")
      let userdata = JSON.parse(jsonValue)
      if (!userdata) {
        alert("Please Signup first")
        navigation.navigate("SignUpScreen")
      } else {
        setglobalData(userdata)
      }
    } catch (e) {
      console.log("error from login", e);
    }
  }

  useEffect(() => {
    getGlobalData()
  }, [])
  // when new user is added fetch updated data
  useEffect(() => {
    if (route.params) {
      if (route.params.newUserAdded) {
        getGlobalData()
      }
    }
  }, [route.params])

  const login = async () => {
    let tempAsync = {};
    if (globalData) {
      tempAsync = globalData
    }

    // auth username
    var userLoggedIn = Object.keys(tempAsync).find(function (user) {
      return user == username;
    });

    // user available confimed
    if (userLoggedIn) {
      // match pwd
      if (tempAsync[userLoggedIn].password === password) {
        alert("Authorized")
        // set loggin flag and username
        setLoggedIn(userLoggedIn)
        // redirect to home
        navigation.navigate("Auth", { screen: "HomeDrawer", params: { userObject: userLoggedIn } }
        )
      }
      else {
        alert("Incorrect Password")
      }
    }
    else {
      alert("Incorrect User")
    }
  }

  const setLoggedIn = async (username) => {
    try {
      await AsyncStorage.multiSet([['isLoggedIn', "1"],
      ["username", JSON.stringify(username)]], ((err) => {
      }));
    } catch (e) {
      // saving error
      console.log(e);
    }
  }

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
              navigation.navigate("SignUpScreen");
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
            <TextInput
              onChangeText={handleUsername}
              placeholder="Uername" style={InputStyle.TextInputStyle}
              autoCapitalize="none"
            />

          </View>

          {/* Password */}
          <View style={InputStyle.InputBlockStyle}>
            <TextInput
              autoCapitalize="none"
              onChangeText={handlePassword}
              placeholder="Password" style={InputStyle.TextInputStyle} />
          </View>

          {/* LogIn */}

          <TouchableOpacity
            style={[
              InputStyle.InputBlockStyle,
              {
                backgroundColor: colors.darkGreen,
              },
            ]}
            onPress={login}
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
          <Text style={styles.FooterText} onPress={clearAsyncStorage}>
            TERMS & CONDITIONS
          </Text>

          <Text onPress={() => alert("Forgot Password!")} style={styles.FooterText}>
            FORGOT PASSWORD
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}




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
