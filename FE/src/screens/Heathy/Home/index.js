import React, { memo, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import CustomText from "../../../components/CustomText";
import Layout from "../../../layouts/Layout";
import styles from "./styles";
import WorkoutRecord from "./NavigationItem/WorkoutRecord";
import Target from "./NavigationItem/Target";
import Sleep from "./NavigationItem/Sleep";
import IBMIndex from "./NavigationItem/IBMIndex";
import { useStep } from "../../../providers/StepProvider";
import { useNavigation } from "@react-navigation/native";
import { countTotalSecondStepOfDay } from "../../../data/stepCounter";
import { handleGetBMI } from "../../../services/bmi";
import { getAuthUserProperty } from "../../../data/user";
import { handleGetTargetStates } from "../../../services/userTargetState";
import * as DateTime from "../../../utils/datetime";
import { checkLevelBmi } from "../../../utils/bmiLevel";
import { getAllLocations } from "../../../data/locations";
import { getFilterDataMethod } from "../../../utils/workoutRecordMethod";

export default Home = memo(() => {
  const { steps } = useStep();
  const navigation = useNavigation();

  const [time, setTime] = useState(0);
  const [bmi, setBmi] = useState(null);
  const [userId, setUserId] = useState(null);
  const [targetState, setTargetState] = useState();
  const [workoutRecordData, setWorkoutRecordData] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      const ui = await getAuthUserProperty("user_id");
      setUserId(ui[0].user_id);
      getTargetState(ui[0].user_id);
      getTotalTime();
    };
    getInitialData();
  }, []);

  useEffect(() => {
    if (userId) {
      getBMIAndWorkoutRecord();
    }
  }, [userId]);

  const getTargetState = async (userId) => {
    const res = await handleGetTargetStates(userId);
    if (res.data) {
      setTargetState(res.data[DateTime.convertDate(new Date()).day - 2] || {});
    }
  };

  const getBMIAndWorkoutRecord = async () => {
    const bmiRes = await handleGetBMI(userId);
    if (bmiRes.success) {
      const weight = bmiRes.data?.weight == "null" ? "" : bmiRes.data?.weight;
      const height = bmiRes.data?.height == "null" ? "" : bmiRes.data?.height;
      setBmi({
        weight,
        height,
      });

      const allLocations = await getAllLocations();
      const filterData = getFilterDataMethod(allLocations, bmiRes.data.weight);
      setWorkoutRecordData(filterData);
    }
  };

  const getTotalTime = async () => {
    const res = await countTotalSecondStepOfDay();
    console.log(res);
    setTime(Math.floor(res / 60));
  };

  return (
    <Layout steps={steps} targetState={targetState}>
      <View style={styles.container}>
        <CustomText style={[styles.title]} fontFamily="NunitoSans-SemiBold">
          Sức khỏe
        </CustomText>

        <View style={styles.topContainer}>
          <View>
            <TouchableOpacity
              style={styles.topCircle}
              onPress={() => navigation.navigate("Footsteps")}
              activeOpacity={1}
            >
              <CustomText style={[{ color: "white" }]}>
                {steps.current?.count}
              </CustomText>
              <CustomText style={[{ color: "white" }]}>bước</CustomText>
            </TouchableOpacity>

            <CustomText style={[{ color: "white", textAlign: "center" }]}>
              {(steps.current.lengthTravel / 1000).toFixed(2)} Km
            </CustomText>
          </View>
          <View>
            <TouchableOpacity
              style={styles.topCircle}
              onPress={() => {}}
              activeOpacity={1}
            >
              <CustomText style={[{ color: "white" }]}>{time}</CustomText>
              <CustomText style={[{ color: "white" }]}>phút</CustomText>
            </TouchableOpacity>
            <CustomText style={[{ color: "white", textAlign: "center" }]}>
              {steps.current.calo.toFixed(2)} kcal
            </CustomText>
          </View>
        </View>

        <ScrollView
          style={{
            margin: -16,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
        >
          <View style={{ marginBottom: 16, flexDirection: "row" }}>
            <WorkoutRecord
              distance={
                workoutRecordData[0]?.distance
                  ? (workoutRecordData[0]?.distance / 1000).toFixed(3)
                  : 0
              }
            />
            <Target />
          </View>
          <View style={{ marginBottom: 16, flexDirection: "row" }}>
            <Sleep />
            <IBMIndex
              IBMValue={
                bmi
                  ? (bmi.weight / ((bmi.height * bmi.height) / 10000)).toFixed(
                      2
                    )
                  : "---"
              }
              IBMDescription={checkLevelBmi(bmi)}
            />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
});
