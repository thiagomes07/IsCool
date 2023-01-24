import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
  NestableScrollContainer,
  NestableDraggableFlatList,
} from "react-native-draggable-flatlist";
import stylesHome from "../../styles.js";
import styles from "./styles.js";
import AddMatter from "../AddMatter";
import ViewMatters from "./ViewMatters/";
import AddMatterDay from "./AddMatterDay/";
import Ionicons from "react-native-vector-icons/Ionicons";
import EditDeleteMatter from "../EditDeleteMatter";
import { Context } from "../../../../Context/Provider";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function CompleteGrid() {
  const {
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
    editDeleteMatterVisibleGrid,
    setEditDeleteMatterVisibleGrid,
  } = useContext(Context);

  const [visibleMatterAdd, setVisibleMatterAdd] = useState(false);
  const [visibleMatterAddDay, setVisibleMatterAddDay] = useState(false);
  const [visibleMattersView, setVisibleMattersView] = useState(false);
  const [matterToEdit, setMatterToEdit] = useState("");
  const [dayToAdd, setDayToAdd] = useState("");
  const [idDayToRemove, setIdDayToRemove] = useState(0);

  const renderItem = ({ item, index, drag }) => {
    const { isActive } = useOnCellActiveAnimation();

    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              delayLongPress={250}
              onPress={() => {
                setMatterToEdit(item.matter);
                setIdDayToRemove(item.id);
                setEditDeleteMatterVisibleGrid(true);
              }}
              onLongPress={drag}
              style={[
                stylesHome.item,
                {
                  backgroundColor: index % 2 === 0 ? "#5CB0FF" : "#5CB0FFAA",
                  elevation: isActive ? 30 : 0,
                },
              ]}
            >
              <View
                style={[stylesHome.colorMatter, { borderTopColor: item.color }]}
              />
              <View style={stylesHome.colorMatterBorder} />
              <Text style={stylesHome.title} numberOfLines={1}>
                {item.matter}
              </Text>
              <Text style={stylesHome.info} numberOfLines={1}>
                {item.teacher}
              </Text>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };

  return (
    <View style={styles.container}>
      {/* Adicionar matéria ao Dia: */}
      <Modal
        animationType="slide"
        visible={visibleMatterAddDay}
        transparent={true}
      >
        <View style={stylesHome.modal}>
          <View style={stylesHome.modalBtnClose}>
            <Text style={stylesHome.modalBtnCloseHeader}>
              Adicionar Matéria ao Dia
            </Text>
            <TouchableOpacity onPress={() => setVisibleMatterAddDay(false)}>
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <AddMatterDay day={dayToAdd} />
        </View>
      </Modal>
      {/* Criar matéria: */}
      <Modal
        animationType="slide"
        visible={visibleMatterAdd}
        transparent={true}
      >
        <View style={stylesHome.modal}>
          <View style={stylesHome.modalBtnClose}>
            <Text style={stylesHome.modalBtnCloseHeader}>Criar Matéria</Text>
            <TouchableOpacity onPress={() => setVisibleMatterAdd(false)}>
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <AddMatter />
        </View>
      </Modal>
      {/* Visualizar matérias: */}
      <Modal
        animationType="slide"
        visible={visibleMattersView}
        transparent={true}
      >
        <View style={stylesHome.modal}>
          <View style={stylesHome.modalBtnClose}>
            <Text style={stylesHome.modalBtnCloseHeader}>Matérias</Text>
            <TouchableOpacity onPress={() => setVisibleMattersView(false)}>
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <ViewMatters />
        </View>
      </Modal>
      {/* Editar ou excluir matéria: */}
      <Modal
        animationType="slide"
        visible={editDeleteMatterVisibleGrid}
        transparent={true}
      >
        <View style={stylesHome.modal}>
          <View style={stylesHome.modalBtnClose}>
            <Text style={stylesHome.modalBtnCloseHeader}>
              Editar ou Remover Matéria
            </Text>
            <TouchableOpacity
              onPress={() => setEditDeleteMatterVisibleGrid(false)}
            >
              <Ionicons name={"close"} color={"#000"} size={34} />
            </TouchableOpacity>
          </View>
          <EditDeleteMatter
            nameMatter={matterToEdit}
            removeOfDay={true}
            idDay={idDayToRemove}
          />
        </View>
      </Modal>
      {/* Botão para criar matéria: */}
      <TouchableOpacity
        style={styles.btnAddMatter}
        onPress={() => setVisibleMatterAdd(true)}
      >
        <Text style={styles.btnAddTxt}>Criar Matéria</Text>
      </TouchableOpacity>
      {/* Listas de cada dia: */}
      <GestureHandlerRootView >
        <NestableScrollContainer style={styles.flatLists}>
          <ScrollView
            horizontal={true}
            snapToStart={true}
            snapToEnd={true}
            decelerationRate={"normal"}
            snapToOffsets={[110, 288, 466, 644, 825]}
          >
            {/* Lista de Segunda: */}
            <NestableDraggableFlatList
              style={styles.flatList}
              horizontal={false}
              data={seg}
              onDragEnd={({ data }) => setSeg(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Segunda-feira</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={stylesHome.emptyList}>
                  <Text style={stylesHome.emptyListTxt}>
                    Ainda não há matérias
                  </Text>
                </View>
              }
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    setDayToAdd("seg");
                    setVisibleMatterAddDay(true);
                  }}
                >
                  <Text style={styles.btnAddTxt}>Adicionar Matéria</Text>
                </TouchableOpacity>
              }
            />
            {/* Lista de Terça: */}
            <NestableDraggableFlatList
              style={styles.flatList}
              data={ter}
              onDragEnd={({ data }) => setTer(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Terça-feira</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={stylesHome.emptyList}>
                  <Text style={stylesHome.emptyListTxt}>
                    Ainda não há matérias
                  </Text>
                </View>
              }
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    setDayToAdd("ter");
                    setVisibleMatterAddDay(true);
                  }}
                >
                  <Text style={styles.btnAddTxt}>Adicionar Matéria</Text>
                </TouchableOpacity>
              }
            />
            {/* Lista de Quarta: */}
            <NestableDraggableFlatList
              style={styles.flatList}
              data={qua}
              onDragEnd={({ data }) => setQua(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Quarta-feira</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={stylesHome.emptyList}>
                  <Text style={stylesHome.emptyListTxt}>
                    Ainda não há matérias
                  </Text>
                </View>
              }
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    setDayToAdd("qua");
                    setVisibleMatterAddDay(true);
                  }}
                >
                  <Text style={styles.btnAddTxt}>Adicionar Matéria</Text>
                </TouchableOpacity>
              }
            />
            {/* Lista de Quinta: */}
            <NestableDraggableFlatList
              style={styles.flatList}
              data={qui}
              onDragEnd={({ data }) => setQui(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Quinta-feira</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={stylesHome.emptyList}>
                  <Text style={stylesHome.emptyListTxt}>
                    Ainda não há matérias
                  </Text>
                </View>
              }
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    setDayToAdd("qui");
                    setVisibleMatterAddDay(true);
                  }}
                >
                  <Text style={styles.btnAddTxt}>Adicionar Matéria</Text>
                </TouchableOpacity>
              }
            />
            {/* Lista de Sexta: */}
            <NestableDraggableFlatList
              style={styles.flatList}
              data={sex}
              onDragEnd={({ data }) => setSex(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Sexta-feira</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={stylesHome.emptyList}>
                  <Text style={stylesHome.emptyListTxt}>
                    Ainda não há matérias
                  </Text>
                </View>
              }
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    setDayToAdd("sex");
                    setVisibleMatterAddDay(true);
                  }}
                >
                  <Text style={styles.btnAddTxt}>Adicionar Matéria</Text>
                </TouchableOpacity>
              }
            />
            {/* Lista de Sábado: */}
            <NestableDraggableFlatList
              style={styles.flatList}
              data={sab}
              onDragEnd={({ data }) => setSab(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Sábado</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={stylesHome.emptyList}>
                  <Text style={stylesHome.emptyListTxt}>
                    Ainda não há matérias
                  </Text>
                </View>
              }
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    setDayToAdd("sab");
                    setVisibleMatterAddDay(true);
                  }}
                >
                  <Text style={styles.btnAddTxt}>Adicionar Matéria</Text>
                </TouchableOpacity>
              }
            />
            {/* Lista de Domingo: */}
            <NestableDraggableFlatList
              style={styles.flatList}
              data={dom}
              onDragEnd={({ data }) => setDom(data)}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ListHeaderComponent={
                <View style={styles.header}>
                  <Text style={styles.headerTxt}>Domingo</Text>
                </View>
              }
              ListEmptyComponent={
                <View style={stylesHome.emptyList}>
                  <Text style={stylesHome.emptyListTxt}>
                    Ainda não há matérias
                  </Text>
                </View>
              }
              ListFooterComponent={
                <TouchableOpacity
                  style={styles.btnAdd}
                  onPress={() => {
                    setDayToAdd("dom");
                    setVisibleMatterAddDay(true);
                  }}
                >
                  <Text style={styles.btnAddTxt}>Adicionar Matéria</Text>
                </TouchableOpacity>
              }
            />
          </ScrollView>
        </NestableScrollContainer>
      </GestureHandlerRootView>

      {/* Botão para visualizar matérias: */}
      <TouchableOpacity
        style={styles.btnViewMatters}
        onPress={() => setVisibleMattersView(true)}
      >
        <Text style={styles.btnAddTxt}>Todas Matérias</Text>
      </TouchableOpacity>
    </View>
  );
}
