import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
  sportApp: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 932,
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
  container: {
    alignItems: "center",
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
    width: 320,
  },

  cardText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  cardCover: {
    height: 135,
  },
});
