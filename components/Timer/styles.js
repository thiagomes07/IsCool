import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  pickerBox: {
    height: Dimensions.get("window").height / 7.5,
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000C0",
    width: 315,
  },
  CountdownAndInputs: {
    height: Dimensions.get("window").height / 2.3,
    marginBottom: Dimensions.get("window").height / 45,
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    fontSize: Dimensions.get("window").height / 14,
    fontWeight: "bold",
  },
  separator: {
    fontSize: 35,
    letterSpacing: -5,
  },
  buttons: {
    height: Dimensions.get("window").height / 7.8,
    marginBottom: Dimensions.get("window").height / 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  stopAndPauseBtn: {
    backgroundColor: "#000000C0",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 10,
  },
  playBtn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "#F5C000",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  titleProgressBarTxt: {
    fontSize: 14,
    marginBottom: 4,
    color: '#000000C0'
  },
  setGoals: {
    height: Dimensions.get("window").height / 13,
    marginBottom: Dimensions.get("window").height / 40,
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarTxt: {
    marginLeft: 7,
    fontSize: 22,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  setGoalsTxt: {
    fontWeight: "bold",
    color: "#000000C0",
    letterSpacing: 1.2,
    marginTop: 8,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  pomodoro: {
    height: Dimensions.get("window").height / 13,
    alignItems: "center",
    justifyContent: "center",
  },
  pomodoroTxt: {
    letterSpacing: 1.5,
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 4,
    marginRight: 10,
  },
  pomodoroActivate: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginBottom: 10,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default styles;
