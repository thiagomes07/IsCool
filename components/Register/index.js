import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  Keyboard,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Context } from "../../Context/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles.js";
import { authentication } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Login(props) {
  const { setIdUser, setIsLogged } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(true);
  const [passwordIsVisibleConfirm, setPasswordIsVisibleConfirm] =
    useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordInput = useRef();
  const confirmPasswordInput = useRef();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={"height"} style={styles.container}>
        <StatusBar backgroundColor="#0069E0" />
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={[styles.inputEmail, { borderWidth: error ? 1.5 : 0 }]}
          placeholder="Email"
          autoComplete="email"
          autoCapitalize="none"
          onSubmitEditing={() => passwordInput.current.focus()}
        />
        <View style={styles.inputPasswordAndBtn}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            ref={passwordInput}
            value={password}
            style={[styles.inputPassword, { borderWidth: error ? 1.5 : 0 }]}
            secureTextEntry={passwordIsVisible}
            placeholder="Senha"
            autoComplete="password"
            autoCapitalize="none"
            onSubmitEditing={() => confirmPasswordInput.current.focus()}
          />
          <View
            style={[
              styles.btnViewPassword,
              {
                borderRightWidth: error ? 1.5 : 0,
                borderTopWidth: error ? 1.5 : 0,
                borderBottomWidth: error ? 1.5 : 0,
              },
            ]}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              <Ionicons
                name={passwordIsVisible ? "eye" : "eye-off"}
                color={"#444"}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputPasswordAndBtnConfirm}>
          <TextInput
            onChangeText={(text) => setPasswordConfirm(text)}
            ref={confirmPasswordInput}
            value={passwordConfirm}
            style={[styles.inputPassword, { borderWidth: error ? 1.5 : 0 }]}
            secureTextEntry={passwordIsVisibleConfirm}
            placeholder="Confirmação de Senha"
            autoComplete="password"
            autoCapitalize="none"
          />
          <View
            style={[
              styles.btnViewPassword,
              {
                borderRightWidth: error ? 1.5 : 0,
                borderTopWidth: error ? 1.5 : 0,
                borderBottomWidth: error ? 1.5 : 0,
              },
            ]}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                setPasswordIsVisibleConfirm(!passwordIsVisibleConfirm)
              }
            >
              <Ionicons
                name={passwordIsVisibleConfirm ? "eye" : "eye-off"}
                color={"#444"}
                size={23}
              />
            </TouchableOpacity>
          </View>
        </View>
        {error && (
          <View style={styles.errorBox}>
            <MaterialIcons name={"error-outline"} color={"#F00"} size={18} />
            <Text style={styles.errorMessage}>{errorMsg}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.btn}
          disabled={loading}
          onPress={() => register(email, password, passwordConfirm)}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#FFDA1F" />
          ) : (
            <Text style={styles.btnText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.btnRegister}>Já é cadastrado?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );

  function register(em, pass, passCon) {
    if (
      !(
        em.length === 0 ||
        !em.trim() ||
        pass.length === 0 ||
        !pass.trim() ||
        passCon.length === 0 ||
        !passCon.trim()
      ) &&
      pass.trim() === passCon.trim()
    ) {
      em = em.trim();
      pass = pass.trim();

      setLoading(true);

      createUserWithEmailAndPassword(authentication, em, pass)
        .then(async function (userCredential) {
          setIdUser(userCredential.user.uid);
          setLoading(false);
          setError(false);
          setIsLogged(true);

          await AsyncStorage.removeItem("@matters");
          await AsyncStorage.removeItem("@tasks");
          await AsyncStorage.removeItem("@completedTasks");
          await AsyncStorage.removeItem("@notificationPriorities");
          await AsyncStorage.removeItem("@seg");
          await AsyncStorage.removeItem("@ter");
          await AsyncStorage.removeItem("@qua");
          await AsyncStorage.removeItem("@qui");
          await AsyncStorage.removeItem("@sex");
          await AsyncStorage.removeItem("@sab");
          await AsyncStorage.removeItem("@dom");

          props.navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          switch (error.code) {
            case "auth/user-disabled":
              setErrorMsg("Usuário desativado");
              break;
            case "auth/user-not-found":
              setErrorMsg("Usuário não foi encontrado");
              break;
            case "auth/weak-password":
              setErrorMsg("Senha muito curta (menos que 6 caracteres)");
              break;
            case "auth/email-already-in-use":
              setErrorMsg("Email já cadastrado");
              break;
            case "auth/invalid-email":
              setErrorMsg("Formato de email inválido");
              break;
            case "auth/account-exists-with-different-credential":
              setErrorMsg("Email já cadastrado");
              break;
            case "auth/wrong-password":
              setErrorMsg("Senha incorreta");
              break;
            case "auth/invalid-user-token":
              setErrorMsg("Usuário não foi encontrado");
              break;
            case "auth/network-request-failed":
              setErrorMsg("Falha de conexão com a rede");
              break;
            case "auth/too-many-requests":
              setErrorMsg(
                "Solicitações bloqueadas devido a atividades incomuns"
              );
              break;
            case "auth/invalid-email-verified":
              setErrorMsg("Email inválido");
              break;
            case "auth/invalid-password":
              setErrorMsg("Senha muito curta (menos que 6 caracteres)");
              break;
            case "auth/email-already-exists":
              setErrorMsg("Email já cadastrado");
              break;
            case "auth/internal-error":
              setErrorMsg("Erro inesperado");
              break;
            default:
              setErrorMsg("Não foi possível cadastrar-se");
              Alert.alert("Erro", error.message);
          }
        });
    } else if (pass !== passCon) {
      setErrorMsg("Senhas diferentes");
      setError(true);
    } else {
      setErrorMsg("Valores inválidos");
      setError(true);
    }
  }
}
