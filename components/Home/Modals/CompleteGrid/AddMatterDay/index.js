import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles.js";
import { Context } from "../../../../../Context/Provider";

export default function AddMatterDay(props) {
  const { matters, setSeg, setTer, setQua, setQui, setSex, setSab, setDom } =
    useContext(Context);

  const [matterSelected, setMatterSelected] = useState("");

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          selectedValue={matterSelected}
          onValueChange={(itemValor) => {
            setMatterSelected(itemValor);
          }}
        >
          <Picker.Item
            style={{ color: "#00000055" }}
            label="Escolha a matéria: "
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
      <TouchableOpacity
        style={styles.addBtnMat}
        onPress={() => addMatterDay(matterSelected)}
      >
        <Text style={styles.addBtnTxt}>Adicionar ao Dia</Text>
      </TouchableOpacity>
    </View>
  );

  function addMatterDay(selected) {
    if (!(selected === "")) {
      switch (props.day) {
        case "seg":
          setSeg((current) => [
            ...current,
            {
              id: Math.floor(Date.now() * Math.random()),
              matter: matters[selected].matter,
              teacher: matters[selected].teacher,
              color: matters[selected].color,
            },
          ]);
          break;

        case "ter":
          setTer((current) => [
            ...current,
            {
              id: Math.floor(Date.now() * Math.random()),
              matter: matters[selected].matter,
              teacher: matters[selected].teacher,
              color: matters[selected].color,
            },
          ]);
          break;

        case "qua":
          setQua((current) => [
            ...current,
            {
              id: Math.floor(Date.now() * Math.random()),
              matter: matters[selected].matter,
              teacher: matters[selected].teacher,
              color: matters[selected].color,
            },
          ]);
          break;

        case "qui":
          setQui((current) => [
            ...current,
            {
              id: Math.floor(Date.now() * Math.random()),
              matter: matters[selected].matter,
              teacher: matters[selected].teacher,
              color: matters[selected].color,
            },
          ]);
          break;

        case "sex":
          setSex((current) => [
            ...current,
            {
              id: Math.floor(Date.now() * Math.random()),
              matter: matters[selected].matter,
              teacher: matters[selected].teacher,
              color: matters[selected].color,
            },
          ]);
          break;

        case "sab":
          setSab((current) => [
            ...current,
            {
              id: Math.floor(Date.now() * Math.random()),
              matter: matters[selected].matter,
              teacher: matters[selected].teacher,
              color: matters[selected].color,
            },
          ]);
          break;

        case "dom":
          setDom((current) => [
            ...current,
            {
              id: Math.floor(Date.now() * Math.random()),
              matter: matters[selected].matter,
              teacher: matters[selected].teacher,
              color: matters[selected].color,
            },
          ]);
          break;
      }

      setMatterSelected("");

      showMessage({
        message: "Matéria adicionada com sucesso",
        type: "success",
        duration: 500,
      });
    } else {
      Alert.alert("Erro", "Por favor, selecione alguma matéria.");
    }
  }
}
