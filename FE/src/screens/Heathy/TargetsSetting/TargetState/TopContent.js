import { StyleSheet, View } from "react-native";
import Dot from "../../../../components/screens/Healthy/TargetsSetting/Dot";
import CustomText from "../../../../components/CustomText";
import CustomProgressChart from "../../../../components/screens/Healthy/TargetsSetting/CustomProgressChart";
import { useEffect, useState } from "react";
import { convertDateToString2 } from "../../../../utils/datetime";
import { useStep } from "../../../../providers/StepProvider";
import color from "../../../../constants/color";

export default function TopContent({ targetState, targetDetail }) {
  const [_targetState, set_targetState] = useState();
  const [_targetDetail, set_targetDetail] = useState();
  const [chartData, setChartData] = useState({
    data: [0, 0, 0],
    colors: ["#30b9bd", "#ff8c3d", "#a06ffa"],
  });

  const { steps } = useStep();

  useEffect(() => {
    set_targetDetail(targetDetail);
    set_targetState(targetState);
  }, [targetState, targetDetail]);

  useEffect(() => {
    if (_targetState && _targetDetail) {
      let timeProgress = 0;
      if (_targetState.gotUpAt) {
        timeProgress +=
          new Date(_targetState.gotUpAt) <= new Date(_targetDetail.getUpAt)
            ? 0.5
            : 0;
      }
      if (_targetState.sleepedAt) {
        timeProgress +=
          new Date(_targetState.sleepedAt) <= new Date(_targetDetail.sleepAt)
            ? 0.5
            : 0;
      }
      const data = [
        timeProgress,
        steps.current.count / _targetDetail.footsteps_amount,
        _targetState.kcal / _targetDetail.kcal,
      ];
      setChartData({ ...chartData, data });
    }
  }, [_targetState, _targetDetail]);

  console.log(chartData);
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
              Thức vào: {convertDateToString2(_targetState?.gotUpAt) || "--"}
            </CustomText>
            <CustomText style={[styles.text]}>
              Ngủ vào: {convertDateToString2(_targetState?.sleepedAt) || "--"}{" "}
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
              Calo: {_targetState?.kcal || "--"} calo
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
