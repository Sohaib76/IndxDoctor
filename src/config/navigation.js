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
import PatientList from "../screens/PatientList";
import { Button } from "react-native";
import CustomDrawerContent from '../components/CustomDrawer'
import PatientDetailScreen from "../screens/PatientDetailScreen";
import AddPatientMain from "../screens/AddPatientMain";
import AddAppointment from "../screens/AddAppointment";
import AddApointmentMain from "../screens/AddApointmentMain";

// const Tab =  TabNavigator({
//   TabA: {
//     screen: Home 
//   },
//   TabB: {
//     screen: Home
//   }
// }, {
//   order: ['TabA', 'TabB'],
//   animationEnabled: true,
// })


const Drawer = createDrawerNavigator();
function HomeDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="AddPatientMain" component={AddPatientMain} />
      <Stack.Screen name="AddAppointmentMain" component={AddApointmentMain} />
      {/* Temp Move later Patient Detail */}
      {/* <Drawer.Screen name="??" component={Tab} /> */}
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddPatient" component={AddPatient} />
      <Stack.Screen name="AddAppointment" component={AddAppointment} />
      <Stack.Screen name="PatientList" component={PatientList} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />

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
  const [isLoggedIn, setisLoggedIn] = useState("")
  const loadData = async () => {
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
    // for first time only
    // setdummydata()
    loadData()
  }, [])
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

