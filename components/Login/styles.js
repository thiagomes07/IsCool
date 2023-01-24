import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  inputEmail: {
    padding: 10,
    fontSize: 16,
    marginTop: 15,
    width: "75%",
    borderRadius: 5,
    height: 48,
    backgroundColor: "#FFF",
    borderColor: "#F00",
    fontWeight: "bold",
  },
  inputPasswordAndBtn: {
    marginTop: 15,
    marginBottom: 7.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    width: "75%",
  },
  inputPassword: {
    height: 48,
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    borderColor: "#F00",
    backgroundColor: "#FFF",
    fontWeight: "bold",
  },
  btnViewPassword: {
    borderColor: "#F00",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center",
    backgroundColor: "#FFF",
    position: "absolute",
    justifyContent: "center",
    height: 48,
    width: 48,
    top: 0,
    right: 0,
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
  },
  errorMessage: {
    marginLeft: 5,
    color: "#F00",
  },
  btn: {
    width: "75%",
    height: 40,
    marginTop: 7.5,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  btnForgotPassword: {
    marginTop: 10,
    textDecorationLine: "underline",
  },
  boxMsgForgotPassword: {
    marginTop: 10,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    width: "75%",
    textAlign: "justify",
    backgroundColor: "#FFF",
  },
  msgForgotPassword: {
    fontSize: 13,
    color: "#666",
    textAlign: "justify",
  },
  boxRegister: {
    bottom: "5%",
    position: "absolute",
  },
  txtRegister: {
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default styles;
