import { StyleSheet, View } from "react-native";
import Dot from "../../../../components/screens/Healthy/TargetsSetting/Dot";
import CustomText from "../../../../components/CustomText";
import CustomProgressChart from "../../../../components/screens/Healthy/TargetsSetting/CustomProgressChart";
import { useEffect, useState } from "react";
import { convertDateToString2 } from "../../../../utils/datetime";
import { useStep } from "../../../../providers/StepProvider";
import color from "../../../../constants/color";

export default function TopContent({ targetState, targetDetail }) {
  const [chartData, setChartData] = useState({
    data: [0, 0, 0],
    colors: ["#30b9bd", "#ff8c3d", "#a06ffa"],
  });

  const { steps } = useStep();

  useEffect(() => {
    if (targetState && targetDetail) {
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
        steps.current.count / targetDetail.footsteps_amount,
        targetState.kcal / targetDetail.kcal,
      ];
      setChartData({ ...chartData, data });
    }
  }, [targetState, targetDetail]);
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
            <Dot bgColor={color.step} />
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.text]}>
              Số bước:{" "}
              <CustomText style={[{ fontSize: 14 }]}>
                {steps.current.count || 0}
              </CustomText>{" "}
              bước
            </CustomText>
          </View>
        </View>
        <View style={styles.topBoxLineText}>
          <View style={styles.dot}>
            <Dot bgColor={color.calo} />
          </View>
          <View style={styles.textBox}>
            <CustomText style={[styles.text]}>
              Calo: {targetState?.kcal || "--"} calo
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
