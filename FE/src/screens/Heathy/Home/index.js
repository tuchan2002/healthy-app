import React, { memo } from "react";
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

export default Home = memo(() => {
  const { steps } = useStep();
  const navigation = useNavigation();

  return (
    <Layout>
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
                {steps.current}
              </CustomText>
              <CustomText style={[{ color: "white" }]}>bước</CustomText>
            </TouchableOpacity>

            <CustomText style={[{ color: "white", textAlign: "center" }]}>
              1.0 Km
            </CustomText>
          </View>
          <View>
            <TouchableOpacity
              style={styles.topCircle}
              onPress={() => {}}
              activeOpacity={1}
            >
              <CustomText style={[{ color: "white" }]}>--</CustomText>
              <CustomText style={[{ color: "white" }]}>phút</CustomText>
            </TouchableOpacity>
            <CustomText style={[{ color: "white", textAlign: "center" }]}>
              0 kcal
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
            <WorkoutRecord distance={2.86} />
            <Target />
          </View>
          <View style={{ marginBottom: 16, flexDirection: "row" }}>
            <Sleep />
            <IBMIndex IBMValue={32.25} IBMDescription="Hơi béo" />
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
});
