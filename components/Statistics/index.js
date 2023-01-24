import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView, StatusBar, LogBox } from "react-native";
import { BarChart, PieChart, LineChart } from "react-native-gifted-charts";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import * as Progress from "react-native-progress";
import { Context } from "../../Context/Provider";
import styles from "./styles.js";

/* Descomentar a linha abaixo quando terminar a tela, serve para parar o warning sem sentido no PieChart */
LogBox.ignoreLogs(["Each child in a list should have a unique"]);

export default function Statistics() {
  const { matters, tasks, completedTasks } = useContext(Context);

  const [pendingTasksByMatter, setPendingTasksByMatter] = useState([]);
  const [goalProgress, setGoalProgress] = useState([]);
  const [studyTime, setStudyTime] = useState([]);
  const [concludedGoal, setConcludedGoal] = useState([]);
  const [unfinishedGoal, setUnfinishedGoal] = useState([]);
  const [tasksCompletedInOut, setTasksCompletedInOut] = useState([]);
  const [correctOrder, setCorrectOrder] = useState([]);
  const [taskQtdIn, setTaskQtdIn] = useState(0);
  const [taskQtdOut, setTaskQtdOut] = useState(0);
  const [studyTimeValue, setStudyTimeValue] = useState(false);
  const [studyTimeMatter, setStudyTimeMatter] = useState(false);
  const [taskPressed, setTaskPressed] = useState(false);

  useEffect(() => {
    setGoalProgress(
      matters.map((matter) => {
        if (
          matter.hasOwnProperty("timeOfGoal") &&
          matter.timeOfGoal != "noGoal"
        ) {
          let studyTime = 0;

          if (matter.studyTime) {
            if (typeof matter.studyTime === "number")
              studyTime = matter.studyTime;
          }

          let progress =
            ((studyTime - matter.timeInitOfGoal) / matter.timeOfGoal) * 100;

          return {
            progress: progress,
            color: matter.color,
            matter: matter.matter,
          };
        }
      })
    );

    setStudyTime(
      matters.map((matter) => {
        if (matter.studyTime !== undefined) {
          return {
            value: matter.studyTime,
            text: convertToHMS(matter.studyTime),
            color: matter.color,
            matter: matter.matter,
          };
        } else {
          return {
            value: 0,
          };
        }
      })
    );

    setConcludedGoal(
      matters
        .filter((matter) => {
          return (
            matter.unfinishedGoal !== undefined ||
            matter.concludedGoal !== undefined
          );
        })
        .map((matter) => {
          if (matter.concludedGoal !== undefined) {
            return {
              value: matter.concludedGoal,
              dataPointText: matter.concludedGoal,
              dataPointRadius: 7,
              label: matter.matter,
              dataPointColor: matter.color,
              textColor: "#414141",
              customDataPoint: () => {
                return (
                  <View
                    style={{
                      top: 10,
                      width: 17,
                      height: 17,
                      backgroundColor: matter.color,
                      borderWidth: 1.5,
                      borderRadius: 10,
                      borderColor: "#414141",
                    }}
                  />
                );
              },
            };
          } else if (matter.unfinishedGoal !== undefined) {
            return {
              value: 0,
              dataPointText: 0,
              dataPointRadius: 7,
              hideDataPoint: true,
              label: matter.matter,
              dataPointColor: matter.color,
            };
          }
        })
    );

    setUnfinishedGoal(
      matters
        .filter((matter) => {
          return (
            matter.unfinishedGoal !== undefined ||
            matter.concludedGoal !== undefined
          );
        })
        .map((matter) => {
          if (matter.unfinishedGoal !== undefined) {
            return {
              value: matter.unfinishedGoal,
              dataPointText: matter.unfinishedGoal,
              dataPointRadius: 7,
              label: matter.matter,
              dataPointColor: matter.color,
              textColor: "#414141",
              customDataPoint: () => {
                return (
                  <View
                    style={{
                      top: 10,
                      width: 17,
                      height: 17,
                      backgroundColor: matter.color,
                      borderWidth: 1.5,
                      borderRadius: 10,
                      borderColor: "#414141",
                    }}
                  />
                );
              },
            };
          } else if (matter.concludedGoal !== undefined) {
            return {
              value: 0,
              hideDataPoint: true,
              dataPointRadius: 7,
              label: matter.matter,
              dataPointColor: matter.color,
            };
          }
        })
    );
  }, [matters]);

  useEffect(() => {
    let ordened = [];
    setTasksCompletedInOut(
      matters.flatMap((matter) => {
        let taskItemQtdIn = 0;
        let taskItemQtdOut = 0;
        completedTasks.forEach((task) => {
          if (task.matter == matter.matter) {
            const convertToDate = (d) => {
              const [day, month, year] = d.split("/");
              return new Date(year, month - 1, day);
            };
            let concludedDateIos = convertToDate(task.concludedDate);
            let dateIosTask = convertToDate(task.date);
            concludedDateIos.setUTCHours(0, 0, 0, 0);
            dateIosTask.setUTCHours(0, 0, 0, 0);

            if (dateIosTask.getTime() >= concludedDateIos.getTime()) {
              taskItemQtdIn++;
            } else {
              taskItemQtdOut++;
            }
          }
        });

        ordened.push({
          matterName: matter.matter,
          value:
            taskItemQtdIn >= taskItemQtdOut ? taskItemQtdIn : taskItemQtdOut,
        });

        return [
          {
            value: taskItemQtdIn,
            frontColor: "#32CD32",
            capColor: "#32CD32",
            spacing: 3,
            taskQtdIn: taskItemQtdIn,
            taskQtdOut: taskItemQtdOut,
            spacing: 3,
            barStyle: {
              marginTop: taskItemQtdIn ? 0 : -6.2,
            },
            label: matter.matter,
            matterName: matter.matter,
          },
          {
            matterName: matter.matter,
            value: taskItemQtdOut,
            taskQtdIn: taskItemQtdIn,
            taskQtdOut: taskItemQtdOut,
            barStyle: {
              marginTop: taskItemQtdOut ? 0 : -6.2,
            },
            frontColor: "#F00",
            capColor: "#F00",
          },
        ];
      })
    );
    setCorrectOrder(
      ordened
        .sort((a, b) => (a.matterName > b.matterName ? 1 : -1))
        .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
    );
  }, [completedTasks, matters]);

  useEffect(() => {
    setPendingTasksByMatter(
      matters.map((matter) => {
        let taskQtd = 0;
        tasks.forEach((task) => {
          if (task.matter == matter.matter) {
            taskQtd++;
          }
        });
        return {
          value: taskQtd,
          capColor: matter.color,
          label: matter.matter,
          frontColor: matter.color,
          barStyle: {
            marginTop: taskQtd ? 0 : -6.1,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          },
          topLabelComponent: () => (
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                color: "#00000080",
                marginBottom: taskQtd ? 0 : 6,
              }}
            >
              {taskQtd}
            </Text>
          ),
        };
      })
    );
  }, [matters, tasks]);

  const [dims, setDims] = useState({});
  const [dimsPT, setDimsPT] = useState({});

  return (
    <ScrollView>
      <StatusBar backgroundColor="#0069E0" />
      {/* Tarefas pendentes por matéria */}
      <View style={styles.chartPendingTasksAndTitle}>
        <View style={styles.chartPendingTasksTitle}>
          <Text style={styles.title}>Tarefas Pendentes </Text>
          <Text style={styles.subtitle}>(por matéria)</Text>
        </View>
        <View
          style={styles.chartPendingTasks}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setDims({ x, y, width, height });
          }}
        >
          <BarChart
            key={"xyz"}
            yAxisAtTop
            initialSpacing={15}
            spacing={35}
            cappedBars
            capRadius={4}
            width={dims.width - 30}
            height={200}
            isAnimated
            animationEasing
            animationDuration={1000}
            barWidth={50}
            disablePress={true}
            rulesLength={dims.width - 50}
            xAxisLength={dims.width - 50}
            yAxisThickness={1}
            xAxisThickness={1}
            xAxisLabelTextStyle={{
              width: 75,
              fontSize: 13,
              fontWeight: "bold",
            }}
            data={pendingTasksByMatter
              .sort((a, b) => (a.label > b.label ? 1 : -1))
              .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))}
            yAxisTextStyle={{
              marginRight: -10,
              color: "#00000080",
            }}
            noOfSections={
              Math.max(...pendingTasksByMatter.map((o) => o.value)) >= 5
                ? 5
                : Math.max(...pendingTasksByMatter.map((o) => o.value)) > 2
                ? Math.max(...pendingTasksByMatter.map((o) => o.value)) + 1
                : 3
            }
            maxValue={
              Math.max(...pendingTasksByMatter.map((o) => o.value)) >= 3
                ? Math.max(...pendingTasksByMatter.map((o) => o.value)) + 1
                : 3
            }
          />
        </View>
      </View>

      {/* Metas de estudo */}
      <ScrollView style={styles.goalsScroll}>
        <View style={styles.goals}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Metas de Estudo</Text>
          </View>
          {goalProgress
            .sort((a, b) => (a.matter > b.matter ? 1 : -1))
            .sort((a, b) => parseFloat(b.progress) - parseFloat(a.progress))
            .map((item) => {
              if (item !== undefined) {
                return (
                  <View
                    key={Math.floor(Date.now() * Math.random())}
                    style={styles.goalProgress}
                  >
                    <View style={styles.progressBarAndTxt}>
                      <View style={styles.progressBarBox}>
                    <Text style={styles.matterName}>
                      {item.matter.substring(0, 20) +
                        (item.matter.length > 20 ? "..." : "")}
                    </Text>
                        <Progress.Bar
                          progress={item.progress / 100}
                          borderColor={"#000000C0"}
                          color={item.color}
                          width={270}
                          height={30}
                          borderRadius={30}
                          borderWidth={2.5}
                        />
                      </View>
                      <View style={styles.progressBarTxtBox}>
                        <Text style={styles.progressBarTxt}>
                          {item.progress.toFixed(0)}%
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }
            })}
          {!matters.some(
            (el) => el.hasOwnProperty("timeOfGoal") && el.timeOfGoal != "noGoal"
          ) && <Text style={styles.noGoal}>Não há metas criadas</Text>}
        </View>
      </ScrollView>

      {/* Tempo de Estudos */}
      <View style={styles.studyTimeChartAndTitle}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Tempo Estudado</Text>
        </View>
        {studyTimeMatter !== false &&
          (studyTime.reduce((accumulator, object) => {
            return accumulator + object.value;
          }, 0) ? (
            <View style={styles.studyTimeInfo}>
              <Text style={styles.studyTimeInfoTxt}>
                {studyTimeMatter.substring(0, 14) +
                  (studyTimeMatter.length > 14 ? "..." : "")}
              </Text>
              <Text style={styles.studyTimeInfoTxtTime}>{studyTimeValue}</Text>
            </View>
          ) : (
            <View style={styles.studyTimeInfo}>
              <Text style={styles.studyTimeInfoTxt}>
                Sem tempo {"\n"}estudado
              </Text>
            </View>
          ))}

        <View style={styles.studyTimeChart}>
          <PieChart
            strokeColor="#FFF"
            strokeWidth={3}
            innerCircleColor="#414141"
            innerCircleBorderWidth={4}
            innerCircleBorderColor={"#FFDA1F"}
            textColor={"#FFF"}
            fontWeight={"bold"}
            textSize={16}
            radius={150}
            extraRadiusForFocused={5}
            donut
            showText
            focusOnPress={true}
            data={
              studyTime.reduce((accumulator, object) => {
                return accumulator + object.value;
              }, 0)
                ? studyTime
                    .sort((a, b) => (a.matter > b.matter ? 1 : -1))
                    .sort((a, b) => parseFloat(b.value) - parseFloat(a.value))
                    .map((item) => {
                      let text = "";
                      if (
                        (100 * item.value) /
                          studyTime.reduce((accumulator, object) => {
                            return accumulator + object.value;
                          }, 0) >
                        10
                      ) {
                        text = convertToHMS(item.value);
                      }
                      return {
                        value: item.value,
                        text: text,
                        color: item.color,
                        matter: item.matter,
                        shiftTextX: -25,
                        shiftTextY: 1.8,
                      };
                    })
                : [{ value: 1, color: "#00000030" }]
            }
            onPress={(item) => {
              setStudyTimeValue(convertToHMS(item.value));
              setStudyTimeMatter(item.matter);
              if (studyTimeMatter == item.matter) setStudyTimeMatter(false);
            }}
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ color: "#FFF", fontSize: 23 }}>
                    {convertToHMS(
                      studyTime.reduce((accumulator, object) => {
                        return accumulator + object.value;
                      }, 0)
                    )}
                  </Text>
                  <Text
                    style={{ color: "#FFF", fontSize: 17, letterSpacing: 2 }}
                  >
                    Total
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      {/* Tarefas concluídas (dentro e fora do prazo) */}
      <View style={styles.chartOutInTasksAndTitle}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Tarefas Concluídas </Text>
          <Text style={styles.subtitle}>(dentro e fora do prazo)</Text>
        </View>
        <View
          style={styles.chartOutInTasks}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            setDimsPT({ x, y, width, height });
          }}
        >
          <BarChart
            key={"abc"}
            yAxisAtTop
            initialSpacing={15}
            spacing={35}
            width={dimsPT.width - 30}
            height={200}
            cappedBars
            capRadius={4}
            isAnimated
            animationEasing
            animationDuration={1000}
            barWidth={30}
            rulesLength={dimsPT.width - 50}
            xAxisLength={dimsPT.width - 50}
            yAxisThickness={1}
            xAxisThickness={1}
            onPress={(item) => {
              setTaskQtdIn(item.taskQtdIn);
              setTaskQtdOut(item.taskQtdOut);
              item.matterName == taskPressed.matterName
                ? setTaskPressed(false)
                : setTaskPressed(item);
            }}
            xAxisLabelTextStyle={{
              width: 75,
              fontSize: 13,
              fontWeight: "bold",
            }}
            data={tasksCompletedInOut.sort((a, b) => {
              const indexA = correctOrder.findIndex(
                (item) => a.matterName === item.matterName
              );
              const indexB = correctOrder.findIndex(
                (item) => b.matterName === item.matterName
              );
              return indexA - indexB;
            })}
            yAxisTextStyle={{
              marginRight: -10,
              color: "#00000080",
            }}
            noOfSections={
              Math.max(...tasksCompletedInOut.map((o) => o.value)) >= 5
                ? 5
                : Math.max(...tasksCompletedInOut.map((o) => o.value)) > 2
                ? Math.max(...tasksCompletedInOut.map((o) => o.value)) + 1
                : 3
            }
            maxValue={
              Math.max(...tasksCompletedInOut.map((o) => o.value)) >= 3
                ? Math.max(...tasksCompletedInOut.map((o) => o.value)) + 1
                : 3
            }
          />
        </View>

        {/* Legenda do gráfico de tarefas dentro e fora do prazo */}
        <View style={styles.chartOutInTasksDescription}>
          <View style={styles.chartOutInTasksDescriptionItem}>
            <Text style={styles.chartOutInTasksDescriptionTxt}>
              Dentro do prazo
            </Text>
            <Entypo name={"bar-graph"} color={"#32CD32"} size={25} />
          </View>
          <View style={styles.chartOutInTasksDescriptionItem}>
            <Text style={styles.chartOutInTasksDescriptionTxt}>
              Fora do prazo
            </Text>
            <Entypo name={"bar-graph"} color={"#F00"} size={25} />
          </View>
        </View>

        {/* Quantidade da barra caso o usuário pressione */}
        {taskPressed && (
          <View style={styles.chartOutInTasksQtdBox}>
            <View style={styles.chartOutInTasksQtdSubBox}>
              <Text style={styles.chartInTasksQtdItemTxt}>
                {taskQtdIn} Dentro
              </Text>
              <Text style={styles.chartOutTasksQtdItemTxt}>
                {taskQtdOut} Fora
              </Text>
            </View>
            <Text style={styles.chartTotalTasksQtdItemTxt}>
              Total {taskQtdOut + taskQtdIn}
            </Text>
          </View>
        )}
      </View>

      {/* Metas concluídas e Inconcluídas */}
      <View style={styles.chartConAndUnfGoalsAndTitle}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Metas </Text>
          <Text style={styles.subtitle}>(concluídas e inconcluídas)</Text>
        </View>
        <View style={styles.chartConAndUnfGoals}>
          <LineChart
            data={[
              { value: 0 },
              ...concludedGoal.sort((a, b) => (a.label > b.label ? 1 : -1)),
            ]}
            data2={[
              { value: 0 },
              ...unfinishedGoal.sort((a, b) => (a.label > b.label ? 1 : -1)),
            ]}
            color1="#32CD32"
            color2="#F00"
            curved
            verticalLinesColor={"#00000035"}
            isAnimated
            animateOnDataChange
            onDataChangeAnimationDuration={1000}
            initialSpacing={0}
            yAxisTextStyle={{ color: "#00000080", marginRight: -9 }}
            xAxisLabelTextStyle={{
              marginTop: -9,
              marginLeft: 40,
              width: 90,
              fontWeight: "bold",
              fontSize: 13,
            }}
            textShiftY={-5}
            textShiftX={5}
            textFontSize={15}
            spacing={95}
            height={200}
            rulesLength={
              dimsPT.width - 50
            } /* comprimento das linhas verticais */
            xAxisLength={dimsPT.width - 50} /* comprimento do eixo x */
            showVerticalLines
            startOpacity={0.6}
            endOpacity={0.3}
            thickness={5}
            noOfSections={
              ((Number.isFinite(Math.max(...unfinishedGoal.map((o) => o.value)))
                ? Math.max(...unfinishedGoal.map((o) => o.value))
                : 0) >=
              (Number.isFinite(Math.max(...concludedGoal.map((o) => o.value)))
                ? Math.max(...concludedGoal.map((o) => o.value))
                : 0)
                ? Number.isFinite(
                    Math.max(...unfinishedGoal.map((o) => o.value))
                  )
                  ? Math.max(...unfinishedGoal.map((o) => o.value))
                  : 0
                : Number.isFinite(
                    Math.max(...concludedGoal.map((o) => o.value))
                  )
                ? Math.max(...concludedGoal.map((o) => o.value))
                : 0) >= 5
                ? 5
                : ((Number.isFinite(
                    Math.max(...unfinishedGoal.map((o) => o.value))
                  )
                    ? Math.max(...unfinishedGoal.map((o) => o.value))
                    : 0) >=
                  (Number.isFinite(
                    Math.max(...concludedGoal.map((o) => o.value))
                  )
                    ? Math.max(...concludedGoal.map((o) => o.value))
                    : 0)
                    ? Number.isFinite(
                        Math.max(...unfinishedGoal.map((o) => o.value))
                      )
                      ? Math.max(...unfinishedGoal.map((o) => o.value))
                      : 0
                    : Number.isFinite(
                        Math.max(...concludedGoal.map((o) => o.value))
                      )
                    ? Math.max(...concludedGoal.map((o) => o.value))
                    : 0) > 2
                ? ((Number.isFinite(
                    Math.max(...unfinishedGoal.map((o) => o.value))
                  )
                    ? Math.max(...unfinishedGoal.map((o) => o.value))
                    : 0) >=
                  (Number.isFinite(
                    Math.max(...concludedGoal.map((o) => o.value))
                  )
                    ? Math.max(...concludedGoal.map((o) => o.value))
                    : 0)
                    ? Number.isFinite(
                        Math.max(...unfinishedGoal.map((o) => o.value))
                      )
                      ? Math.max(...unfinishedGoal.map((o) => o.value))
                      : 0
                    : Number.isFinite(
                        Math.max(...concludedGoal.map((o) => o.value))
                      )
                    ? Math.max(...concludedGoal.map((o) => o.value))
                    : 0) + 1
                : 3
            }
            maxValue={
              ((Number.isFinite(Math.max(...unfinishedGoal.map((o) => o.value)))
                ? Math.max(...unfinishedGoal.map((o) => o.value))
                : 0) >=
              (Number.isFinite(Math.max(...concludedGoal.map((o) => o.value)))
                ? Math.max(...concludedGoal.map((o) => o.value))
                : 0)
                ? Number.isFinite(
                    Math.max(...unfinishedGoal.map((o) => o.value))
                  )
                  ? Math.max(...unfinishedGoal.map((o) => o.value))
                  : 0
                : Number.isFinite(
                    Math.max(...concludedGoal.map((o) => o.value))
                  )
                ? Math.max(...concludedGoal.map((o) => o.value))
                : 0) >= 3
                ? ((Number.isFinite(
                    Math.max(...unfinishedGoal.map((o) => o.value))
                  )
                    ? Math.max(...unfinishedGoal.map((o) => o.value))
                    : 0) >=
                  (Number.isFinite(
                    Math.max(...concludedGoal.map((o) => o.value))
                  )
                    ? Math.max(...concludedGoal.map((o) => o.value))
                    : 0)
                    ? Number.isFinite(
                        Math.max(...unfinishedGoal.map((o) => o.value))
                      )
                      ? Math.max(...unfinishedGoal.map((o) => o.value))
                      : 0
                    : Number.isFinite(
                        Math.max(...concludedGoal.map((o) => o.value))
                      )
                    ? Math.max(...concludedGoal.map((o) => o.value))
                    : 0) + 1
                : 3
            }
          />
        </View>
        <View style={styles.chartConAndUnfDescription}>
          <View style={styles.chartConAndUnfDescriptionItem}>
            <Text style={styles.chartConAndUnfDescriptionTxt}>Concluída</Text>
            <Ionicons name={"analytics-outline"} color={"#32CD32"} size={34} />
          </View>
          <View style={styles.chartConAndUnfDescriptionItem}>
            <Text style={styles.chartConAndUnfDescriptionTxt}>Inconcluída</Text>
            <Ionicons name={"analytics-outline"} color={"#F00"} size={34} />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  function convertToHMS(sec) {
    return new Date(sec * 1000).toISOString().slice(11, 19);
  }
}
