import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { homeScreenImages } from "../../../../assets/images/HomeScreen";
import CustomText from "../../../../components/CustomText";
import styles from "../styles";
import { handleGetTargetStates } from "../../../../services/userTargetState";
import CustomProgressChart from "../../../../components/screens/Healthy/TargetsSetting/CustomProgressChart";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useStep } from "../../../../providers/StepProvider";

const Target = () => {
  const navigation = useNavigation();
  const { authUser } = useContext(AuthContext);
  const [targetState, setTargetState] = useState();
  const [targetDetail, setTargetDetail] = useState();
  const [chartData, setChartData] = useState({
    data: [0, 0, 0],
    colors: ["#30b9bd", "#ff8c3d", "#a06ffa"],
  });

  const { steps } = useStep();

  useEffect(() => {
    if (authUser) {
      getTargetStates();
    }
  }, [authUser]);

  const getTargetStates = async () => {
    const res = await handleGetTargetStates(authUser.user_id);
    // console.log(res);
    if (res.success) {
      setTargetState(res.data);
      setTargetDetail(res.data.UserTarget);
    }
  };

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
    <TouchableOpacity
      style={[styles.itemContainer, { marginLeft: 8 }]}
      activeOpacity={0.88}
      onPress={() => navigation.navigate("TargetsSetting")}
    >
      <CustomText style={[{ fontSize: 14 }]}>Mục tiêu</CustomText>
      <CustomProgressChart
        size={{
          height: Dimensions.get("window").width / 2 - 54,
          width: Dimensions.get("window").width / 2 - 54,
        }}
        data={chartData}
        backgroundColor="white"
      />
    </TouchableOpacity>
  );
};

export default Target;
