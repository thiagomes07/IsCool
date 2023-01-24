import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "75%",
    maxHeight: "80%",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  flatList: {
    width: '80%',
    borderRadius: 10,
  },
  item: {
    flex: 1,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 15,
    marginHorizontal: 10,
    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowRadius: 10,
    textShadowOffset: { width: 0, height: 0 },
  },
  info: {
    marginHorizontal: 25,
    fontSize: 13,
    color: "#fff",
  },
  tasksBox: {
    right: 3,
    bottom: 3,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tasksTxt: {
    fontSize: 13,
    color: "#ffffffAA",
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFDA1F",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 3,
  },
  headerTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  flkatListFooter: {
    height: 10,
    backgroundColor: "#FFDA1F",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default styles;
