import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chartPendingTasksAndTitle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  chartPendingTasksTitle: {
    borderRadius: 500,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: 13,
    marginBottom: 5,
    backgroundColor: "#5Cb0FF",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  subtitle: {
    fontSize: 12,
    color: "#FFF",
  },
  chartPendingTasks: {
    width: "100%",
    marginBottom: 25,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Metas de estudo */
  goalsScroll: {
    marginTop: 15,
    maxHeight: 260,
  },
  goals: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    borderRadius: 500,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#5Cb0FF",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3.5,
  },
  goalProgress: {
    marginTop: 7,
    width: '85%',
    alignItems: "center",
    justifyContent: "center",
  },
  matterName: {
    fontSize: 17,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarAndTxt: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
  },
  progressBarTxtBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: 3,
  },
  progressBarTxt: {
    marginLeft: 7,
    fontSize: 22,
    fontWeight: "bold",
  },
  noGoal: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
    color: "#00000080",
  },

  /* Tempo de estudo */
  studyTimeChartAndTitle: {
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  studyTimeInfo: {
    position: "absolute",
    left: 15,
    top: 25,
  },
  studyTimeInfoTxt: {
    fontWeight: "bold",
    color: "#414141",
  },
  studyTimeInfoTxtTime: {
    letterSpacing: 1,
    color: "#414141",
  },
  studyTimeChart: {
    marginTop: 10,
    paddingLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Tarefas concluídas dentro e fora do prazo */
  chartOutInTasksAndTitle: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  chartOutInTasks: {
    width: "100%",
    marginTop: 10,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  chartOutInTasksDescription: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  chartOutInTasksDescriptionItem: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 2,
  },
  chartOutInTasksDescriptionTxt: {
    fontSize: 16,
    marginRight: 3,
    fontWeight: "500",
    color: "#414141",
  },
  chartOutInTasksQtdBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  chartOutInTasksQtdSubBox: {
    fontWeight: "500",
    flexDirection: "row",
  },
  chartInTasksQtdItemTxt: {
    fontSize: 15,
    marginRight: 15,
    fontWeight: "450",
    borderBottomWidth: 1,
    borderColor: "#32CD32",
    color: "#555",
  },
  chartOutTasksQtdItemTxt: {
    borderBottomWidth: 1,
    borderColor: "#F00",
    fontSize: 15,
    fontWeight: "475",
    color: "#555",
  },
  chartTotalTasksQtdItemTxt: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "400",
    color: "#777",
  },

  /* Metas concluídas e inconcluídas */
  chartConAndUnfGoalsAndTitle: {
    marginTop: 30,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  chartConAndUnfGoals: {
    width: "100%",
    marginTop: 10,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  chartConAndUnfDescription: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  chartConAndUnfDescriptionItem: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  chartConAndUnfDescriptionTxt: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: "500",
    color: "#414141",
  },
});

export default styles;
