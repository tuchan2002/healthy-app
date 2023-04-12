import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import CustomText from "../../../components/CustomText";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";
import OverviewItem from "../../../components/screens/Healthy/WorkoutRecord/OverviewItem";
import WorkoutRecordItem from "../../../components/screens/Healthy/WorkoutRecord/WorkoutRecordItem";
import Layout from "../../../layouts/Layout";
import styles from "./styles";
import workoutRecords from "../../../assets/fakeDatas/workoutRecords";

const WorkoutRecord = () => {
  const totalCalories = useMemo(() => {
    return workoutRecords.reduce((total, wkRecord) => total + wkRecord.kcal, 0);
  }, [workoutRecords]);

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
          <OverviewItem overviewValue={9.2} overviewLabel="Thời lượng (giờ)" />
          <OverviewItem
            overviewValue={workoutRecords.length}
            overviewLabel="Số lần tập"
          />
          <OverviewItem
            overviewValue={totalCalories}
            overviewLabel="Lượng kcal"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {workoutRecords.map((wkRecord) => (
            <WorkoutRecordItem
              key={wkRecord.id}
              workoutRecord={{ ...wkRecord, times: wkRecord.id }}
            />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};

export default WorkoutRecord;
