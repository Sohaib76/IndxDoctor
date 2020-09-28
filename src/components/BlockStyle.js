import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BlockStyle = {
  blockStyle: {
    alignSelf: "center",
    backgroundColor: "white",
    height: hp("80%"),
    width: wp("85%"),
  },
};

export default BlockStyle;
