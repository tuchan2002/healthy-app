import { StyleSheet, View } from "react-native";
import Dot from "../../../../components/screens/Healthy/TargetsSetting/Dot";
import CustomText from "../../../../components/CustomText";
import CustomProgressChart from "../../../../components/screens/Healthy/TargetsSetting/CustomProgressChart";
import { useEffect, useState } from "react";
import { convertDateToString2 } from "../../../../utils/datetime";

export default function TopContent({ targetState, targetDetail }) {
  const [chartData, setChartData] = useState({
    data: [0, 0, 0],
    colors: [
      "rgba(255, 0, 214, 1)",
      "rgba(255, 188, 57, 1)",
      "rgba(96, 207, 255, 1)",
    ],
  });

  useEffect(() => {
    if (targetState) {
      let timeProgress = 0;
      if (targetState.gotUpAt) {
        timeProgress +=
          new Date(targetState.gotUpAt) <= new Date(targetDetail.getUpAt)
            ? 0.5
            : 0;
      }
      if (targetState.sleepedAt) {
        timeProgress +=
          new Date(targetState.sleepedAt) <= new Date(targetDetail.sleepAt)
            ? 0.5
            : 0;
      }
      const data = [
        timeProgress,
        targetState.stepsNumber / targetDetail.stepsNumber,
        targetState.calo / targetDetail.calo,
      ];
      setChartData({ ...chartData, data });
    }
  }, [targetState]);
  return (
    <View style={styles.container}>
      <View>
        <CustomProgressChart data={chartData} />
      </View>
      <View>
        <View style={styles.topBoxLineText}>
          <View style={styles.dot}>
            <Dot />
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.text]}>
              Thức vào: {convertDateToString2(targetState?.gotUpAt) || "--"}
            </CustomText>
            <CustomText style={[styles.text]}>
              Ngủ vào: {convertDateToString2(targetState?.sleepedAt) || "--"}{" "}
            </CustomText>
          </View>
        </View>
        <View style={styles.topBoxLineText}>
          <View style={styles.dot}>
            <Dot bgColor="#FFBC39" />
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.text]}>
              Số bước:{" "}
              <CustomText style={[{ fontSize: 14 }]}>
                {targetState?.stepsNumber || 0}
              </CustomText>{" "}
              bước
            </CustomText>
          </View>
        </View>
        <View style={styles.topBoxLineText}>
          <View style={styles.dot}>
            <Dot bgColor="#60CFFF" />
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.text]}>
              Calo: {targetState?.calo || "--"} calo
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 60,
  },
  topBoxLineText: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
  },

  dot: {
    marginTop: 8,
  },

  textBox: {
    marginLeft: 8,
  },

  text: {
    fontSize: 10,
    lineHeight: 16,
  },
});
