import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import * as Notifications from "expo-notifications";
import MeterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles.js";
import { Context } from "../../../../Context/Provider";

export default function EditDeleteMatter(props) {
  const {
    setSeg,
    setTer,
    setQua,
    setQui,
    setSex,
    setSab,
    setDom,
    tasks,
    setTasks,
    matters,
    setMatters,
    completedTasks,
    setCompletedTasks,
    setEditDeleteMatterVisibleHome,
    setEditDeleteMatterVisibleGrid,
    setEditDeleteMatterVisibleView,
  } = useContext(Context);

  const [matter, setMatter] = useState(
    matters.find((mat) => mat.matter == props.nameMatter)
  );
  const [task, setTask] = useState(
    tasks && tasks.find((tas) => tas.matter == props.nameMatter)
  );
  const [taskCompleted, setTaskCompleted] = useState(
    completedTasks &&
      completedTasks.find((tasCo) => tasCo.matter == props.nameMatter)
  );

  const [matterName, setMatterName] = useState(matter.matter);
  const [teacherName, setTeacherName] = useState(matter.teacher);
  const [colorHex, setColorHex] = useState(matter.color);

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <TextInput
        style={styles.input}
        onChangeText={setMatterName}
        value={matterName}
        placeholder="Matéria"
        maxLength={50}
      />
      <TextInput
        style={[styles.input, styles.inputTeacher]}
        onChangeText={setTeacherName}
        value={teacherName}
        placeholder="Professor"
        maxLength={50}
      />
      <FlatList
        data={[
          "#FF0000",
          "#FF4500",
          "#FF8C00",
          "#FFD700",
          "#FFFF00",
          "#F0E68C",
          "#2F4F4F",
          "#8FBC8F",
          "#3CB371",
          "#2E8B57",
          "#006400",
          "#228B22",
          "#32CD32",
          "#00FF00",
          "#00FF7F",
          "#ADFF2F",
          "#9ACD32",
          "#556B2F",
          "#808000",
          "#7B68EE",
          "#9370DB",
          "#8A2BE2",
          "#4B0082",
          "#9400D3",
          "#BA55D3",
          "#A020F0",
          "#8B008B",
          "#FF00FF",
          "#EE82EE",
          "#D8BFD8",
          "#C71585",
          "#FF1493",
          "#FF69B4",
          "#DB7093",
          "#FFB6C1",
          "#F08080",
          "#CD5C5C",
          "#DC143C",
          "#6A5ACD",
          "#483D8B",
          "#00008B",
          "#0000FF",
          "#6495ED",
          "#4169E1",
          "#1E90FF",
          "#00BFFF",
          "#87CEFA",
          "#ADD8E6",
          "#4682B4",
          "#B0C4DE",
          "#708090",
          "#00FFFF",
          "#00CED1",
          "#40E0D0",
          "#008080",
          "#66CDAA",
          "#5F9EA0",
          "#B0E0E6",
          "#BDB76B",
          "#DAA520",
          "#B8860B",
          "#8B4513",
          "#BC8F8F",
          "#CD853F",
          "#D2691E",
          "#F4A460",
          "#FFDEAD",
          "#D2B48C",
          "#800000",
          "#A52A2A",
          "#FA8072",
          "#FF6347",
          "#1C1C1C",
          "#4F4F4F",
          "#808080",
          "#C0C0C0",
          "#DCDCDC",
        ]}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setColorHex(item);
              console.log(item);
            }}
            style={[styles.itemColorPicker, { backgroundColor: item }]}
            disabled={matters.some((el) => el.color === item)}
          >
            {colorHex == item && (
              <MeterialIcons name={"check"} color={"#FFF"} size={39} />
            )}
            {matters.some((el) => el.color === item) && colorHex !== item && (
              <Ionicons name={"close"} color={"#FFF"} size={39} />
            )}
          </TouchableOpacity>
        )}
      />
      <View style={styles.deleteEditBtn}>
        <TouchableOpacity
          style={styles.deleteBtnMatter}
          onPress={() => deleteMatter()}
        >
          <MeterialIcons name={"delete"} color={"#000"} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editBtnMatter}
          onPress={() => editMatter(matterName, teacherName, colorHex)}
        >
          <Text style={styles.editBtnTxt}>Salvar</Text>
        </TouchableOpacity>
        {props.removeOfDay && (
          <TouchableOpacity
            style={styles.deleteMatterOfDayBtn}
            onPress={() => deleteMatterOfDay()}
          >
            <MeterialIcons
              name={"table-large-remove"}
              color={"#000"}
              size={30}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  function deleteMatterOfDay() {
    setEditDeleteMatterVisibleHome(false);
    setEditDeleteMatterVisibleGrid(false);
    setEditDeleteMatterVisibleView(false);

    setSeg((current) =>
      current.filter((employee) => {
        return employee.id !== props.idDay;
      })
    );

    setTer((current) =>
      current.filter((employee) => {
        return employee.id !== props.idDay;
      })
    );

    setQua((current) =>
      current.filter((employee) => {
        return employee.id !== props.idDay;
      })
    );

    setQui((current) =>
      current.filter((employee) => {
        return employee.id !== props.idDay;
      })
    );

    setSex((current) =>
      current.filter((employee) => {
        return employee.id !== props.idDay;
      })
    );

    setSab((current) =>
      current.filter((employee) => {
        return employee.id !== props.idDay;
      })
    );

    setDom((current) =>
      current.filter((employee) => {
        return employee.id !== props.idDay;
      })
    );
  }

  async function deleteNotifications() {
    const existingNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    existingNotifications.forEach(function (item) {
      tasks.forEach(function (itemTask) {
        if (
          item.content.data.idTask == itemTask.id &&
          itemTask.matter == matter.matter
        ) {
          Notifications.cancelScheduledNotificationAsync(item.identifier);
        }
      });
    });
  }

  async function deleteMatter() {
    Alert.alert(
      'Excluir "' + matter.matter + '"',
      'Você tem certeza que deseja excluir a matéria "' +
        matter.matter +
        '"?' +
        " Essa ação excluirá todas as tarefas com esta matéria.",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setEditDeleteMatterVisibleHome(false);
            setEditDeleteMatterVisibleGrid(false);
            setEditDeleteMatterVisibleView(false);

            setMatters((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );

            if (task !== null) {
              setTasks((current) =>
                current.filter((employee) => {
                  return employee.matter !== matter.matter;
                })
              );
              deleteNotifications();
            }

            if (taskCompleted !== null) {
              setCompletedTasks((current) =>
                current.filter((employee) => {
                  return employee.matter !== matter.matter;
                })
              );
            }

            setSeg((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );

            setTer((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );

            setQua((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );

            setQui((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );

            setSex((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );

            setSab((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );

            setDom((current) =>
              current.filter((employee) => {
                return employee.matter !== matter.matter;
              })
            );
          },
        },
      ]
    );
  }

  function editMatter(mat, teac, col) {
    let found = false;

    if (
      !(
        mat == matter.matter ||
        mat.length === 0 ||
        !mat.trim() ||
        teac.length === 0 ||
        !teac.trim() ||
        col == ""
      )
    ) {
      mat = mat.trim();
      mat = mat[0].toUpperCase() + mat.substr(1);
      teac = teac.trim();
      teac = teac[0].toUpperCase() + teac.substr(1);

      found = matters.some((el) => el.matter === mat);
    }

    if (
      (!(mat == matter.matter && col == matter.color) &&
        !(mat != matter.matter || col == matter.color)) ||
      (mat == matter.matter && col != matter.color) ||
      (mat != matter.matter && col != matter.color)
    ) {
      found = matters.some((el) => el.color === col);
    }

    if (
      !(
        mat.length === 0 ||
        !mat.trim() ||
        teac.length === 0 ||
        !teac.trim() ||
        col == "" ||
        found
      )
    ) {
      setMatters((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      if (task !== null) {
        setTasks((prevState) => {
          const newState = prevState.map((obj) => {
            if (obj.matter === matter.matter) {
              return {
                ...obj,
                matter: mat,
                matterColor: col,
              };
            }
            return obj;
          });
          return newState;
        });
      }

      if (taskCompleted !== null) {
        setCompletedTasks((prevState) => {
          const newState = prevState.map((obj) => {
            if (obj.matter === matter.matter) {
              return {
                ...obj,
                matter: mat,
                matterColor: col,
              };
            }
            return obj;
          });
          return newState;
        });
      }

      setSeg((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      setTer((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      setQua((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      setQui((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      setSex((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      setSab((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      setDom((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.matter === matter.matter) {
            return {
              ...obj,
              matter: mat,
              teacher: teac,
              color: col,
            };
          }
          return obj;
        });
        return newState;
      });

      setMatter(prevState => ({...prevState, id: matter.id, matter: mat, teacher: teac, color: col}))

      setMatterName(mat);
      setTeacherName(teac);
      setColorHex(col);

      setTask(tasks && tasks.find((tas) => tas.matter == mat));
      setTaskCompleted(
        completedTasks &&
          completedTasks.find((tasCo) => tasCo.matter == mat)
      );

      console.log(matterName);
      console.log(teacherName);

      showMessage({
        message: "Matéria alterada com sucesso",
        type: "success",
        duration: 1500,
      });
    } else {
      if (found) {
        Alert.alert("Erro", "Valor já existente, por favor insira um novo.");
      } else {
        Alert.alert(
          "Erro",
          "Por favor, preencha todos os campos corretamente."
        );
      }
    }
  }
}
