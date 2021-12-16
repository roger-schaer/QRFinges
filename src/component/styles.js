import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    padding: 50,
    paddingTop: 0,
    backgroundColor: "#f5f5f5",
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
    color: "darkgreen",
    paddingBottom: 15,
  },

  errors: {
    paddingBottom: 15,
    color: "red",
  },

  textMenu: {
    fontSize: 16,
    color: "darkgreen",
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 15,
  },

  content: {
    fontSize: 14,
    color: "darkgreen",
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "justify",
  },

  logoContainer: {
    marginBottom: 20,
    paddingBottom: 30,
  },

  title: {
    color: "darkgreen",
    fontSize: 20,
    paddingBottom: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

  secondtitle: {
    color: "darkgreen",
    fontSize: 20,
    paddingBottom: 40,
    paddingTop: 10,
    paddingLeft: 90,
  },

  thirdtitle: {
    color: "darkgreen",
    fontSize: 20,
    paddingBottom: 20,
    paddingTop: 10,
    paddingLeft: 30,
  },

  iconContainer: {
    color: "darkgreen",
    padding: 10,
  },

  iconContainerProfile: {
    color: "darkgreen",
    padding: 10,
    paddingLeft: 150,
  },

  input: {
    height: 30,
    borderBottomColor: "darkgreen",
    borderBottomWidth: 1,
    marginVertical: 10,
    marginBottom: 20,
  },

  btnloc: {
    alignItems: "center",
    paddingTop: 10,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  buttonText: {
    fontSize: 40,
    color: "#087940",
    textDecorationLine: "underline",
    textAlign: "center",
  },

  iconSyncContainer: {
    color: "darkgreen",
    paddingTop: 20,
    paddingLeft: 160,
    paddingBottom: 100,
    alignItems: "center",
  },

  timerContainer: {
    flexDirection: "column",
  },

  timerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "darkgreen",
    paddingRight: 30,
    paddingBottom: 20,
  },

  timerTexts: {
    fontSize: 14,
    fontWeight: "400",
    color: "darkgreen",
    paddingRight: 30,
    paddingBottom: 20,
    paddingLeft: 20,
  },

  timerLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 10,
  },

  startContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingBottom: 70,
  },
  barcodeBox: {
    marginVertical: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 250,
    overflow: "hidden",
    borderRadius: 30,
    borderStartColor: "darkgreen",
  },
  customBtnGreen: {
    marginBottom: 20,
    backgroundColor: "darkgreen",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    fontSize: 16,
    fontWeight: "700",
  },

  webviewer: {
    flex: 1,
    //flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  cameraButtonRight: {
    flex: 0.65,
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButtonCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  cameraButtonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignSelf: "flex-end",
    margin: 20,
  },
  camera: {
    flex: 1,
    margin: 2,
  },
  languageUnderline: {
    textDecorationLine: "underline",
    color: "darkgreen",
  },
});
