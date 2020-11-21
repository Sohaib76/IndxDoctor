import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage'


import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import React, { useState, useEffect } from "react";
import Logout from "../screens/Logout";
import Last from "../screens/Last";
import FirstScreen from "../screens/FirstScreen";
import Second from "../screens/Second";
import Third from "../screens/Third";
import Fourth from "../screens/Fourth";


import { setdummydata } from "../utils/setDummyData"
import AddPatient from "../screens/AddPatient";

const Drawer = createDrawerNavigator();
function HomeDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="Auth" component={AuthStack} />
      {/* <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="SecondScreen" component={Second} />
      <Stack.Screen name="ThirdScreen" component={Third} />
      <Stack.Screen name="FourthScreen" component={Fourth} /> */}
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      <Stack.Screen name="Last" component={Last} />
    </Stack.Navigator>
  );
}

const setAsync = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}



export default function Container() {
  console.log("navi");

  // const [isLoggedIn, setisLoggedIn] = useState(false)
  const [isLoggedIn, setisLoggedIn] = useState("")
  const loadData = async () => {
    // const isLoggedIn = await AsyncStorage.getItem("isLoggedIn", ((err, rslt) => {
    //   // console.log(rslt);
    //   setisLoggedIn(
    //     rslt
    //   )
    // }));
    // console.log("islogged in", isLoggedIn);
    const v = await AsyncStorage.getItem("isLoggedIn")
    if (v == "1") {
      setisLoggedIn(v)

      console.log(v)
    }
    else {
      setisLoggedIn("0")
    }

  }

  useEffect(() => {
    //test
    // const p = async () => {
    //   await AsyncStorage.setItem("abc", "1")
    //   var x = await AsyncStorage.getItem("abc")
    //   console.log(x, "nav 0 or 1");
    // }
    // p()

    // dummy data --> for dev only
    // ----------
    // setdummydata() ????
    loadData()
    console.log("check", isLoggedIn);
  }, [])
  // isLoggedIn
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isLoggedIn == '1' ? (
          <>
            <Stack.Screen name="Home" component={HomeDrawer} />
          </>
        ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

