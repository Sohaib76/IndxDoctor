import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import colors from "../config/colors";

const Style = {
  UserNameBlock: {
    marginLeft: 50,
    marginTop: 30,
  },
  UserNameTextStyle: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.Gray,
  },
  InputOuterStyle: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  InputBlockStyle: {
    marginTop: 20,
    width: widthPercentageToDP("70%"),
    height: heightPercentageToDP("7.5%"),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  TextInputStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    height: heightPercentageToDP("7%"),
    width: widthPercentageToDP("70%"),
  },
};

export default Style;
