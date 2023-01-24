import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "75%",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  title: {
    fontSize: 12,
    marginTop: 5,
    color: "#00000080",
  },
  inputs: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    fontSize: 40,
    fontWeight: "bold",
  },
  separator: {
    fontSize: 35,
    letterSpacing: -5,
  },
  calendar: {
    borderColor: "#F5C000",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 40,
  },
  calendarTxt: {
    fontWeight: "bold",
    color: "#F5C000",
    letterSpacing: 3,
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.10)",
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 1 },
  },
  daysWeek: {
    flexDirection: "row",
    marginVertical: 5,
    height: 40,
  },
  daysWeekTxt: {
    fontSize: 28,
    flex: 1.5,
    textAlign: "center",
    textAlignVertical: "center",
  },
  addOneBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 5,
    flex: 1,
    BorderColor: "#000000C0",
  },
  addRemoveBtn: {
    BorderColor: "#000000C0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 4,
    flex: 1,
  },
  goalBtns: {
    flexDirection: "row",
    marginTop: 5,
    height: 35,
  },
  deleteGoalBtn: {
    flex: 1,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFDA1F",
  },
  addGoalBtn: {
    flex: 2.5,
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  addGoalBtnTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  line: {
    alignSelf: "center",
    marginTop: 7,
    height: 1.5,
    width: '80%',
  },
  goalData: {
    marginBottom: 5,
  },
});

export default styles;
