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

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
    </Stack.Navigator>
  )
}

const Stack = createStackNavigator();
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



export default function Container() {

  const [isLoggedIn, setisLoggedIn] = useState(false)
  const loadData = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    alert(isLoggedIn)
    setisLoggedIn(isLoggedIn)

  }
  useEffect(() => {
    loadData()
    alert("use effect")
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

