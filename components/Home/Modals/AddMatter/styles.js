import { StyleSheet } from "react-native";

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
  addBtnMat: {
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 5,
    marginTop: 5,
    height: 35,
  },
  itemColorPicker: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    marginVertical: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  addBtnTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
