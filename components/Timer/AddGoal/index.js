import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import MeterialIc from "react-native-vector-icons/MaterialIcons";
import styles from "./styles.js";
import { Context } from "../../../Context/Provider";

export default function AddGoal(props) {
  const { matters, setMatters } = useContext(Context);

  const minuteRef = useRef();

  const [hour, setHour] = useState(
    matters[props.mat].hourGoal && matters[props.mat].hourGoal != "noGoal"
      ? matters[props.mat].hourGoal
      : "00"
  );
  const [minute, setMinute] = useState(
    matters[props.mat].minuteGoal && matters[props.mat].minuteGoal != "noGoal"
      ? matters[props.mat].minuteGoal
      : "00"
  );
  const [daysWeek, setDaysWeek] = useState(
    matters[props.mat].daysWeekGoal &&
      matters[props.mat].daysWeekGoal != "noGoal"
      ? matters[props.mat].daysWeekGoal
      : 3
  );
  const [date, setDate] = useState(
    matters[props.mat].dateOfGoal && matters[props.mat].dateOfGoal != "noGoal"
      ? new Date(Date.parse(matters[props.mat].dateOfGoal))
      : new Date()
  );

  const [showDatePicker, setShowDatePicker] = useState(false);

  let dateFormated =
    adicionaZero(date.getDate().toString()) +
    "/" +
    adicionaZero(date.getMonth() + 1).toString() +
    "/" +
    date.getFullYear();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <FlashMessage position="top" />
        <Text style={[styles.title, { marginTop: 0 }]}>
          Tempo a estudar por dia (hora e minuto):
        </Text>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            onChangeText={setHour}
            textAlign="center"
            maxLength={2}
            value={hour}
            keyboardType="numeric"
            onSubmitEditing={() => {
              if (hour.length == 0 || hour.trim().length == 0) setHour("00");
              minuteRef.current.focus();
            }}
          />
          <Text style={styles.separator}> : </Text>
          <TextInput
            ref={minuteRef}
            style={styles.input}
            onChangeText={setMinute}
            textAlign="center"
            maxLength={2}
            value={minute}
            keyboardType="numeric"
            onSubmitEditing={() => {
              if (minute.length == 0 || minute.trim().length == 0)
                setMinute("00");
            }}
          />
        </View>
        <Text style={styles.title}>Data final da meta:</Text>
        <TouchableOpacity
          style={styles.calendar}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.calendarTxt}>{dateFormated}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            minimumDate={new Date()}
            maximumDate={new Date(2030, 11, 31)}
            locale="pt-BR"
            value={date}
            mode={"date"}
            onChange={(event, selectedDate) => {
              setDate(selectedDate);
              setShowDatePicker(false);
            }}
          />
        )}
        <Text style={styles.title}>
          Quantidade de dias a estudar por semana:
        </Text>
        <View style={styles.daysWeek}>
          <Text style={styles.daysWeekTxt}>{daysWeek}</Text>
          <TouchableOpacity
            style={styles.addOneBtn}
            onPress={() => setDaysWeek(daysWeek == 7 ? 1 : daysWeek + 1)}
          >
            <MeterialIc name={"add"} color={"#000000C0"} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addRemoveBtn}
            onPress={() => setDaysWeek(daysWeek == 1 ? 7 : daysWeek - 1)}
          >
            <MeterialIc name={"remove"} color={"#000000C0"} size={28} />
          </TouchableOpacity>
        </View>

        {/* Dados sobre a meta: */}
        {matters[props.mat].timeOfGoal != undefined &&
          matters[props.mat].timeOfGoal != "noGoal" && (
            <>
              <View
                style={[styles.line, { backgroundColor: dataChangeTxtColor() }]}
              />
              <View style={styles.goalData}>
                <Text
                  style={{
                    alignSelf: "center",
                    marginVertical: 3,
                    color: dataChangeTxtColor(),
                  }}
                >
                  Informações sobre a meta
                </Text>
                <Text style={{ color: dataChangeTxtColor() }}>
                  Tempo total: {totalTimeCalc(matters[props.mat].timeOfGoal)}
                </Text>
                <Text style={{ color: dataChangeTxtColor() }}>
                  Tempo até o fim:{" "}
                  {totalTimeCalc(
                    matters[props.mat].timeOfGoal -
                      ((matters[props.mat].studyTime
                        ? matters[props.mat].studyTime
                        : 0) -
                        matters[props.mat].timeInitOfGoal)
                  )}
                </Text>
                <Text
                  style={[styles.goalDataTxt, { color: dataChangeTxtColor() }]}
                >
                  Dia(s) até o fim:{" "}
                  {datediff(
                    new Date(),
                    new Date(Date.parse(matters[props.mat].dateOfGoal))
                  )}
                </Text>
              </View>
            </>
          )}

        <View style={styles.goalBtns}>
          <TouchableOpacity
            style={styles.deleteGoalBtn}
            onPress={() => deleteGoal(true)}
          >
            <MeterialIc name={"delete"} color={"#000"} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addGoalBtn}
            onPress={() => addGoal(hour, minute, daysWeek)}
          >
            <Text style={styles.addGoalBtnTxt}>Adicionar Meta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  function dataChangeTxtColor() {
    let color = "#222";

    const [day, month, year] = dateFormated.split("/");

    const dateGoal = new Date(+year, month - 1, +day, 20, 59, 59, 999);

    if (
      dateGoal.getTime() !==
        new Date(matters[props.mat].dateOfGoal).getTime() ||
      hour != matters[props.mat].hourGoal ||
      minute != matters[props.mat].minuteGoal ||
      daysWeek != matters[props.mat].daysWeekGoal
    ) {
      color = "#CCC";
    }

    return color;
  }

  function totalTimeCalc(time) {
    let day = 0;
    let msg = "";
    for (let i = 1; i <= time; i++) {
      if (i % 86400 == 0) day++;
    }
    day == 0
      ? (msg = convertToHMS(time))
      : (msg = day + " dia(s) e " + convertToHMS(time));

    return msg;
  }

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  function convertToHMS(sec) {
    return new Date(sec * 1000).toISOString().slice(11, 19);
  }

  function adicionaZero(number) {
    if (number <= 9) return "0" + number;
    else return number;
  }

  function getWeeksDiff(startDate, endDate) {
    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    return Math.round(Math.abs(endDate - startDate) / msInWeek);
  }

  function convertToSeconds(hours, minutes, seconds) {
    return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
  }

  function deleteGoal(clean) {
    let foundGoal = matters.some((el) => el.timeOfGoal !== undefined);
    if (foundGoal) {
      if (matters[props.mat].timeOfGoal != "noGoal") {
        if (clean) {
          Alert.alert(
            "Criar meta",
            "Tem certeza que deseja excluir esta meta?",
            [
              {
                text: "Não",
              },
              {
                text: "Sim",
                onPress: () => {
                  let unfinishedGoal = 1;

                  if (matters[props.mat].unfinishedGoal !== undefined)
                    unfinishedGoal += matters[props.mat].unfinishedGoal;

                  setMatters((prevState) => {
                    const newState = prevState.map((obj) => {
                      if (obj.id === matters[props.mat].id) {
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
                  setHour("00");
                  setMinute("00");
                  setDaysWeek(3);
                  setDate(new Date());
                },
              },
            ]
          );
        } else {
          let unfinishedGoal = 1;

          if (matters[props.mat].unfinishedGoal !== undefined)
            unfinishedGoal += matters[props.mat].unfinishedGoal;

          setMatters((prevState) => {
            const newState = prevState.map((obj) => {
              if (obj.id === matters[props.mat].id) {
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
  }

  function addGoal(h, m) {
    h = h.trim();
    m = m.trim();

    if (
      h.length != 0 &&
      m.length != 0 &&
      Number(h) < 25 &&
      Number(m) < 60 &&
      (Number(h) != 0 || Number(m) != 0)
    ) {
      Alert.alert(
        "Criar meta",
        "Criar meta de estudar " +
          h +
          ":" +
          m +
          " por dia até a data " +
          dateFormated +
          ", " +
          daysWeek +
          " dia(s) por semana. Uma vez criada a meta, caso você a altere ou a exclua, ela será atribuída como uma meta inconcluída.",
        [
          {
            text: "Não",
          },
          {
            text: "Sim",
            onPress: () => {
              if (
                matters[props.mat].timeOfGoal !== undefined &&
                matters[props.mat].timeOfGoal != "noGoal"
              ) {
                deleteGoal(false);
              }

              const [day, month, year] = dateFormated.split("/");

              const dateGoal = new Date(
                +year,
                month - 1,
                +day,
                20,
                59,
                59,
                999
              );

              setMatters((prevState) => {
                const newState = prevState.map((obj) => {
                  if (obj.id === matters[props.mat].id) {
                    return {
                      ...obj,
                      hourGoal: h,
                      minuteGoal: m,
                      daysWeekGoal: daysWeek,
                      dateOfGoal: dateGoal,
                      timeOfGoal:
                        convertToSeconds(h, m, 0) *
                        ((getWeeksDiff(new Date(), dateGoal) + 1) * daysWeek),
                      timeInitOfGoal: matters[props.mat].studyTime
                        ? matters[props.mat].studyTime
                        : 0,
                    };
                  }
                  return obj;
                });
                return newState;
              });

              showMessage({
                message: "Meta adicionada com sucesso",
                type: "success",
                duration: 1200,
              });
            },
          },
        ]
      );
    } else {
      setHour("00");
      setMinute("00");
      Alert.alert("Erro", "Por favor, insira valores válidos.");
    }
  }
}
