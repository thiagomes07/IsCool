import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import MeterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles.js";
import { Context } from "../../../../Context/Provider";

export default function AddMatter() {
  const { setMatters, matters } = useContext(Context);

  const teacherInput = useRef();

  const [matterName, setMatterName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [colorHex, setColorHex] = useState("");

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <TextInput
        style={styles.input}
        onChangeText={setMatterName}
        value={matterName}
        placeholder="Matéria"
        autoFocus={true}
        maxLength={50}
        onSubmitEditing={() => teacherInput.current.focus()}
      />
      <TextInput
        ref={teacherInput}
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
            onPress={() => setColorHex(item)}
            style={[styles.itemColorPicker, { backgroundColor: item }]}
            disabled={matters.some((el) => el.color === item)}
          >
            {colorHex == item && (
              <MeterialIcons name={"check"} color={"#FFF"} size={39} />
            )}
            {matters.some((el) => el.color === item) && (
              <Ionicons name={"close"} color={"#FFF"} size={39} />
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addBtnMat}
        onPress={() => addMatter(matterName, teacherName, colorHex)}
      >
        <Text style={styles.addBtnTxt}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
  function addMatter(mat, teac, col) {
    let found = false;

    if (
      !(
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

    if (!found) found = matters.some((el) => el.color === col);

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
      setMatters((current) => [
        ...current,
        {
          id: Math.floor(Date.now() * Math.random()),
          matter: mat,
          teacher: teac,
          color: col,
        },
      ]);

      setMatterName("");
      setTeacherName("");
      setColorHex("");

      showMessage({
        message: "Matéria adicionada com sucesso",
        type: "success",
        duration: 1200,
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
