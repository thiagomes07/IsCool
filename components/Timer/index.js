import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Modal,
  Vibration,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import * as Progress from "react-native-progress";
import { Context } from "../../Context/Provider";
import { Switch } from "react-native-switch";
import stylesHome from "../Home/styles";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import LottieView from "lottie-react-native";
import AddGoal from "./AddGoal";
import styles from "./styles.js";

export default function Timer() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const { matters, setMatters } = useContext(Context);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const minuteRef = useRef();
  const secondRef = useRef();

  const [matterSelected, setMatterSelected] = useState("");
  const [progress, setProgress] = useState(0);
  const [play, setPlay] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [switchOnOrOff, setSwitchOnOrOff] = useState(false);
  const [disabledSwitch, setDisabledSwitch] = useState(false);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [key, setKey] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [check, setCheck] = useState(false);
  const [addGoalVisible, setAddGoalVisible] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (matterSelected !== "") {
      if (
        matters[matterSelected].hasOwnProperty("timeOfGoal") &&
        matters[matterSelected].timeOfGoal != "noGoal"
      ) {
        let studyTime = 0;

        if (matters[matterSelected].studyTime)
          studyTime = matters[matterSelected].studyTime;

        setProgress(
          ((studyTime - matters[matterSelected].timeInitOfGoal) /
            matters[matterSelected].timeOfGoal) *
            100
        );
      } else {
        setProgress(0);
      }
    } else {
      setProgress(0);
    }
  }, [matterSelected, matters]);

  useEffect(() => {
    if (matterSelected !== "") {
      if (
        matters[matterSelected].hasOwnProperty("timeOfGoal") &&
        matters[matterSelected].timeOfGoal != "noGoal"
      ) {
        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3);
        /* ----------------------------------------------- TESTAR VENCIMENTO DE METAS ---------------------------------------------*/
        if (
          Date.parse(matters[matterSelected].dateOfGoal) < currentDate.getTime()
        ) {
          let unfinishedGoal = 1;

          if (matters[matterSelected].unfinishedGoal !== undefined)
            unfinishedGoal += matters[matterSelected].unfinishedGoal;

          setMatters((prevState) => {
            const newState = prevState.map((obj) => {
              if (obj.id === matters[matterSelected].id) {
                return {
                  ...obj,
                  hourGoal: "noGoal",
                  minuteGoal: "noGoal",
                  daysWeekGoal: "noGoal",
                  dateOfGoal: "noGoal",
                  timeOfGoal: "noGoal",
                  timeInitOfGoal: "noGoal",
                  unfinishedGoal: unfinishedGoal,
                };
              }
              return obj;
            });
            return newState;
          });
        }
      }
    }
  }, [matterSelected]);

  const animationsFiles = [
    require("../../assets/animations/0.json"),
    require("../../assets/animations/1.json"),
    require("../../assets/animations/2.json"),
    require("../../assets/animations/3.json"),
    require("../../assets/animations/4.json"),
    require("../../assets/animations/5.json"),
    require("../../assets/animations/6.json"),
    require("../../assets/animations/7.json"),
    require("../../assets/animations/8.json"),
    require("../../assets/animations/9.json"),
    require("../../assets/animations/10.json"),
    require("../../assets/animations/11.json"),
    require("../../assets/animations/12.json"),
    require("../../assets/animations/13.json"),
    require("../../assets/animations/14.json"),
    require("../../assets/animations/15.json"),
    require("../../assets/animations/16.json"),
    require("../../assets/animations/17.json"),
    require("../../assets/animations/18.json"),
    require("../../assets/animations/19.json"),
    require("../../assets/animations/20.json"),
    require("../../assets/animations/21.json"),
    require("../../assets/animations/22.json"),
    require("../../assets/animations/23.json"),
    require("../../assets/animations/24.json"),
    require("../../assets/animations/25.json"),
    require("../../assets/animations/26.json"),
    require("../../assets/animations/27.json"),
    require("../../assets/animations/28.json"),
    require("../../assets/animations/29.json"),
    require("../../assets/animations/30.json"),
    require("../../assets/animations/31.json"),
    require("../../assets/animations/32.json"),
    require("../../assets/animations/33.json"),
    require("../../assets/animations/34.json"),
    require("../../assets/animations/35.json"),
    require("../../assets/animations/36.json"),
    require("../../assets/animations/37.json"),
    require("../../assets/animations/38.json"),
    require("../../assets/animations/39.json"),
    require("../../assets/animations/40.json"),
    require("../../assets/animations/41.json"),
    require("../../assets/animations/42.json"),
    require("../../assets/animations/43.json"),
  ];

  const windowHeight = Dimensions.get("window").height;

  let timeRemaining = 0;

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#0069E0" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          {/* Definir Meta: */}
          <Modal
            animationType="slide"
            visible={addGoalVisible}
            transparent={true}
          >
            <View style={stylesHome.modal}>
              <View style={stylesHome.modalBtnClose}>
                <Text style={stylesHome.modalBtnCloseHeader}>Definir Meta</Text>
                <TouchableOpacity onPress={() => setAddGoalVisible(false)}>
                  <Ionicons name={"close"} color={"#000"} size={34} />
                </TouchableOpacity>
              </View>
              <AddGoal mat={matterSelected} />
            </View>
          </Modal>
          {animation && (
            <LottieView
              autoPlay
              loop={false}
              style={{
                zIndex: 1,
                backgroundColor: "#ffffff00",
              }}
              onAnimationFinish={() => setAnimation(false)}
              speed={1}
              resizeMode={"cover"}
              source={
                animationsFiles[
                  randomNum(0, animationsFiles.length - 1).toFixed(0)
                ]
              }
            />
          )}
          {check && (
            <LottieView
              autoPlay
              loop={false}
              style={{
                zIndex: 1,
                backgroundColor: "#ffffff00",
              }}
              onAnimationFinish={() => setCheck(false)}
              speed={0.75}
              source={require("../../assets/animations/goalComplete.json")}
            />
          )}
          <View style={styles.pickerBox}>
            <View
              style={[
                styles.picker,
                { backgroundColor: isEditable ? "transparent" : "#d9d9d9" },
              ]}
            >
              <Picker
                enabled={isEditable}
                mode="dropdown"
                selectedValue={matterSelected}
                onValueChange={(itemValor) => setMatterSelected(itemValor)}
              >
                <Picker.Item
                  style={{ color: "#00000055" }}
                  label="Escolha a matéria:"
                  value=""
                />
                {matters
                  .sort((a, b) => (a.matter > b.matter ? 1 : -1))
                  .map((item, index) => {
                    return (
                      <Picker.Item
                        style={{ color: "#000" }}
                        label={item.matter}
                        value={index}
                        key={item.id}
                      />
                    );
                  })}
              </Picker>
            </View>
          </View>
          <View style={styles.CountdownAndInputs}>
            {
              <CountdownCircleTimer
                key={key}
                isPlaying={play}
                duration={convertToSeconds(hour, minute, second)}
                strokeWidth={windowHeight / 19}
                size={windowHeight / 2.4}
                colors="#5Cb0FF"
                onComplete={(totalElapsedTime) => {
                  setSwitchOnOrOff(false);
                  setIsEditable(true);
                  setDisabledSwitch(false);
                  setPlay(false);
                  setHour("00");
                  setMinute("00");
                  setSecond("00");
                  setKey(key + 1);
                  setAnimation(true);
                  setElapsedTime(0);
                  Vibration.vibrate(200);
                  setTimeout(() => {
                    addToMatter(matterSelected, totalElapsedTime);
                  }, 5000);
                }}
                onUpdate={(remainingTime) => {
                  if (
                    !switchOnOrOff &&
                    play &&
                    remainingTime ==
                      -Math.round(-convertToSeconds(hour, minute, second) / 2)
                  ) {
                    timerNotifications(matterSelected, remainingTime);
                  }
                  if (play) setElapsedTime(elapsedTime + 1);
                }}
              >
                {({ remainingTime }) => {
                  const hours = Math.floor(remainingTime / 3600);
                  const minutes = Math.floor((remainingTime % 3600) / 60);
                  const seconds = remainingTime % 60;
                  timeRemaining = remainingTime;

                  return (
                    <View style={styles.inputs}>
                      <TextInput
                        style={styles.input}
                        editable={isEditable}
                        onChangeText={setHour}
                        textAlign="center"
                        maxLength={2}
                        value={isEditable ? hour : String(adicionaZero(hours))}
                        keyboardType="numeric"
                        onSubmitEditing={() => {
                          if (hour.length == 0 || hour.trim().length == 0)
                            setHour("00");
                          minuteRef.current.focus();
                        }}
                      />
                      <Text style={styles.separator}> : </Text>
                      <TextInput
                        ref={minuteRef}
                        style={styles.input}
                        editable={isEditable}
                        onChangeText={setMinute}
                        textAlign="center"
                        maxLength={2}
                        value={
                          isEditable ? minute : String(adicionaZero(minutes))
                        }
                        keyboardType="numeric"
                        onSubmitEditing={() => {
                          if (minute.length == 0 || minute.trim().length == 0)
                            setMinute("00");
                          secondRef.current.focus();
                        }}
                      />
                      <Text style={styles.separator}> : </Text>
                      <TextInput
                        ref={secondRef}
                        style={styles.input}
                        editable={isEditable}
                        onChangeText={setSecond}
                        textAlign={"center"}
                        maxLength={2}
                        value={
                          isEditable ? second : String(adicionaZero(seconds))
                        }
                        keyboardType="numeric"
                        onSubmitEditing={() => {
                          if (second.length == 0 || second.trim().length == 0)
                            setSecond("00");
                        }}
                      />
                    </View>
                  );
                }}
              </CountdownCircleTimer>
            }
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.stopAndPauseBtn}
              onPress={() => {
                setSwitchOnOrOff(false);
                if (!isEditable) addToMatter(matterSelected, elapsedTime);
                setIsEditable(true);
                setPlay(false);
                setDisabledSwitch(false);
                setHour("00");
                setMinute("00");
                setSecond("00");
                setKey(key + 1);
                deleteNotifications();
                setElapsedTime(0);
              }}
            >
              <Ionicons name={"stop"} color={"#FFF"} size={34} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playBtn}
              onPress={() =>
                countdownInit(hour, minute, second, matterSelected)
              }
            >
              <Ionicons name={"play"} color={"#FFF"} size={55} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.stopAndPauseBtn}
              onPress={() => {
                setPlay(false);
                deleteNotifications();
              }}
            >
              <Ionicons name={"pause"} color={"#FFF"} size={34} />
            </TouchableOpacity>
          </View>
          <View style={styles.setGoals}>
            {matterSelected !== "" &&
              (matters[matterSelected].hasOwnProperty("timeOfGoal") &&
              matters[matterSelected].timeOfGoal != "noGoal" ? (
                <Text style={styles.titleProgressBarTxt}>
                  Meta de estudo da matéria "
                  {matters[matterSelected].matter.substring(0, 16) +
                    (matters[matterSelected].matter.length > 16 ? "..." : "")}
                  "
                </Text>
              ) : (
                <Text style={styles.titleProgressBarTxt}>
                  Não há meta para a matéria "
                  {matters[matterSelected].matter.substring(0, 16) +
                    (matters[matterSelected].matter.length > 16 ? "..." : "")}
                  "
                </Text>
              ))}
            <View style={styles.progressBar}>
              <Progress.Bar
                progress={progress / 100}
                borderColor={"#000000C0"}
                color={
                  matterSelected !== ""
                    ? matters[matterSelected].color
                    : "#000000C0"
                }
                width={270}
                height={25}
                borderRadius={30}
                borderWidth={2.5}
              />
              <Text style={styles.progressBarTxt}>{progress.toFixed(0)}%</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (matterSelected !== "" && isEditable) {
                  setAddGoalVisible(true);
                } else {
                  if (isEditable) {
                    Alert.alert("Erro", "Por favor, insira uma matéria.");
                  }
                }
              }}
            >
              <Text style={styles.setGoalsTxt}>
                {matterSelected !== "" ? (
                  matters[matterSelected].hasOwnProperty("timeOfGoal") &&
                  matters[matterSelected].timeOfGoal != "noGoal" ? (
                    <Text>Alterar</Text>
                  ) : (
                    <Text>Definir</Text>
                  )
                ) : (
                  <Text>Definir</Text>
                )}{" "}
                Meta
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pomodoro}>
            <View
              style={[
                styles.pomodoroActivate,
                { backgroundColor: switchOnOrOff ? "#F5C000" : "transparent" },
              ]}
            >
              <MaterialCommunityIcons
                name={"timer-sand"}
                color={switchOnOrOff ? "#FFF" : "#000"}
                size={30}
              />
              <Text
                style={[
                  styles.pomodoroTxt,
                  { color: switchOnOrOff ? "#FFF" : "#000" },
                ]}
              >
                Técnica Pomodoro
              </Text>
              <Switch
                value={switchOnOrOff}
                onValueChange={(val) => {
                  setSwitchOnOrOff((previousState) => !previousState);
                  pomodoroMode(val, matterSelected);
                }}
                disabled={disabledSwitch}
                circleSize={25}
                barHeight={10}
                circleBorderWidth={2}
                backgroundActive={"#f4f4f4"}
                backgroundInactive={"#414141"}
                circleActiveColor={"#414141"}
                circleInActiveColor={"#e1e1e1"}
                changeValueImmediately={true}
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={3}
                switchRightPx={3}
                switchWidthMultiplier={1.5}
                switchBorderRadius={25}
              />
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </ScrollView>
  );

  function adicionaZero(number) {
    if (number <= 9) return "0" + number;
    else return number;
  }

  function convertToSeconds(hours, minutes, seconds) {
    return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
  }

  function convertToHMS(sec) {
    return new Date(sec * 1000).toISOString().slice(11, 19);
  }

  function randomNum(min, max) {
    return Math.random() * (max - min) + min;
  }

  function countdownInit(h, m, s, mat) {
    h = h.trim();
    m = m.trim();
    s = s.trim();
    if (
      mat !== "" &&
      h.length != 0 &&
      m.length != 0 &&
      s.length != 0 &&
      Number(m) < 60 &&
      Number(s) < 60 &&
      (Number(h) != 0 || Number(m) != 0 || Number(s) != 0)
    ) {
      setPlay(true);
      setIsEditable(false);
      setDisabledSwitch(true);
      if (switchOnOrOff) createPomodoroNotifications();
    } else {
      if (mat === "") {
        Alert.alert("Erro", "Por favor, insira a matéria.");
      } else {
        Alert.alert("Erro", "Por favor, insira valores válidos.");
        setHour("00");
        setMinute("00");
        setSecond("00");
      }
    }
  }

  function addToMatter(mat, elapsedTime) {
    if (matters[mat].studyTime !== undefined)
      elapsedTime += matters[mat].studyTime;

    setMatters((prevState) => {
      let i = 0;
      let newState = prevState.map((obj, index) => {
        if (obj.id === matters[mat].id) {
          i = index;
          return {
            ...obj,
            studyTime: elapsedTime,
          };
        }
        return obj;
      });

      if (newState[i].hasOwnProperty("timeOfGoal")) {
        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 3);
        if (Date.parse(newState[i].dateOfGoal) > currentDate.getTime()) {
          if (
            newState[i].studyTime - newState[i].timeInitOfGoal >=
              newState[i].timeOfGoal &&
            newState[i].timeOfGoal != "noGoal"
          ) {
            setCheck(true);

            let concludedGoal = 1;

            if (newState[i].concludedGoal !== undefined)
              concludedGoal += newState[i].concludedGoal;

            newState = newState.map((obj) => {
              if (obj.id === newState[i].id) {
                return {
                  ...obj,
                  hourGoal: "noGoal",
                  minuteGoal: "noGoal",
                  daysWeekGoal: "noGoal",
                  dateOfGoal: "noGoal",
                  timeOfGoal: "noGoal",
                  timeInitOfGoal: "noGoal",
                  concludedGoal: concludedGoal,
                };
              }
              return obj;
            });

            Vibration.vibrate(500);
          }
        } else {
          if (newState[i].timeOfGoal != "noGoal") {
            let unfinishedGoal = 1;

            if (newState[i].unfinishedGoal !== undefined)
              unfinishedGoal += newState[i].unfinishedGoal;

            newState = newState.map((obj) => {
              if (obj.id === newState[i].id) {
                return {
                  ...obj,
                  hourGoal: "noGoal",
                  minuteGoal: "noGoal",
                  daysWeekGoal: "noGoal",
                  dateOfGoal: "noGoal",
                  timeOfGoal: "noGoal",
                  timeInitOfGoal: "noGoal",
                  unfinishedGoal: unfinishedGoal,
                };
              }
              return obj;
            });
          }
        }
      }
      return newState;
    });
  }

  async function timerNotifications(mat, timeLeft) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Metade do Tempo Atingido",
        body:
          "Você atingiu a metade do tempo de estudo. Falta " +
          convertToHMS(timeLeft) +
          ' para concluir os estudos de "' +
          matters[mat].matter +
          '".',
      },
      trigger: null,
    });
  }

  function pomodoroMode(swi, mat) {
    if (mat !== "") {
      if (swi) {
        setHour("02");
        setMinute("00");
        setSecond("00");
        setIsEditable(false);
      } else {
        setIsEditable(true);
        setHour("00");
      }
    } else {
      setSwitchOnOrOff(false);
      Alert.alert("Erro", "Por favor, insira uma matéria.");
    }
  }

  async function deleteNotifications() {
    const existingNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    existingNotifications.forEach(function (item) {
      if (item.content.data.type == "countdown") {
        Notifications.cancelScheduledNotificationAsync(item.identifier);
      }
    });
  }

  async function createPomodoroNotifications() {
    let tit = "";
    let msg = "";
    let sec = 0;

    for (let i = 0; i <= 6; i++) {
      switch (i) {
        case 0:
          tit = "Fim do Primeiro Pomodori";
          msg = "Fim do primeiro pomodori, descanse por 5 minutos.";
          sec = timeRemaining - 5700;
          break;

        case 1:
          tit = "Início do Segundo Pomodori";
          msg = "Início do segundo pomodori, estude por 25 minutos";
          sec = timeRemaining - 5400;
          break;

        case 2:
          tit = "Fim do Segundo Pomodori";
          msg = "Fim do segundo pomodori, descanse por 5 minutos.";
          sec = timeRemaining - 3900;
          break;

        case 3:
          tit = "Início do Terceiro Pomodori";
          msg = "Início do terceiro pomodori, estude por 25 minutos";
          sec = timeRemaining - 3600;
          break;

        case 4:
          tit = "Fim do Terceiro Pomodori";
          msg = "Fim do Terceiro pomodori, descanse por 5 minutos.";
          sec = timeRemaining - 2100;
          break;

        case 5:
          tit = "Início do Quarto Pomodori";
          msg = "Início do Quarto pomodori, estude por 25 minutos";
          sec = timeRemaining - 1800;
          break;

        case 6:
          tit = "Fim do Pomodoro";
          msg = "Fim do pomodoro, aproveite e faça um bom descanso.";
          sec = timeRemaining - 300;
          break;
      }

      if (sec > 1) {
        await Notifications.scheduleNotificationAsync({
          content: {
            data: {
              type: "countdown",
            },
            title: tit,
            body: msg,
          },
          trigger: {
            seconds: sec,
          },
        });
      }
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert("Erro", "Permissão de envio de notificações negada");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("Função Estudar", {
        name: "Função Estudar",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
}
