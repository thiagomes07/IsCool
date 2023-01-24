import React, { useState, useRef, useEffect, useContext } from "react";
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
import styles from "./styles.js";
import { authentication } from "../../Firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Login(props) {
  const { setIdUser, setLoginMsg, setIsLogged } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailSend, setEmailSend] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const passwordInput = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardActive(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardActive(true);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
        {error && (
          <View style={styles.errorBox}>
            <MaterialIcons name={"error-outline"} color={"#F00"} size={18} />
            <Text style={styles.errorMessage}>{errorMsg}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.btn}
          disabled={loading}
          onPress={() => login(email, password)}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#FFDA1F" />
          ) : (
            <Text style={styles.btnText}>Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => recoverPassword(email)}>
          <Text style={styles.btnForgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        {emailSend && (
          <View style={styles.boxMsgForgotPassword}>
            <Text style={styles.msgForgotPassword}>
              Uma mensagem foi enviada ao email informado acima. Clique no link
              contido na mensagem e redefina sua senha. Caso a mensagem não seja
              encontrada, verifique a lixeira ou o spam. Após a redefinição ter
              sido feita, faça login normalmente com a nova senha.
            </Text>
          </View>
        )}
        {keyboardActive && (
          <View style={styles.boxRegister}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text style={styles.txtRegister}>Ainda não é cadastrado?</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );

  function recoverPassword(em) {
    if (!(em.length === 0 || !em.trim())) {
      Alert.alert(
        "Redefinir senha",
        "Você tem certeza que deseja redefinir sua senha?",
        [
          {
            text: "Não",
          },
          {
            text: "Sim",
            onPress: () => {
              em = em.trim();

              authentication.languageCode = "pt-BR";

              sendPasswordResetEmail(authentication, em)
                .then(() => {
                  setError(false);
                  setEmailSend(true);
                })
                .catch((error) => {
                  if (error.code == "auth/invalid-email") {
                    setError(true);
                    setErrorMsg("Formato de email inválido");
                  } else if (error.code == "auth/user-not-found") {
                    setError(true);
                    setErrorMsg("Usuário não encontrado");
                  } else {
                    Alert.alert("Erro", error.message);
                  }
                });
            },
          },
        ]
      );
    } else {
      setErrorMsg("Email inválido");
      setError(true);
    }
  }

  function login(em, pass) {
    if (!(em.length === 0 || !em.trim() || pass.length === 0 || !pass.trim())) {
      em = em.trim();
      pass = pass.trim();

      setLoading(true);

      signInWithEmailAndPassword(authentication, em, pass)
        .then((userCredential) => {
          setIdUser(userCredential.user.uid);
          setLoginMsg(userCredential);
          setLoading(false);
          setError(false);
          setIsLogged(true);

          props.navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          console.log(error);
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
              setErrorMsg("Não foi possível logar-se");
              Alert.alert("Erro", error.message);
          }
        });
    } else {
      setErrorMsg("Valores inválidos");
      setError(true);
    }
  }
}
