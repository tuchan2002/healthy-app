import { PermissionsAndroid, StyleSheet, View } from "react-native";
import CustomText from "../../../components/CustomText";
import { convertDateToString1 } from "../../../utils/datetime";
import { useState } from "react";

export default function Info({ info }) {
  const [todayStepCount, setTodayStepCount] = useState(info.distance);

  return (
    <View style={styles.container}>
      <CustomText style={[styles.distanceText]}>
        {todayStepCount.toFixed(2)}/
        <CustomText style={[{ fontSize: 32, fontFamily: "NunitoSans-Bold" }]}>
          {info.target || "--"}km
        </CustomText>
      </CustomText>
      <CustomText style={[styles.dateTimeText]}>
        {convertDateToString1(info.createdAt || new Date())}
      </CustomText>
      <View style={styles.extraInfo}>
        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Thời lượng</CustomText>
          <CustomText style={[styles.colValue]}>
            {info.duration || "00:00:00"}
          </CustomText>
        </View>
        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Tốc độ</CustomText>
          <CustomText style={[styles.colValue]}>
            {info.speed || "00'00''"}
          </CustomText>
        </View>
        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Calo</CustomText>
          <CustomText style={[styles.colValue]}>
            {info.calo || 0}kcal
          </CustomText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: "2%",
  },
  distanceText: {
    fontSize: 48,
    fontFamily: "NunitoSans-Bold",
    paddingBottom: 0,
    marginBottom: 0,
  },
  dateTimeText: {
    color: "#717171",
    fontSize: 16,
    paddingTop: 0,
    marginTop: 0,
  },
  extraInfo: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 32,
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colLabel: {
    color: "#717171",
  },
});
