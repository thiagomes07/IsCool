import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "85%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: "80%",
  },
  btnAddMatter: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFDA1F",
    borderRadius: 5,
    marginBottom: 10,
    height: 30,
  },
  flatLists: {
    maxHeight: Dimensions.get("window").height / 1.65,
  },
  flatList: {
    width: 170,
    marginRight: 10,
    borderRadius: 10,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFDA1F",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerTxt: {
    fontWeight: "bold",
  },
  btnAdd: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    backgroundColor: "#FFDA1F",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  btnAddTxt: {
    fontWeight: "bold",
  },
  btnViewMatters: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFDA1F",
    borderRadius: 5,
    marginTop: 10,
    height: 30,
  },
});

export default styles;
