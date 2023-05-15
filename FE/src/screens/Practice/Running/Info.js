import { PermissionsAndroid, StyleSheet, View } from "react-native";
import CustomText from "../../../components/CustomText";
import { convertDateToString1 } from "../../../utils/datetime";
import { useEffect, useState } from "react";
import UserButton from "../../../components/UserButton";
import { SCREEN_WIDTH } from "../../../constants/size";
import { updateRunningInfo } from "../../../data/runningInfo";
import { unregisterLocationTask } from "../../../utils/locationTask";

export default function Info({ info, onStop }) {
  const [runningInfo, setRunningInfo] = useState();
  useEffect(() => {
    setRunningInfo(info);

    return () => setRunningInfo(null);
  }, [info]);

  const handleStopRunning = async () => {
    const res = await updateRunningInfo({ runningInfoId: runningInfo.id });
    if (res.success) {
      setRunningInfo({
        ...runningInfo,
        isStopped: 1,
      });
      onStop(true);
      unregisterLocationTask();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomText style={[styles.distanceText]}>
          {Number.parseFloat(runningInfo?.distance).toFixed(2)}/
          <CustomText style={[{ fontSize: 32, fontFamily: "NunitoSans-Bold" }]}>
            {runningInfo?.target || "--"}km
          </CustomText>
        </CustomText>
        {!runningInfo?.isStopped && runningInfo?.isStarted ? (
          <UserButton
            style={styles.stopBtn}
            content={"Kết thúc"}
            onPress={handleStopRunning}
          />
        ) : (
          <></>
        )}
      </View>
      <CustomText style={[styles.dateTimeText]}>
        {convertDateToString1(runningInfo?.createdAt || new Date())}
      </CustomText>
      <View style={styles.extraInfo}>
        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Thời lượng</CustomText>
          <CustomText style={[styles.colValue]}>
            {runningInfo?.duration || "00:00:00"}
          </CustomText>
        </View>
        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Tốc độ</CustomText>
          <CustomText style={[styles.colValue]}>
            {info.speed || "0m/s"}
          </CustomText>
        </View>
        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Calo</CustomText>
          <CustomText style={[styles.colValue]}>
            {runningInfo?.calo || 0}kcal
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
  title: {
    width: SCREEN_WIDTH - (SCREEN_WIDTH / 100) * 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    maxHeight: 96,
  },
  stopBtn: {
    width: (SCREEN_WIDTH / 100) * 32,
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
