import React, { createContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { db } from "../Firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const Context = createContext();

export default function Provider({ children }) {
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

  const [matters, setMatters] = useState([]);

  const [seg, setSeg] = useState([]);
  const [ter, setTer] = useState([]);
  const [qua, setQua] = useState([]);
  const [qui, setQui] = useState([]);
  const [sex, setSex] = useState([]);
  const [sab, setSab] = useState([]);
  const [dom, setDom] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [completedTasks, setCompletedTasks] = useState([]);

  const [notificationPriorities, setNotificationPriorities] = useState([
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

  const [editDeleteMatterVisibleHome, setEditDeleteMatterVisibleHome] =
    useState(false);
  const [editDeleteMatterVisibleGrid, setEditDeleteMatterVisibleGrid] =
    useState(false);
  const [editDeleteMatterVisibleView, setEditDeleteMatterVisibleView] =
    useState(false);
  const [editDeleteTaskVisible, setEditDeleteTaskVisible] = useState(false);
  const [animation, setAnimation] = useState(false);

  const [idUser, setIdUser] = useState("");

  const [isLogged, setIsLogged] = useState(false);

  const [loginMsg, setLoginMsg] = useState("");

  useEffect(() => {
    (async () => {
      let isLoggedLocal = await AsyncStorage.getItem("@isLogged");
      isLoggedLocal && setIsLogged(JSON.parse(isLoggedLocal));
    })();

    (async () => {
      let idUserLocal = await AsyncStorage.getItem("@idUser");
      idUserLocal && setIdUser(JSON.parse(idUserLocal));
    })();

    (async () => {
      const tasksLocal = await AsyncStorage.getItem("@tasks");
      tasksLocal && setTasks(JSON.parse(tasksLocal));
    })();

    (async () => {
      let segLocal = await AsyncStorage.getItem("@seg");
      segLocal && setSeg(JSON.parse(segLocal));
    })();

    (async () => {
      let terLocal = await AsyncStorage.getItem("@ter");
      terLocal && setTer(JSON.parse(terLocal));
    })();

    (async () => {
      let quaLocal = await AsyncStorage.getItem("@qua");
      quaLocal && setQua(JSON.parse(quaLocal));
    })();

    (async () => {
      let quiLocal = await AsyncStorage.getItem("@qui");
      quiLocal && setQui(JSON.parse(quiLocal));
    })();

    (async () => {
      let sexLocal = await AsyncStorage.getItem("@sex");
      sexLocal && setSex(JSON.parse(sexLocal));
    })();

    (async () => {
      let sabLocal = await AsyncStorage.getItem("@sab");
      sabLocal && setSab(JSON.parse(sabLocal));
    })();

    (async () => {
      let domLocal = await AsyncStorage.getItem("@dom");
      domLocal && setDom(JSON.parse(domLocal));
    })();

    (async () => {
      let mattersLocal = await AsyncStorage.getItem("@matters");
      mattersLocal && setMatters(JSON.parse(mattersLocal));
    })();

    (async () => {
      let completedTasksLocal = await AsyncStorage.getItem("@completedTasks");
      completedTasksLocal && setCompletedTasks(JSON.parse(completedTasksLocal));
    })();

    (async () => {
      let notificationPrioritiesLocal = await AsyncStorage.getItem(
        "@notificationPriorities"
      );
      notificationPrioritiesLocal &&
        setNotificationPriorities(JSON.parse(notificationPrioritiesLocal));
    })();
  }, []);

  useEffect(() => {
    async function clearAndGetData() {
      if (loginMsg.hasOwnProperty("operationType") && idUser != "") {
        console.log("login novo");

        await getDoc(doc(db, idUser, "matters")).then((doc) => {
          doc.exists() ? setMatters(Object.values(doc.data())) : setMatters([]);
        });

        await getDoc(doc(db, idUser, "completedTasks")).then((doc) => {
          doc.exists()
            ? setCompletedTasks(Object.values(doc.data()))
            : setCompletedTasks([]);
        });

        await getDoc(doc(db, idUser, "notificationPriorities")).then((doc) => {
          doc.exists()
            ? setNotificationPriorities(Object.values(doc.data()))
            : setNotificationPriorities([
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
        });

        await getDoc(doc(db, idUser, "seg")).then((doc) => {
          doc.exists() ? setSeg(Object.values(doc.data())) : setSeg([]);
        });

        await getDoc(doc(db, idUser, "ter")).then((doc) => {
          doc.exists() ? setTer(Object.values(doc.data())) : setTer([]);
        });

        await getDoc(doc(db, idUser, "qua")).then((doc) => {
          doc.exists() ? setQua(Object.values(doc.data())) : setQua([]);
        });

        await getDoc(doc(db, idUser, "qui")).then((doc) => {
          doc.exists() ? setQui(Object.values(doc.data())) : setQui([]);
        });

        await getDoc(doc(db, idUser, "sex")).then((doc) => {
          doc.exists() ? setSex(Object.values(doc.data())) : setSex([]);
        });

        await getDoc(doc(db, idUser, "sab")).then((doc) => {
          doc.exists() ? setSab(Object.values(doc.data())) : setSab([]);
        });

        await getDoc(doc(db, idUser, "dom")).then((doc) => {
          doc.exists() ? setDom(Object.values(doc.data())) : setDom([]);
        });

        await getDoc(doc(db, idUser, "tasks")).then((doc) => {
          if (doc.exists()) {
            setTasks(Object.values(doc.data()));

            tasks.forEach(async (task) => {
              if (task.priority !== "disabled") {
                let dateStringDelivery =
                  task.date +
                  " " +
                  notificationPriorities[task.priority - 1].time;
                let [dia, mes, ano, hora, minuto] = dateStringDelivery
                  .split(/[\/: ]/)
                  .map((v) => parseInt(v));
                let dateIosDelivery = new Date(ano, mes - 1, dia, hora, minuto);

                let dateIosBeforDelivey = new Date(dateIosDelivery);
                dateIosBeforDelivey.setDate(
                  dateIosBeforDelivey.getDate() -
                    notificationPriorities[task.priority - 1].daysBeforeDate
                );

                const currentDate = new Date();
                currentDate.setHours(
                  dateIosDelivery.getHours(),
                  dateIosDelivery.getMinutes(),
                  0,
                  0
                );

                const currentDateTime = new Date();

                let adder = notificationPriorities[task.priority - 1].frequency;
                if (!adder)
                  adder =
                    notificationPriorities[task.priority - 1].daysBeforeDate;

                for (
                  let i = 0;
                  i <= notificationPriorities[task.priority - 1].daysBeforeDate;
                  i += adder
                ) {
                  if (
                    getDatesInRange(dateIosBeforDelivey, dateIosDelivery)[
                      i
                    ].getTime() > currentDateTime.getTime()
                  ) {
                    await Notifications.scheduleNotificationAsync({
                      content: {
                        data: {
                          idTask: task.id,
                          priority: task.priority,
                        },
                        title: "Lembrete de tarefa",
                        body:
                          'A tarefa "' +
                          task.task +
                          '" cuja entrega é em ' +
                          task.date +
                          " ainda está pendente.",
                      },
                      trigger: {
                        seconds: getSecondsDiff(
                          getDatesInRange(dateIosBeforDelivey, dateIosDelivery)[
                            i
                          ],
                          currentDateTime
                        ),
                      },
                    });
                  }
                }
              }
            });
          } else {
            setTasks([]);
          }
        });
      }
    }

    clearAndGetData();
  }, [loginMsg]);

  useEffect(() => {
    (async () =>
      await AsyncStorage.setItem("@isLogged", JSON.stringify(isLogged)))();
  }, [isLogged]);

  useEffect(() => {
    (async () =>
      await AsyncStorage.setItem("@idUser", JSON.stringify(idUser)))();
  }, [idUser]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@seg", JSON.stringify(seg)).then(
        async function () {
          if (seg.length && idUser != "") {
            await setDoc(doc(db, idUser, "seg"), {});
            seg.forEach(async (item, index) => {
              await setDoc(
                doc(db, idUser, "seg"),
                {
                  [index]: item,
                },
                { merge: true }
              );
            });
          } else {
            if (!seg.length && idUser != "")
              await deleteDoc(doc(db, idUser, "seg"));
          }
        }
      );
    })();
  }, [seg]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@ter", JSON.stringify(ter)).then(
        async function () {
          if (ter.length && idUser != "") {
            await setDoc(doc(db, idUser, "ter"), {});
            ter.forEach(async (item, index) => {
              await setDoc(
                doc(db, idUser, "ter"),
                { [index]: item },
                { merge: true }
              );
            });
          } else {
            if (!ter.length && idUser != "")
              await deleteDoc(doc(db, idUser, "ter"));
          }
        }
      );
    })();
  }, [ter]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@qua", JSON.stringify(qua)).then(
        async function () {
          if (qua.length && idUser != "") {
            await setDoc(doc(db, idUser, "qua"), {});
            qua.forEach(async (item, index) => {
              await setDoc(
                doc(db, idUser, "qua"),
                { [index]: item },
                { merge: true }
              );
            });
          } else {
            if (!qua.length && idUser != "")
              await deleteDoc(doc(db, idUser, "qua"));
          }
        }
      );
    })();
  }, [qua]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@qui", JSON.stringify(qui)).then(
        async function () {
          if (qui.length && idUser != "") {
            await setDoc(doc(db, idUser, "qui"), {});
            qui.forEach(async (item, index) => {
              await setDoc(
                doc(db, idUser, "qui"),
                { [index]: item },
                { merge: true }
              );
            });
          } else {
            if (!qui.length && idUser != "")
              await deleteDoc(doc(db, idUser, "qui"));
          }
        }
      );
    })();
  }, [qui]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@sex", JSON.stringify(sex)).then(
        async function () {
          if (sex.length && idUser != "") {
            await setDoc(doc(db, idUser, "sex"), {});
            sex.forEach(async (item, index) => {
              await setDoc(
                doc(db, idUser, "sex"),
                { [index]: item },
                { merge: true }
              );
            });
          } else {
            if (!sex.length && idUser != "")
              await deleteDoc(doc(db, idUser, "sex"));
          }
        }
      );
    })();
  }, [sex]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@sab", JSON.stringify(sab)).then(
        async function () {
          if (sab.length && idUser != "") {
            await setDoc(doc(db, idUser, "sab"), {});
            sab.forEach(async (item, index) => {
              await setDoc(
                doc(db, idUser, "sab"),
                { [index]: item },
                { merge: true }
              );
            });
          } else {
            if (!sab.length && idUser != "")
              await deleteDoc(doc(db, idUser, "sab"));
          }
        }
      );
    })();
  }, [sab]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@dom", JSON.stringify(dom)).then(
        async function () {
          if (dom.length && idUser != "") {
            await setDoc(doc(db, idUser, "dom"), {});
            dom.forEach(async (item, index) => {
              await setDoc(
                doc(db, idUser, "dom"),
                { [index]: item },
                { merge: true }
              );
            });
          } else {
            if (!dom.length && idUser != "")
              await deleteDoc(doc(db, idUser, "dom"));
          }
        }
      );
    })();
  }, [dom]);

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks)).then(
        async function () {
          if (tasks.length && idUser != "") {
            await setDoc(doc(db, idUser, "tasks"), {});
            tasks.forEach(async (task) => {
              await setDoc(
                doc(db, idUser, "tasks"),
                { [task.id]: task },
                { merge: true }
              );
            });
          } else {
            if (!tasks.length && idUser != "")
              await deleteDoc(doc(db, idUser, "tasks"));
          }
        }
      );
    })();
  }, [tasks]);

  useEffect(() => {
    (async () =>
      await AsyncStorage.setItem("@matters", JSON.stringify(matters)).then(
        async function () {
          if (matters.length && idUser != "") {
            await setDoc(doc(db, idUser, "matters"), {});
            matters.forEach(async (matter) => {
              await setDoc(
                doc(db, idUser, "matters"),
                { [matter.matter]: matter },
                { merge: true }
              );
            });
          } else {
            if (!matters.length && idUser != "")
              await deleteDoc(doc(db, idUser, "matters"));
          }
        }
      ))();
  }, [matters]);

  useEffect(() => {
    (async () =>
      await AsyncStorage.setItem(
        "@completedTasks",
        JSON.stringify(completedTasks)
      ).then(async function () {
        if (completedTasks.length && idUser != "") {
          await setDoc(doc(db, idUser, "completedTasks"), {});
          completedTasks.forEach(async (completedTask) => {
            await setDoc(
              doc(db, idUser, "completedTasks"),
              { [completedTask.id]: completedTask },
              { merge: true }
            );
          });
        } else {
          if (!completedTasks.length && idUser != "")
            await deleteDoc(doc(db, idUser, "completedTasks"));
        }
      }))();
  }, [completedTasks]);

  useEffect(() => {
    (async () =>
      await AsyncStorage.setItem(
        "@notificationPriorities",
        JSON.stringify(notificationPriorities)
      ).then(async function () {
        if (idUser != "") {
          await setDoc(doc(db, idUser, "notificationPriorities"), {});
          notificationPriorities.forEach(async (notificationPriority) => {
            await setDoc(
              doc(db, idUser, "notificationPriorities"),
              { [notificationPriority.priority]: notificationPriority },
              { merge: true }
            );
          });
        }
      }))();
  }, [notificationPriorities]);

  return (
    <Context.Provider
      value={{
        seg,
        setSeg,
        ter,
        setTer,
        qua,
        setQua,
        qui,
        setQui,
        sex,
        setSex,
        sab,
        setSab,
        dom,
        setDom,
        matters,
        setMatters,
        tasks,
        setTasks,
        idUser,
        setIdUser,
        isLogged,
        setIsLogged,
        loginMsg,
        setLoginMsg,
        animation,
        setAnimation,
        completedTasks,
        setCompletedTasks,
        editDeleteTaskVisible,
        setEditDeleteTaskVisible,
        notificationPriorities,
        setNotificationPriorities,
        editDeleteMatterVisibleHome,
        setEditDeleteMatterVisibleHome,
        editDeleteMatterVisibleGrid,
        setEditDeleteMatterVisibleGrid,
        editDeleteMatterVisibleView,
        setEditDeleteMatterVisibleView,
      }}
    >
      {children}
    </Context.Provider>
  );

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
      Notifications.setNotificationChannelAsync("Tarefas Pendentes", {
        name: "Tarefas Pendentes",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
}
