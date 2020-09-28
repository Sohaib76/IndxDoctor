import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Navigation = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
    SignUpScreen: {
      screen: SignUpScreen,
    },
  },
  { initialRouteName: "LoginScreen", headerMode: "none", mode: "modal" }
);

const Container = createAppContainer(Navigation);

export default Container;
