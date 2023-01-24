import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  Vibration,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MeterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MeterialIc from "react-native-vector-icons/MaterialIcons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles.js";
import * as Notifications from "expo-notifications";
import { Context } from "../../../../Context/Provider";

export default function EditDeleteTask(props) {
  const {
    matters,
    setTasks,
    tasks,
    notificationPriorities,
    setEditDeleteTaskVisible,
    setCompletedTasks,
    setAnimation,
  } = useContext(Context);

  const [task, setTask] = useState(tasks.find((tas) => tas.id == props.id));

  useEffect(() => {
    setTask(tasks.find((tas) => tas.id == props.id));
  }, [tasks]);

  const dateParts = task.date.split("/");
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  const [switchOnOrOff, setSwitchOnOrOff] = useState(
    task.priority == "disabled" ? false : true
  );
  const [prioritySelected, setPrioritySelected] = useState(
    task.priority == "disabled"
      ? ""
      : notificationPriorities[task.priority - 1].priority
  );
  const [matterSelected, setMatterSelected] = useState(task.id);
  const [taskName, setTaskName] = useState(task.task);
  const [date, setDate] = useState(dateObject);
  const [show, setShow] = useState(false);
  const [taskDescription, setTaskDescription] = useState(task.description);

  function adicionaZero(number) {
    if (number <= 9) return "0" + number;
    else return number;
  }

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
        maxLength={50}
      />
      <TouchableOpacity style={styles.calendar} onPress={() => setShow(true)}>
        <Text style={styles.calendarTxt}>{dateFormated}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          minimumDate={new Date()}
          maximumDate={new Date(2030, 11, 31)}
          locale="pt-BR"
          value={date}
          mode={"date"}
          onChange={(event, selectedDate) => {
            setShow(false);
            setDate(selectedDate);
          }}
        />
      )}
      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          style={styles.picker}
          selectedValue={matterSelected}
          onValueChange={(itemValor) => setMatterSelected(itemValor)}
        >
          <Picker.Item label={task.matter} value={task.id} key={task.id} />
          {matters
            .sort((a, b) => (a.matter > b.matter ? 1 : -1))
            .map((item) => {
              return (
                item.matter != task.matter && (
                  <Picker.Item
                    label={item.matter}
                    value={item.id}
                    key={item.id}
                  />
                )
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
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#F5C000" }}
          thumbColor={switchOnOrOff ? "#FFDA1F" : "#f4f3f4"}
          value={switchOnOrOff}
          onValueChange={(switchValue) =>
            setSwitchOnOrOff((previousState) => !previousState)
          }
        />
      </View>
      {prioritySelected != "" && switchOnOrOff && (
        <Text
          style={[
            styles.infoPriority,
            { marginBottom: task.priority != "disabled" ? 0 : 5 },
          ]}
        >
          Nova configuração: Os lembretes serão enviados{" "}
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
      {task.priority != "disabled" && <View style={styles.borderTxts} />}
      {task.priority != "disabled" && (
        <Text style={styles.infoPriority}>
          Configuração original: Os lembretes serão enviados{" "}
          {task.daysBeforeNotification} dia(s) antes da data de entrega da
          tarefa
          {task.frequencyNotification > 0 && (
            <Text>
              {" "}
              e ocorrerão de {task.frequencyNotification} em{" "}
              {task.frequencyNotification} dia(s)
            </Text>
          )}
          , às {task.timeNotification}.
        </Text>
      )}

      <View style={styles.deleteEditCompleteBtn}>
        <TouchableOpacity
          style={styles.deleteBtnTask}
          onPress={() => deleteTask()}
        >
          <MeterialIcons name={"delete"} color={"#000"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtnTask}
          onPress={() =>
            editTask(
              taskName,
              matterSelected,
              dateFormated,
              taskDescription,
              prioritySelected
            )
          }
        >
          <Text style={styles.editBtnTxt}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.completeBtnTask}
          onPress={() => completeTask()}
        >
          <MeterialIcons name={"check"} color={"#000"} size={33} />
        </TouchableOpacity>
      </View>
    </View>
  );

  function deleteTask() {
    Alert.alert(
      'Excluir "' + task.task + '"',
      'Você tem certeza que deseja excluir a tarefa "' + task.task + '"?',
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks((current) =>
              current.filter((employee) => {
                return employee.id !== props.id;
              })
            );

            deleteNotifications();

            setEditDeleteTaskVisible(false);
          },
        },
      ]
    );
  }

  function completeTask() {
    Alert.alert(
      'Concluir "' + task.task + '"',
      'Você tem certeza que deseja marcar como concluída a tarefa "' +
        task.task +
        '"?',
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            let currentDay = new Date();
            currentDay.setHours(currentDay.getHours() - 3);
            currentDay.setUTCHours(0, 0, 0, 0);

            let dateFormated2 =
              adicionaZero(currentDay.getDate() + 1).toString() +
              "/" +
              adicionaZero(currentDay.getMonth() + 1).toString() +
              "/" +
              currentDay.getFullYear();

            setCompletedTasks((current) => [
              ...current,
              {
                id: props.id,
                date: task.date,
                concludedDate: dateFormated2,
                task: task.task,
                matter: task.matter,
                matterColor: task.matterColor,
              },
            ]);

            setTasks((current) =>
              current.filter((employee) => {
                return employee.id !== props.id;
              })
            );

            deleteNotifications();

            setEditDeleteTaskVisible(false);

            Vibration.vibrate(100);

            setAnimation(true);
          },
        },
      ]
    );
  }

  async function deleteNotifications() {
    const existingNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    existingNotifications.forEach(function (item) {
      if (item.content.data.idTask == task.id) {
        Notifications.cancelScheduledNotificationAsync(item.identifier);
      }
    });
  }

  async function editTask(tas, mat, dat, des, pri) {
    if (!switchOnOrOff) pri = "disabled";

    let foundTask = false;

    des = des.trim();
    if (des !== "") des = des[0].toUpperCase() + des.substr(1);

    if (!(tas.length === 0 || !tas.trim() || mat === "" || pri === "")) {
      tas = tas.trim();
      tas = tas[0].toUpperCase() + tas.substr(1);

      if (
        !(task.date != dat && tas == task.task) &&
        !(mat != task.id && tas == task.task) &&
        !(task.description != des && tas == task.task) &&
        !(task.priority != pri && tas == task.task)
      ) {
        let matter =
          mat === task.id
            ? matters.find((el) => el.matter === task.matter)
            : matters.find((el) => el.id === mat);

        tasks.forEach((item) => {
          if (item.matter == matter.matter && item.task === tas)
            foundTask = true;
        });
      }
    }

    if (
      !(
        tas.length === 0 ||
        !tas.trim() ||
        mat === "" ||
        foundTask ||
        pri === ""
      )
    ) {
      let selectedMatter = "";
      let colorMatter = "";

      if (mat === task.id) {
        selectedMatter = task.matter;
        colorMatter = task.matterColor;
      } else {
        const matt = matters.find((ma) => ma.id == mat);
        selectedMatter = matt.matter;
        colorMatter = matt.color;
      }

      setTasks((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.id === props.id) {
            return {
              ...obj,
              task: tas,
              date: dat,
              matter: selectedMatter,
              description: des,
              matterColor: colorMatter,
              priority: pri,
            };
          }
          return obj;
        });
        return newState;
      });

      if (!switchOnOrOff) deleteNotifications();

      if (switchOnOrOff) {
        deleteNotifications();

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
                  idTask: task.id,
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

      showMessage({
        message: "Tarefa alterada com sucesso",
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
