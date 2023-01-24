import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Linking,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Notifications from "expo-notifications";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authentication, db } from "../../Firebase";
import { signOut, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { Context } from "../../Context/Provider";
import styles from "./styles.js";

export default function Settings(props) {
  const {
    setSeg,
    setTer,
    setQua,
    setQui,
    setSex,
    setSab,
    setDom,
    idUser,
    setTasks,
    setIdUser,
    setMatters,
    setIsLogged,
    setCompletedTasks,
    notificationPriorities,
    setNotificationPriorities,
  } = useContext(Context);

  const [showTimePicker, setShowTimePicker] = useState(false);

  const [daysPriorityOne, setDaysPriorityOne] = useState(
    notificationPriorities[0].daysBeforeDate
  );
  const [daysPriorityTwo, setDaysPriorityTwo] = useState(
    notificationPriorities[1].daysBeforeDate
  );
  const [daysPriorityThree, setDaysPriorityThree] = useState(
    notificationPriorities[2].daysBeforeDate
  );

  const [frequencyPriorityOne, setFrequencyPriorityOne] = useState(
    notificationPriorities[0].frequency
  );
  const [frequencyPriorityTwo, setFrequencyPriorityTwo] = useState(
    notificationPriorities[1].frequency
  );
  const [frequencyPriorityThree, setFrequencyPriorityThree] = useState(
    notificationPriorities[2].frequency
  );

  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingRemoveAccount, setLoadingRemoveAccount] = useState(false);

  var today = new Date();
  const [time, setTime] = useState(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      notificationPriorities[0].time.split(":")[0],
      notificationPriorities[0].time.split(":")[1],
      0
    )
  );

  const [timeFormated, setTimeFormated] = useState(
    adicionaZero(time.getHours()) + ":" + adicionaZero(time.getMinutes())
  );

  useEffect(() => {
    setTimeFormated(
      adicionaZero(time.getHours()) + ":" + adicionaZero(time.getMinutes())
    );
  }, [time]);

  let isSaved = true;

  if (
    daysPriorityOne != notificationPriorities[0].daysBeforeDate ||
    daysPriorityTwo != notificationPriorities[1].daysBeforeDate ||
    daysPriorityThree != notificationPriorities[2].daysBeforeDate ||
    frequencyPriorityOne != notificationPriorities[0].frequency ||
    frequencyPriorityTwo != notificationPriorities[1].frequency ||
    frequencyPriorityThree != notificationPriorities[2].frequency ||
    timeFormated != notificationPriorities[0].time
  ) {
    isSaved = false;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0069E0" />
      {showTimePicker && (
        <DateTimePicker
          locale="pt-BR"
          value={time}
          mode={"time"}
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            setTime(selectedDate);
          }}
        />
      )}
      <View style={styles.cells}>
        <Text style={styles.priority}>Prioridade Alta</Text>
        <View style={styles.textInput}>
          <Text>Dias: </Text>
          <Text>{daysPriorityOne}</Text>
          <TouchableOpacity
            style={[styles.addRemoveBtn, styles.addOneBtn]}
            onPress={() =>
              setDaysPriorityOne(
                daysPriorityOne < 180
                  ? daysPriorityOne + 1
                  : daysPriorityOne + 0
              )
            }
          >
            <MaterialIcons name={"add"} color={"#FFF"} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addRemoveBtn}
            onPress={() =>
              setDaysPriorityOne(
                daysPriorityOne > frequencyPriorityOne && daysPriorityOne > 1
                  ? daysPriorityOne - 1
                  : daysPriorityOne + 0
              )
            }
          >
            <MaterialIcons name={"remove"} color={"#FFF"} size={28} />
          </TouchableOpacity>
          <Text style={styles.frequencyTxt}>Frequência: </Text>
          <Text>{frequencyPriorityOne}</Text>
          <TouchableOpacity
            style={[styles.addRemoveBtn, styles.addOneBtn]}
            onPress={() =>
              setFrequencyPriorityOne(
                frequencyPriorityOne < daysPriorityOne
                  ? frequencyPriorityOne + 1
                  : 0
              )
            }
          >
            <MaterialIcons name={"add"} color={"#FFF"} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addRemoveBtn}
            onPress={() =>
              setFrequencyPriorityOne(
                frequencyPriorityOne > 0
                  ? frequencyPriorityOne - 1
                  : daysPriorityOne
              )
            }
          >
            <MaterialIcons name={"remove"} color={"#FFF"} size={28} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textInfo}>
          Os lembretes serão enviados {daysPriorityOne} dia(s) antes da data de
          entrega da tarefa
          {frequencyPriorityOne > 0 && (
            <Text>
              {" "}
              e ocorrerão de {frequencyPriorityOne} em {frequencyPriorityOne}{" "}
              dia(s)
            </Text>
          )}
          , às {timeFormated}.
        </Text>
      </View>
      {
        <View style={[styles.cells, { marginVertical: 8 }]}>
          <Text style={styles.priority}>Prioridade Média</Text>
          <View style={styles.textInput}>
            <Text>Dias: </Text>
            <Text>{daysPriorityTwo}</Text>
            <TouchableOpacity
              style={[styles.addRemoveBtn, styles.addOneBtn]}
              onPress={() =>
                setDaysPriorityTwo(
                  daysPriorityTwo < 120
                    ? daysPriorityTwo + 1
                    : daysPriorityTwo + 0
                )
              }
            >
              <MaterialIcons name={"add"} color={"#FFF"} size={28} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addRemoveBtn}
              onPress={() =>
                setDaysPriorityTwo(
                  daysPriorityTwo > frequencyPriorityTwo && daysPriorityTwo > 1
                    ? daysPriorityTwo - 1
                    : daysPriorityTwo + 0
                )
              }
            >
              <MaterialIcons name={"remove"} color={"#FFF"} size={28} />
            </TouchableOpacity>
            <Text style={styles.frequencyTxt}>Frequência: </Text>
            <Text>{frequencyPriorityTwo}</Text>
            <TouchableOpacity
              style={[styles.addRemoveBtn, styles.addOneBtn]}
              onPress={() =>
                setFrequencyPriorityTwo(
                  frequencyPriorityTwo < daysPriorityTwo
                    ? frequencyPriorityTwo + 1
                    : 0
                )
              }
            >
              <MaterialIcons name={"add"} color={"#FFF"} size={28} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addRemoveBtn}
              onPress={() =>
                setFrequencyPriorityTwo(
                  frequencyPriorityTwo > 0
                    ? frequencyPriorityTwo - 1
                    : daysPriorityTwo
                )
              }
            >
              <MaterialIcons name={"remove"} color={"#FFF"} size={28} />
            </TouchableOpacity>
          </View>
          <Text style={styles.textInfo}>
            Os lembretes serão enviados {daysPriorityTwo} dia(s) antes da data
            de entrega da tarefa
            {frequencyPriorityTwo > 0 && (
              <Text>
                {" "}
                e ocorrerão de {frequencyPriorityTwo} em {frequencyPriorityTwo}{" "}
                dia(s)
              </Text>
            )}
            , às {timeFormated}.
          </Text>
        </View>
      }
      <View style={styles.cells}>
        <Text style={styles.priority}>Prioridade Baixa</Text>
        <View style={styles.textInput}>
          <Text>Dias: </Text>
          <Text>{daysPriorityThree}</Text>
          <TouchableOpacity
            style={[styles.addRemoveBtn, styles.addOneBtn]}
            onPress={() =>
              setDaysPriorityThree(
                daysPriorityThree < 60
                  ? daysPriorityThree + 1
                  : daysPriorityThree + 0
              )
            }
          >
            <MaterialIcons name={"add"} color={"#FFF"} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addRemoveBtn}
            onPress={() =>
              setDaysPriorityThree(
                daysPriorityThree > frequencyPriorityThree &&
                  daysPriorityThree > 1
                  ? daysPriorityThree - 1
                  : daysPriorityThree + 0
              )
            }
          >
            <MaterialIcons name={"remove"} color={"#FFF"} size={28} />
          </TouchableOpacity>
          <Text style={styles.frequencyTxt}>Frequência: </Text>
          <Text>{frequencyPriorityThree}</Text>
          <TouchableOpacity
            style={[styles.addRemoveBtn, styles.addOneBtn]}
            onPress={() =>
              setFrequencyPriorityThree(
                frequencyPriorityThree < daysPriorityThree
                  ? frequencyPriorityThree + 1
                  : 0
              )
            }
          >
            <MaterialIcons name={"add"} color={"#FFF"} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addRemoveBtn}
            onPress={() =>
              setFrequencyPriorityThree(
                frequencyPriorityThree > 0
                  ? frequencyPriorityThree - 1
                  : daysPriorityThree
              )
            }
          >
            <MaterialIcons name={"remove"} color={"#FFF"} size={28} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textInfo}>
          Os lembretes serão enviados {daysPriorityThree} dia(s) antes da data
          de entrega da tarefa
          {frequencyPriorityThree > 0 && (
            <Text>
              {" "}
              e ocorrerão de {frequencyPriorityThree} em{" "}
              {frequencyPriorityThree} dia(s)
            </Text>
          )}
          , às {timeFormated}.
        </Text>
      </View>
      <View style={styles.timeAndEdit}>
        <View style={styles.time}>
          <TouchableOpacity
            style={styles.calendar}
            onPress={() => setShowTimePicker(true)}
          >
            <View style={styles.calendarBtn}>
              <Text style={styles.calendarTxt}>{timeFormated}</Text>
            </View>
            <MaterialCommunityIcon name={"clock"} color={"#fff"} size={25} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            changePriorities(
              daysPriorityOne,
              daysPriorityTwo,
              daysPriorityThree,
              frequencyPriorityOne,
              frequencyPriorityTwo,
              frequencyPriorityThree,
              timeFormated
            )
          }
        >
          <Text style={styles.txtBtnSave}>Salvar</Text>
        </TouchableOpacity>
      </View>
      {!isSaved && (
        <Text style={{ color: "#00000080" }}>
          As alterações não foram salvas.
        </Text>
      )}

      {/* Botões negativos: */}
      <View style={styles.negativesBtns}>
        <View style={styles.mostNegativesBtns}>
          <TouchableOpacity
            style={[styles.negativeBtn, { borderTopLeftRadius: 8 }]}
            onPress={() => resetCharts()}
          >
            <MaterialIcons
              style={styles.negativeIcon}
              name={"loop"}
              color={"#F00"}
              size={28}
            />
            <Text style={styles.negativeTxt}>Resetar Gráficos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.negativeBtn, { marginVertical: 3 }]}
            onPress={() => clearData()}
          >
            <MaterialCommunityIcon
              style={styles.negativeIcon}
              name={"database-remove"}
              color={"#F00"}
              size={28}
            />
            <Text style={styles.negativeTxt}>Limpar dados</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.negativeBtn, { borderBottomLeftRadius: 8 }]}
            disabled={loadingRemoveAccount}
            onPress={() => deleteAccount()}
          >
            {loadingRemoveAccount ? (
              <ActivityIndicator
                style={{ marginLeft: 10 }}
                size="large"
                color="#F00"
              />
            ) : (
              <MaterialCommunityIcon
                style={styles.negativeIcon}
                name={"account-remove-outline"}
                color={"#F00"}
                size={28}
              />
            )}
            <Text style={styles.negativeTxt}>Apagar conta</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logoutBtn}
          disabled={loadingLogout}
          onPress={() => leaveAccount()}
        >
          <MaterialCommunityIcon name={"logout"} color={"#FFF"} size={35} />
          {loadingLogout ? (
            <ActivityIndicator
              style={{ marginLeft: 10 }}
              size="large"
              color="#FFF"
            />
          ) : (
            <Text style={styles.logoutTxt}>Sair da conta</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.siteBtn}
        onPress={() =>
          Linking.openURL("https://sites.google.com/view/iscool").catch(
            (err) => {
              console.error("Couldn't load page", err);
              Alert.alert("Erro", err);
            }
          )
        }
      >
        <View style={styles.siteBox}>
          <Text style={styles.siteTxt}>Acesse o nosso site!</Text>
          <MaterialCommunityIcon
            style={{ marginTop: 3 }}
            name={"web"}
            color={"#444"}
            size={21}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  function leaveAccount() {
    setLoadingLogout(true);

    signOut(authentication)
      .then(async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setLoadingLogout(false);
        setIdUser("");
        setIsLogged(false);

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

        setMatters([]);

        setSeg([]);
        setTer([]);
        setQua([]);
        setQui([]);
        setSex([]);
        setSab([]);
        setDom([]);

        setTasks([]);

        setCompletedTasks([]);

        setNotificationPriorities([
          {
            priority: 1,
            daysBeforeDate: 10,
            frequency: 3,
            time: "15:00",
          },
          {
            priority: 2,
            daysBeforeDate: 5,
            frequency: 2,
            time: "15:00",
          },
          {
            priority: 3,
            daysBeforeDate: 1,
            frequency: 0,
            time: "15:00",
          },
        ]);

        setDaysPriorityOne(10);
        setDaysPriorityTwo(5);
        setDaysPriorityThree(1);
        setFrequencyPriorityOne(3);
        setFrequencyPriorityTwo(2);
        setFrequencyPriorityThree(0);
        setTimeFormated("15:00");

        let currentDate = new Date();
        setTime(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            "15",
            "00",
            0
          )
        );

        props.navigation.navigate("Login");
      })
      .catch((error) => {
        setLoadingLogout(false);
        console.log(error.code);
        Alert.alert("Erro", error.message);
      });
  }

  function clearData() {
    Alert.alert(
      "Limpar dados",
      "Você tem certeza que deseja remover todos os dados vinculados à sua conta?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setMatters([]);

            setSeg([]);
            setTer([]);
            setQua([]);
            setQui([]);
            setSex([]);
            setSab([]);
            setDom([]);

            setTasks([]);

            setCompletedTasks([]);

            setNotificationPriorities([
              {
                priority: 1,
                daysBeforeDate: 10,
                frequency: 3,
                time: "15:00",
              },
              {
                priority: 2,
                daysBeforeDate: 5,
                frequency: 2,
                time: "15:00",
              },
              {
                priority: 3,
                daysBeforeDate: 1,
                frequency: 0,
                time: "15:00",
              },
            ]);

            setDaysPriorityOne(10);
            setDaysPriorityTwo(5);
            setDaysPriorityThree(1);
            setFrequencyPriorityOne(3);
            setFrequencyPriorityTwo(2);
            setFrequencyPriorityThree(0);
            setTimeFormated("15:00");

            let currentDate = new Date();
            setTime(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate(),
                "15",
                "00",
                0
              )
            );
          },
        },
      ]
    );
  }

  function resetCharts() {
    Alert.alert(
      "Resetar gráficos",
      "Você tem certeza que deseja resetar os gráficos?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setCompletedTasks([]);

            setMatters((prevState) => {
              const newState = prevState.map((matter) => {
                if (matter.concludedGoal !== undefined) {
                  let matterCopy = matter;
                  delete matterCopy.concludedGoal;
                  return matterCopy;
                }
                return matter;
              });
              return newState;
            });

            setMatters((prevState) => {
              const newState = prevState.map((matter) => {
                if (matter.unfinishedGoal !== undefined) {
                  let matterCopy = matter;
                  delete matterCopy.unfinishedGoal;
                  return matterCopy;
                }
                return matter;
              });
              return newState;
            });

            setMatters((prevState) => {
              const newState = prevState.map((matter) => {
                if (matter.studyTime !== undefined) {
                  return { ...matter, studyTime: 0 };
                }
                return matter;
              });
              return newState;
            });
          },
        },
      ]
    );
  }

  function deleteAccount() {
    Alert.alert(
      "Deletar conta",
      "Você tem certeza que deseja remover sua conta?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setLoadingRemoveAccount(true);

            deleteUser(authentication.currentUser)
              .then(async function () {
                setIdUser("");
                await Notifications.cancelAllScheduledNotificationsAsync();
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
                await deleteDoc(doc(db, idUser, "matters"));
                await deleteDoc(doc(db, idUser, "tasks"));
                await deleteDoc(doc(db, idUser, "completedTasks"));
                await deleteDoc(doc(db, idUser, "notificationPriorities"));
                await deleteDoc(doc(db, idUser, "seg"));
                await deleteDoc(doc(db, idUser, "ter"));
                await deleteDoc(doc(db, idUser, "qua"));
                await deleteDoc(doc(db, idUser, "qui"));
                await deleteDoc(doc(db, idUser, "sex"));
                await deleteDoc(doc(db, idUser, "sab"));
                await deleteDoc(doc(db, idUser, "dom"));

                setMatters([]);

                setSeg([]);
                setTer([]);
                setQua([]);
                setQui([]);
                setSex([]);
                setSab([]);
                setDom([]);

                setTasks([]);

                setCompletedTasks([]);

                setNotificationPriorities([
                  {
                    priority: 1,
                    daysBeforeDate: 10,
                    frequency: 3,
                    time: "15:00",
                  },
                  {
                    priority: 2,
                    daysBeforeDate: 5,
                    frequency: 2,
                    time: "15:00",
                  },
                  {
                    priority: 3,
                    daysBeforeDate: 1,
                    frequency: 0,
                    time: "15:00",
                  },
                ]);

                setDaysPriorityOne(10);
                setDaysPriorityTwo(5);
                setDaysPriorityThree(1);
                setFrequencyPriorityOne(3);
                setFrequencyPriorityTwo(2);
                setFrequencyPriorityThree(0);
                setTimeFormated("15:00");

                let currentDate = new Date();
                setTime(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    "15",
                    "00",
                    0
                  )
                );

                setIsLogged(false);
                setLoadingRemoveAccount(false);
                props.navigation.navigate("Login");
              })
              .catch((error) => {
                setLoadingRemoveAccount(false);

                if (error.code === "auth/requires-recent-login") {
                  Alert.alert(
                    "Erro",
                    "É necessário que você tenha se logado recentemente para remover sua conta. Por favor, faça logout e login para que seja possível concluir a ação."
                  );
                } else {
                  console.log(error.code);
                  Alert.alert("Erro", error.message);
                }
              });
          },
        },
      ]
    );
  }

  function changePriorities(dpo, dpt, dpte, fpo, fpt, fpte, time) {
    setNotificationPriorities((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.priority === 1) {
          return {
            ...obj,
            daysBeforeDate: dpo,
            frequency: fpo,
            time: time,
          };
        }
        return obj;
      });
      return newState;
    });

    setNotificationPriorities((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.priority === 2) {
          return {
            ...obj,
            daysBeforeDate: dpt,
            frequency: fpt,
            time: time,
          };
        }
        return obj;
      });
      return newState;
    });

    setNotificationPriorities((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.priority === 3) {
          return {
            ...obj,
            daysBeforeDate: dpte,
            frequency: fpte,
            time: time,
          };
        }
        return obj;
      });
      return newState;
    });
  }

  function adicionaZero(number) {
    if (number <= 9) return "0" + number;
    else return number;
  }
}
