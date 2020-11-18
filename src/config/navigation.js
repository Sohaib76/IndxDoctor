import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import HomeScreen from "../screens/HomeScreen";
import AsyncStorage from '@react-native-async-storage/async-storage'


import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import { createDrawerNavigator } from 'react-navigation-drawer';

// createDrawerNavigator(RouteConfigs, DrawerNavigatorConfig);
// import SafeAreaView from 'react-native-safe-area-view';
// import { DrawerItems } from 'react-navigation-drawer';
import React, { useState, useEffect } from "react";
import Logout from "../screens/Logout";
import Last from "../screens/Last";
import FirstScreen from "../screens/FirstScreen";
import Second from "../screens/Second";
import Third from "../screens/Third";


// const CustomDrawerContentComponent = (props) => (
//   <ScrollView>
//     <SafeAreaView
//       style={styles.container}
//       forceInset={{ top: 'always', horizontal: 'never' }}
//     >
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );

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
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="FirstScreen" component={FirstScreen} />
      <Stack.Screen name="SecondScreen" component={Second} />
      <Stack.Screen name="ThirdScreen" component={Third} />

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

// const AuthStack = createStackNavigator(
//   {
//     LoginScreen: {
//       screen: LoginScreen,
//     },
//     SignUpScreen: {
//       screen: SignUpScreen,
//     },
//   },
//   { initialRouteName: "LoginScreen", headerMode: "none", mode: "modal" }
// );

// const AppStack = createStackNavigator(
//   {

//     Home: HomeScreen

//   }

// )

// const Container = createAppContainer(createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: HomeDrawer,
//     Auth: AuthStack,
//   }
// ))

// export default Container;




const setAsync = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
}



export default function Container() {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    setisLoggedIn(
      isLoggedIn
    )
  }

  useEffect(() => {
    // dummy data --> for dev only
    const setdummydata = async () => {
      try {
        await AsyncStorage.multiSet([["username", "ben"], [
          "globalUsers", JSON.stringify(
            {
              "admin": {
                password: "pass",
                role: "dentist",
                patiens: []
              },
              "ben": {
                password: "benpass",
                role: "receptionist",
                patiens: []
              },
            }
          )
        ]]);
      } catch (e) {
        console.log(e);
      }
    }
    // ----------
    setdummydata()
    loadData()
  }, [isLoggedIn])
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {isLoggedIn ? (
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

