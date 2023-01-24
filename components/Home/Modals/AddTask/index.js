import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import MeterialIc from "react-native-vector-icons/MaterialIcons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles.js";
import { Context } from "../../../../Context/Provider";

export default function AddTask() {
  const { matters, setTasks, tasks, notificationPriorities } =
    useContext(Context);

  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [matterSelected, setMatterSelected] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [switchOnOrOff, setSwitchOnOrOff] = useState(false);
  const [prioritySelected, setPrioritySelected] = useState("");

  let dateFormated =
    adicionaZero(date.getDate().toString()) +
    "/" +
    adicionaZero(date.getMonth() + 1).toString() +
    "/" +
    date.getFullYear();

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <TextInput
        style={styles.input}
        onChangeText={setTaskName}
        value={taskName}
        placeholder="Tarefa"
        autoFocus={true}
        maxLength={50}
        onSubmitEditing={() => setShowDatePicker(true)}
      />
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
            setShowDatePicker(false);
            setDate(selectedDate);
          }}
        />
      )}
      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          selectedValue={matterSelected}
          style={styles.picker}
          onValueChange={(itemValor) => setMatterSelected(itemValor)}
        >
          <Picker.Item
            style={{ color: "#00000055" }}
            label="Escolha a matéria"
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

      {/* Descrição da atividade */}
      <TextInput
        style={styles.inputDescription}
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder="Descrição"
        maxLength={250}
        multiline
      />

      {/* Seletor de prioridade  */}
      <View
        style={[
          styles.notifications,
          { borderColor: switchOnOrOff ? "#F5C000" : "#00000020" },
        ]}
      >
        <View
          style={[
            styles.bellIcon,
            { backgroundColor: switchOnOrOff ? "#F5C000" : "#00000020" },
          ]}
        >
          <MeterialIc
            name={switchOnOrOff ? "notifications-active" : "notifications"}
            color={"#fff"}
            size={23}
          />
        </View>
        <View>
          <Picker
            mode="dropdown"
            enabled={switchOnOrOff}
            selectedValue={prioritySelected}
            style={[
              styles.pickerNotification,
              { color: switchOnOrOff ? "#000" : "#00000020" },
            ]}
            onValueChange={(itemValor) => setPrioritySelected(itemValor)}
          >
            <Picker.Item label="Prioridade: " value="" />
            <Picker.Item
              label={"Alta"}
              value={notificationPriorities[0].priority}
            />
            <Picker.Item
              label={"Média"}
              value={notificationPriorities[1].priority}
            />
            <Picker.Item
              label={"Baixa"}
              value={notificationPriorities[2].priority}
            />
          </Picker>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#F5C000" }}
          thumbColor={switchOnOrOff ? "#FFDA1F" : "#f4f3f4"}
          value={switchOnOrOff}
          onValueChange={(switchValue) =>
            setSwitchOnOrOff((previousState) => !previousState)
          }
        />
      </View>
      {prioritySelected != "" && switchOnOrOff && (
        <Text style={styles.infoPriority}>
          Os lembretes serão enviados{" "}
          {notificationPriorities[prioritySelected - 1].daysBeforeDate} dia(s)
          antes da data de entrega da tarefa
          {notificationPriorities[prioritySelected - 1].frequency > 0 && (
            <Text>
              {" "}
              e ocorrerão de{" "}
              {notificationPriorities[prioritySelected - 1].frequency} em{" "}
              {notificationPriorities[prioritySelected - 1].frequency} dia(s)
            </Text>
          )}
          , às {notificationPriorities[prioritySelected - 1].time}.
        </Text>
      )}
      <TouchableOpacity
        style={styles.addBtnTask}
        onPress={() =>
          addTask(
            taskName,
            matterSelected,
            dateFormated,
            taskDescription,
            prioritySelected
          )
        }
      >
        <Text style={styles.addBtnTxt}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );

  function adicionaZero(number) {
    if (number <= 9) return "0" + number;
    else return number;
  }

  async function addTask(tas, mat, dat, des, pri) {
    let foundTask = false;

    if (!switchOnOrOff) pri = "disabled";

    if (
      !(tas.length === 0 || !tas.trim() || mat === "" || pri === "") &&
      tasks
    ) {
      tas = tas.trim();
      tas = tas[0].toUpperCase() + tas.substr(1);

      tasks.forEach((item) => {
        if (item.matter == matters[mat].matter && item.task === tas) {
          foundTask = true;
        }
      });
    }

    if (
      !(
        tas.length === 0 ||
        !tas.trim() ||
        mat === "" ||
        pri === "" ||
        foundTask
      )
    ) {
      des = des.trim();
      if (des !== "") des = des[0].toUpperCase() + des.substr(1);

      let idTask = Math.floor(Date.now() * Math.random());

      setTasks((current) => [
        ...current,
        {
          id: idTask,
          task: tas,
          date: dat,
          description: des,
          matter: matters[mat].matter,
          matterColor: matters[mat].color,
          priority: pri == "disabled" ? "disabled" : pri,
          timeNotification:
            pri == "disabled"
              ? "disabled"
              : notificationPriorities[prioritySelected - 1].time,
          daysBeforeNotification:
            pri == "disabled"
              ? "disabled"
              : notificationPriorities[prioritySelected - 1].daysBeforeDate,
          frequencyNotification:
            pri == "disabled"
              ? "disabled"
              : notificationPriorities[prioritySelected - 1].frequency,
        },
      ]);

      if (switchOnOrOff) {
        let dateStringDelivery =
          dat + " " + notificationPriorities[pri - 1].time;
        let [dia, mes, ano, hora, minuto] = dateStringDelivery
          .split(/[\/: ]/)
          .map((v) => parseInt(v));
        let dateIosDelivery = new Date(ano, mes - 1, dia, hora, minuto);

        let dateIosBeforDelivey = new Date(dateIosDelivery);
        dateIosBeforDelivey.setDate(
          dateIosBeforDelivey.getDate() -
            notificationPriorities[pri - 1].daysBeforeDate
        );

        const currentDate = new Date();
        currentDate.setHours(
          dateIosDelivery.getHours(),
          dateIosDelivery.getMinutes(),
          0,
          0
        );

        const currentDateTime = new Date();

        let adder = notificationPriorities[pri - 1].frequency;
        if (!adder) adder = notificationPriorities[pri - 1].daysBeforeDate;

        for (
          let i = 0;
          i <= notificationPriorities[pri - 1].daysBeforeDate;
          i += adder
        ) {
          if (
            pri != "disabled" &&
            getDatesInRange(dateIosBeforDelivey, dateIosDelivery)[i].getTime() >
              currentDateTime.getTime()
          ) {
            await Notifications.scheduleNotificationAsync({
              content: {
                data: {
                  idTask: idTask,
                  priority: pri,
                },
                title: "Lembrete de tarefa",
                body:
                  'A tarefa "' +
                  tas +
                  '" cuja entrega é em ' +
                  dat +
                  " ainda está pendente.",
              },
              trigger: {
                seconds: getSecondsDiff(
                  getDatesInRange(dateIosBeforDelivey, dateIosDelivery)[i],
                  currentDateTime
                ),
              },
            });
          }
        }
      }

      setTaskName("");
      setDate(new Date());
      setMatterSelected("");
      setTaskDescription("");
      setSwitchOnOrOff(false);
      setPrioritySelected("");

      showMessage({
        message: "Tarefa adicionada com sucesso",
        type: "success",
        duration: 1500,
      });
    } else {
      if (foundTask) {
        Alert.alert(
          "Erro",
          "Este nome de tarefa já existe, por favor insira um novo."
        );
      } else {
        Alert.alert(
          "Erro",
          "Por favor, preencha todos os campos corretamente."
        );
      }
    }
  }

  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  function getSecondsDiff(startDate, endDate) {
    const msInSecond = 1000;

    return Math.round(
      Math.abs(endDate.getTime() - startDate.getTime()) / msInSecond
    );
  }
}
