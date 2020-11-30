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

import AddPatient from "../screens/AddPatient";
import PatientList from "../screens/PatientList";
import { Button } from "react-native";
import CustomDrawerContent from '../components/CustomDrawer'
import PatientDetailScreen from "../screens/PatientDetailScreen";
import AddPatientMain from "../screens/AddPatientMain";
import AddAppointment from "../screens/AddAppointment";
import AddApointmentMain from "../screens/AddApointmentMain";
import Tenth__Back from "../screens/AddPatientComponents/Tenth__Back";



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
      <Stack.Screen name="SendToDentist" component={Tenth__Back} />
      <Stack.Screen name="AddAppointment" component={AddAppointment} />
      <Stack.Screen name="PatientList" component={PatientList} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />

      <Stack.Screen name="Auth" component={AuthStack} />
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

export default function Container() {
  const [isLoggedIn, setisLoggedIn] = useState("")

  const loadData = async () => {
    const v = await AsyncStorage.getItem("isLoggedIn")
    if (v == "1") {
      setisLoggedIn(v)
      alert("Welcome back!")
    }
    else {
      setisLoggedIn("0")
    }
  }

  useEffect(() => {
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

