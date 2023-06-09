import React from "react";
import { ScrollView, View } from "react-native";
import CustomText from "../../../components/CustomText";
import Layout from "../../../layouts/Layout";
import styles from "./styles";
import WorkoutRecord from "./NavigationItem/WorkoutRecord";
import Target from "./NavigationItem/Target";
import Sleep from "./NavigationItem/Sleep";
import IBMIndex from "./NavigationItem/IBMIndex";

export default function Home() {
  return (
    <Layout>
      <View style={styles.container}>
        <CustomText style={[styles.title]} fontFamily="NunitoSans-SemiBold">
          Sức khỏe
        </CustomText>

        <View style={styles.topContainer}>
          <View>
            <View style={styles.topCircle}>
              <CustomText style={[{ color: "white" }]}>--</CustomText>
              <CustomText style={[{ color: "white" }]}>bước</CustomText>
            </View>

            <CustomText style={[{ marginLeft: "auto", color: "white" }]}>
              100 bước
            </CustomText>
          </View>
          <View>
            <View style={styles.topCircle}>
              <CustomText style={[{ color: "white" }]}>--</CustomText>
              <CustomText style={[{ color: "white" }]}>phút</CustomText>
            </View>
            <CustomText style={[{ color: "white" }]}>0 kcal</CustomText>
          </View>
        </View>

        <ScrollView
          style={{
            marginBottom: 60,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
            }}
          >
            <WorkoutRecord distance={2.86} />
            <Target />
          </View>
          <View style={{ marginBottom: 10, flexDirection: "row" }}>
            <Sleep />
            <IBMIndex IBMValue={32.25} IBMDescription="Hơi béo" />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
