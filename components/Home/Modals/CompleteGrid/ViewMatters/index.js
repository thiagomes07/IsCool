import React, { useState, useContext } from "react";
import { View, Text, FlatList, Modal, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCI from "react-native-vector-icons/MaterialCommunityIcons";
import stylesHome from "../../../styles.js";
import styles from "./styles.js";
import EditDeleteMatter from "../../EditDeleteMatter";
import { Context } from "../../../../../Context/Provider";

export default function ViewMatters() {
  const {
    tasks,
    matters,
    editDeleteMatterVisibleView,
    setEditDeleteMatterVisibleView,
  } = useContext(Context);

  const [matterToEdit, setMatterToEdit] = useState("");

  return (
    <View style={styles.container}>
      {/* Editar ou excluir matéria: */}
      <Modal
        animationType="slide"
        visible={editDeleteMatterVisibleView}
        transparent={true}
      >
        <View style={stylesHome.modal}>
          <View style={stylesHome.modalBtnClose}>
            <Text style={stylesHome.modalBtnCloseHeader}>
              Editar ou Remover Matéria
            </Text>
            <TouchableOpacity
              onPress={() => setEditDeleteMatterVisibleView(false)}
            >
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <EditDeleteMatter nameMatter={matterToEdit} removeOfDay={false} />
        </View>
      </Modal>

      {/* Lista das materias: */}
      <FlatList
        style={styles.flatList}
        data={matters.sort((a, b) => (a.matter > b.matter ? 1 : -1))}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setMatterToEdit(item.matter);
              setEditDeleteMatterVisibleView(true);
            }}
            style={[
              styles.item,
              {
                backgroundColor: index % 2 === 0 ? "#5CB0FF" : "#5CB0FFAA",
              },
            ]}
          >
            <View
              style={[stylesHome.colorMatter, { borderTopColor: item.color }]}
            />
            <Text style={styles.title} numberOfLines={1}>
              {item.matter}
            </Text>
            <View style={stylesHome.colorMatterBorder} />
            <Text style={styles.info} numberOfLines={1}>
              {item.teacher}
            </Text>
            {taskCount(item) != 0 && (
              <View style={styles.tasksBox}>
                <Text style={styles.tasksTxt}>{taskCount(item)}</Text>
                <MaterialCI
                  name={"book-education"}
                  color={"#ffffffAA"}
                  size={13}
                />
              </View>
            )}
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTxt}>Todas Matérias</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={stylesHome.emptyList}>
            <Text style={stylesHome.emptyListTxt}>Ainda não há matérias</Text>
          </View>
        }
        ListFooterComponent={<View style={styles.flkatListFooter} />}
      />
    </View>
  );

  function taskCount(item) {
    let taskQtd = 0;
    tasks.forEach((task) => {
      if (task.matter == item.matter) {
        taskQtd++;
      }
    });
    return taskQtd;
  }
}
