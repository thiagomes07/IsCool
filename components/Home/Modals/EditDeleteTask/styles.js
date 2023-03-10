import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "75%",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  input: {
    width: "100%",
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: "#00000055",
  },
  inputTeacher: {
    marginTop: 10,
  },
  calendar: {
    borderColor: "#F5C000",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 5,
    height: 35,
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
  picker: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#00000055",
    borderRadius: 5,
    paddingBottom: 5,
    marginTop: 5,
    height: 40,
  },
  inputDescription: {
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 2,
    minHeight: 40,
    marginTop: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00000055'
  },
  notifications: {
    marginTop: 5,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1.5,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: "100%",
  },
  pickerNotification: {
    width: Dimensions.get("window").width / 2.3,
    alignSelf: "stretch",
  },
  infoPriority: {
    fontSize: 12,
    color: "#00000090",
    marginBottom: 5,
    textAlign: "justify",
  },
  borderTxts: {
    marginVertical: 4,
    width: "80%",
    alignSelf: "center",
    borderBottomWidth: 0.5,
    color: "#00000050",
  },
  deleteEditCompleteBtn: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
  },
  editBtnTask: {
    flex: 3,
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
    marginHorizontal: 5,
  },
  deleteBtnTask: {
    flex: 1,
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
  },
  editBtnTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  completeBtnTask: {
    flex: 1,
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
  },
  border: {
    borderWidth: 2,
    borderColor: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
