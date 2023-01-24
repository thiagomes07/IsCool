import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "75%",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  input:{
    width: '100%',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#00000055'
  },
  inputTeacher:{
    marginTop: 10,
  },
  deleteEditBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  editBtnMatter: {
    flex: 2,
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
  },
  deleteBtnMatter: {
    marginRight: 5,
    flex: 1,
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 35,
  },
  deleteMatterOfDayBtn: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: "#FFDA1F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
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
  editBtnTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
