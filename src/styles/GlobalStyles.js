import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const GlobalStyles = StyleSheet.create({
  sportApp: {
    backgroundColor: "#fff",
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    overflow: "hidden",
    alignItems: "center",
    paddingTop: 60,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 10,
  },
  btnLarge1: {
    backgroundColor: "#EA9354",
    height: 45,
    width: 325,
  },
  btnLayerStyle: {
    color: "#fcfcfc",
    fontSize: 16,
    fontWeight: "700",
  },

  smLetters: {
    color: "#000000",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
    textAlign: "center",
  },
  card: {
    justifyContent: "center",

    backgroundColor: "#fff",
    width: wp("75%"),
  },

  cardText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  cardCover: {
    height: hp("16%"),
    resizeMode: "stretch",
  },
});
