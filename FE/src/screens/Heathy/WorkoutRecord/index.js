import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import CustomText from "../../../components/CustomText";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";
import OverviewItem from "../../../components/screens/Healthy/WorkoutRecord/OverviewItem";
import WorkoutRecordItem from "../../../components/screens/Healthy/WorkoutRecord/WorkoutRecordItem";
import Layout from "../../../layouts/Layout";
import styles from "./styles";
import { getAllLocations } from "../../../data/locations";
import { handleGetBMI } from "../../../services/bmi";
import { getAuthUserProperty } from "../../../data/user";
import {
  getFilterDataMethod,
  getTopData,
} from "../../../utils/workoutRecordMethod";
import { useLoading } from "../../../providers/LoadingProvider";

const WorkoutRecord = () => {
  const { setLoading } = useLoading();

  const [workoutRecordData, setWorkoutRecordData] = useState([]);
  const [topData, setTopData] = useState({ duration: 0, times: 0, kcal: 0 });

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const ui = await getAuthUserProperty("user_id");
      const bmiRes = await handleGetBMI(ui[0].user_id);
      const allLocations = await getAllLocations();
      const filterData = getFilterDataMethod(allLocations, bmiRes.data.weight);
      setWorkoutRecordData(filterData);

      const topData = getTopData(filterData);
      setTopData(topData);
      setLoading(false);
    };
    fetchInitialData();
  }, []);

  return (
    <Layout>
      <HealthyHeaderBar title="Hồ sơ luyện tập" />
      <View style={styles.container}>
        <CustomText
          style={[{ fontSize: 20, textAlign: "center" }]}
          fontFamily="NunitoSans-SemiBold"
        >
          Tổng quan
        </CustomText>
        <View style={styles.overviewContainer}>
          <OverviewItem
            overviewValue={(topData.duration / 3600).toFixed(2)}
            overviewLabel="Thời lượng (giờ)"
          />
          <OverviewItem
            overviewValue={topData.times}
            overviewLabel="Số lần tập"
          />
          <OverviewItem
            overviewValue={topData.kcal.toFixed(0)}
            overviewLabel="Lượng kcal"
          />
        </View>

        {workoutRecordData.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {workoutRecordData.map((wkRecord, index) => (
              <WorkoutRecordItem
                key={index}
                workoutRecord={{
                  ...wkRecord,
                  times: workoutRecordData.length - index,
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Bạn chưa có lần tập luyện nào.
            </Text>
          </View>
        )}
      </View>
    </Layout>
  );
};

export default WorkoutRecord;
