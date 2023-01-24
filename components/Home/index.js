import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles.js";
import CompleteGrid from "./Modals/CompleteGrid";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { authentication } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LottieView from "lottie-react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddTask from "./Modals/AddTask";
import EditDeleteMatter from "./Modals/EditDeleteMatter";
import EditDeleteTask from "./Modals/EditDeleteTask";
import { LineChart } from "react-native-gifted-charts";
import { Context } from "../../Context/Provider";

export default function Home({ navigation }) {
  const {
    seg,
    ter,
    qua,
    qui,
    sex,
    sab,
    dom,
    tasks,
    animation,
    setIdUser,
    setLoginMsg,
    setAnimation,
    editDeleteTaskVisible,
    setEditDeleteTaskVisible,
    editDeleteMatterVisibleHome,
    setEditDeleteMatterVisibleHome,
  } = useContext(Context);

  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [addMatterVisible, setAddMatterVisible] = useState(false);
  const [idToEdit, setIdToEdit] = useState(0);
  const [matterToEdit, setMatterToEdit] = useState("");
  const [tasksDays, setTasksDays] = useState([]);
  const [arrayOfDay, setArrayOfDay] = useState([]);
  const [dims, setDims] = useState({});
  const [day, setDay] = useState("");

  const week = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

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

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setIdUser(user.uid);
        setLoginMsg(user);
      }
    });

    navigation.addListener("beforeRemove", (e) => {
      if (navigation.isFocused()) e.preventDefault();
    });

    let now = new Date();

    now.setHours(now.getHours() - 3);

    let tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    tomorrow.setHours(tomorrow.getHours() - 3);

    /* 
      Antigo método para detectar se o dia mudou:

      let secTimer = setInterval(() => {
      let date = new Date();
      setDay(week[date.getDay()]);
    }, 1000); 
    */

    let date = new Date();
    setDay(week[date.getDay()]);

    let secTimer = setTimeout(() => {
      let date = new Date();
      setDay(week[date.getDay()]);
    }, tomorrow - now + 1000);
  }, []);

  useEffect(() => {
    switch (day) {
      case "Seg":
        setArrayOfDay(seg);
        break;

      case "Ter":
        setArrayOfDay(ter);
        break;

      case "Qua":
        setArrayOfDay(qua);
        break;

      case "Qui":
        setArrayOfDay(qui);
        break;

      case "Sex":
        setArrayOfDay(sex);
        break;

      case "Sab":
        setArrayOfDay(sab);
        break;

      case "Dom":
        setArrayOfDay(dom);
        break;
    }
  }, [day, seg, ter, qua, qui, sex, sab, dom]);

  useEffect(() => {
    const weekMonday = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const convertToDate = (d) => {
      const [day, month, year] = d.split("/");
      return new Date(year, month - 1, day);
    };
    let dateNow = new Date();
    dateNow.setHours(dateNow.getHours() - 3);
    dateNow.setUTCHours(0, 0, 0, 0);
    let nextWeek = new Date();
    nextWeek.setHours(nextWeek.getHours() - 3);
    nextWeek.setUTCHours(0, 0, 0, 0);
    nextWeek.setDate(nextWeek.getDate() + 8);
    setTasksDays(
      getDatesInRange(dateNow, nextWeek).map(function (dateOfWeek) {
        let taskQtd = 0;
        tasks.forEach(function (element) {
          let dateIosItem = convertToDate(element.date);
          dateIosItem.setUTCHours(0, 0, 0, 0);
          if (dateIosItem.getTime() == dateOfWeek.getTime()) {
            taskQtd++;
          }
        });
        return {
          value: taskQtd,
          dataPointText: taskQtd,
          dataPointRadius: 6,
          hideDataPoint: taskQtd == 0 ? true : false,
          label: weekMonday[dateOfWeek.getDay()],
        };
      })
    );
  }, [day, tasks]);

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      enabled={false}
      style={styles.container}
    >
      <StatusBar backgroundColor="#0069E0" />
      {/* Animação de tarefa completada: */}
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
            animationsFiles[randomNum(0, animationsFiles.length - 1).toFixed(0)]
          }
        />
      )}
      {/* Adicionar Tarefa: */}
      <Modal animationType="slide" visible={addTaskVisible} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalBtnClose}>
            <Text style={styles.modalBtnCloseHeader}>Adicionar Tarefa</Text>
            <TouchableOpacity onPress={() => setAddTaskVisible(false)}>
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <AddTask />
        </View>
      </Modal>
      {/* Editar ou excluir tarefa: */}
      <Modal
        animationType="slide"
        visible={editDeleteTaskVisible}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalBtnClose}>
            <Text style={styles.modalBtnCloseHeader}>Editar Tarefa</Text>
            <TouchableOpacity onPress={() => setEditDeleteTaskVisible(false)}>
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <EditDeleteTask id={idToEdit} />
        </View>
      </Modal>
      {/* Editar ou excluir matéria: */}
      <Modal
        animationType="slide"
        visible={editDeleteMatterVisibleHome}
        transparent={true}
      >
        <View style={styles.modal}>
          <View style={styles.modalBtnClose}>
            <Text style={styles.modalBtnCloseHeader}>Editar Matéria</Text>
            <TouchableOpacity
              onPress={() => setEditDeleteMatterVisibleHome(false)}
            >
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <EditDeleteMatter nameMatter={matterToEdit} removeOfDay={false} />
        </View>
      </Modal>
      {/* Grade Completa: */}
      <Modal animationType="fade" visible={addMatterVisible} transparent={true}>
        <View style={styles.modal}>
          <CompleteGrid />
          <TouchableOpacity
            style={styles.modalBtn}
            onPress={() => setAddMatterVisible(false)}
          >
            <Text style={styles.modalBtnTxt}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* Gráfico */}
      <View style={styles.charts}>
        <Text style={styles.chartsTitle}>Tarefas Pendentes</Text>
        <View
          style={styles.chartsPedingTasks}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setDims({ x, y, width, height });
          }}
        >
          <LineChart
            data={tasksDays}
            color={"#5CB0FFAA"}
            curved
            isAnimated
            animationDuration={1000}
            animateOnDataChange
            onDataChangeAnimationDuration={1000}
            initialSpacing={0}
            yAxisTextStyle={{ color: "#00000080", marginRight: -9 }}
            xAxisLabelTextStyle={{
              marginTop: -9,
              marginLeft: 18,
              fontWeight: "bold",
            }}
            areaChart
            textShiftY={-4}
            textShiftX={4}
            noOfSections={
              Math.max(...tasksDays.map((o) => o.value)) >= 5
                ? 5
                : Math.max(...tasksDays.map((o) => o.value)) > 2
                ? Math.max(...tasksDays.map((o) => o.value)) + 1
                : 3
            }
            maxValue={
              Math.max(...tasksDays.map((o) => o.value)) > 2
                ? Math.max(...tasksDays.map((o) => o.value)) + 1
                : 3
            }
            textFontSize={15}
            spacing={dims.width / 7.5}
            width={dims.width + 150}
            height={
              Math.max(...tasksDays.map((o) => o.value)) <= 2
                ? dims.height - (40 - 4)
                : dims.height -
                  (40 - 5 * Math.max(...tasksDays.map((o) => o.value)))
            }
            rulesLength={dims.width - 50} /* comprimento das linhas verticais */
            xAxisLength={dims.width - 50} /* comprimento do eixo x */
            showVerticalLines
            startFillColor={"#0069E0"}
            endFillColor={"#5CB0FF"}
            startOpacity={0.6}
            endOpacity={0.3}
            dataPointsColor={"#F5C000"}
            thickness={5}
          />
        </View>
      </View>
      {/* Grade horária e tarefas: */}
      <View style={styles.tasksGrid}>
        {/* Grade horária de hoje: */}
        <View style={styles.grid}>
          <Text style={styles.header}>Grade Horária de Hoje</Text>
          <FlatList
            data={arrayOfDay}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setEditDeleteMatterVisibleHome(true);
                  setMatterToEdit(item.matter);
                }}
                style={[
                  styles.item,
                  {
                    backgroundColor: index % 2 === 0 ? "#5CB0FF" : "#5CB0FFAA",
                  },
                ]}
              >
                <View
                  style={[styles.colorMatter, { borderTopColor: item.color }]}
                />
                <View style={styles.colorMatterBorder} />
                <Text style={styles.title} numberOfLines={1}>
                  {item.matter}
                </Text>
                <Text style={styles.info} numberOfLines={1}>
                  {item.teacher}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyList}>
                <Text style={styles.emptyListTxt}>Ainda não há matérias</Text>
              </View>
            }
            ListFooterComponent={
              <TouchableOpacity
                style={styles.viewAll}
                onPress={() => setAddMatterVisible(true)}
              >
                <Text style={styles.viewAllTxt}>Grade Completa </Text>
                <Ionicons name={"eye"} color={"#000"} size={20} />
              </TouchableOpacity>
            }
          />
        </View>
        {/* Tarefas: */}
        <View style={styles.tasks}>
          <Text style={styles.header}>Tarefas Pendentes</Text>
          <FlatList
            data={tasks
              .sort((a, b) => (a.task > b.task ? 1 : -1))
              .sort(function (a, b) {
                var aa = a.date.split("/").reverse().join(),
                  bb = b.date.split("/").reverse().join();
                return aa < bb ? -1 : aa > bb ? 1 : 0;
              })}
            keyExtractor={(item) => item.id}
            renderItem={taskItems}
            ListEmptyComponent={
              <View style={styles.emptyList}>
                <Text style={styles.emptyListTxt}>
                  Não há tarefas pendentes
                </Text>
              </View>
            }
            ListFooterComponent={
              <TouchableOpacity
                style={styles.viewAll}
                onPress={() => setAddTaskVisible(true)}
              >
                <Text style={styles.viewAllTxt}>Adicionar tarefa</Text>
                <MaterialIcons name={"add"} color={"#000"} size={25} />
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  function taskItems({ item, index }) {
    let bc = "";
    const convertToDate = (d) => {
      const [day, month, year] = d.split("/");
      return new Date(year, month - 1, day);
    };
    let currentDate = new Date();
    let dateIosItem = convertToDate(item.date);
    currentDate.setHours(currentDate.getHours() - 3);
    currentDate.setUTCHours(0, 0, 0, 0);
    dateIosItem.setUTCHours(0, 0, 0, 0);
    if (dateIosItem.getTime() < currentDate.getTime()) {
      bc = index % 2 === 0 ? "#D0342C" : "#D0342CAA";
    } else {
      bc = index % 2 === 0 ? "#5CB0FF" : "#5CB0FFAA";
    }

    return (
      <TouchableOpacity
        onPress={() => {
          setEditDeleteTaskVisible(true);
          setIdToEdit(item.id);
        }}
        style={[
          styles.item,
          {
            backgroundColor: bc,
          },
        ]}
      >
        <Text style={styles.dateTask}>{item.date}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {item.task}
        </Text>
        <View style={styles.infoIcon}>
          <Text style={styles.info} numberOfLines={1}>
            {item.matter}{" "}
          </Text>
          <Ionicons
            style={styles.matterIcon}
            name={"school"}
            color={item.matterColor}
            size={20}
          />
        </View>
        {(() => {
          switch (item.priority) {
            case 1:
              return (
                <View style={styles.priorityIndicator}>
                  <MaterialIcons
                    style={styles.matterIcon}
                    name={"notifications-active"}
                    color={"#ffffffAA"}
                    size={14}
                  />
                  <Text style={styles.priorityIndicatorTxt}>!</Text>
                  <Text style={styles.priorityIndicatorTxt}>!</Text>
                  <Text style={styles.priorityIndicatorTxt}>!</Text>
                </View>
              );
            case 2:
              return (
                <View style={styles.priorityIndicator}>
                  <MaterialIcons
                    style={styles.matterIcon}
                    name={"notifications-active"}
                    color={"#ffffffAA"}
                    size={14}
                  />
                  <Text style={styles.priorityIndicatorTxt}>!</Text>
                  <Text style={styles.priorityIndicatorTxt}>!</Text>
                </View>
              );
            case 3:
              return (
                <View style={styles.priorityIndicator}>
                  <MaterialIcons
                    style={styles.matterIcon}
                    name={"notifications-active"}
                    color={"#ffffffAA"}
                    size={14}
                  />
                  <Text style={styles.priorityIndicatorTxt}>!</Text>
                </View>
              );
            default:
              return null;
          }
        })()}
      </TouchableOpacity>
    );
  }

  function randomNum(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());

    date.setDate(date.getDate() + 1);

    const dates = [];

    while (date < endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }
}
