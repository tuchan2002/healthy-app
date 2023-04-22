import React, { useState, useEffect, useRef, memo, useMemo } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import CustomText from "../../../components/CustomText";
import Layout from "../../../layouts/Layout";
import styles from "./styles";
import WorkoutRecord from "./NavigationItem/WorkoutRecord";
import Target from "./NavigationItem/Target";
import Sleep from "./NavigationItem/Sleep";
import IBMIndex from "./NavigationItem/IBMIndex";
import { useNavigation } from "@react-navigation/native";
import { Accelerometer } from "expo-sensors";
import { FOOTERBAR_HEIGHT } from "../../../constants/size";

export default Home = memo(() => {
  const navigation = useNavigation();
  const [subscription, setSubscription] = useState(null);

  const useForceUpdate = () => {
    const [, setState] = useState();
    return () => setState({});
  };

  const forceUpdate = useForceUpdate();
  const steps = useRef(0);

  const _slow = () => {
    Accelerometer.setUpdateInterval(100);
  };

  _slow();

  const _subscribe = async () => {
    let mArray = [];
    let start = false;
    let peak = false;
    let valuePeak = 9.81;
    let magnitudePrev = 9.81;
    let magnitudeMiddle = 9.81;
    setSubscription(
      Accelerometer.addListener(async (data) => {
        const x = data.x;
        const y = data.y;
        const z = data.z;
        const magnitude = 9.81 * Math.sqrt(x * x + y * y + z * z);

        if (start === false) {
          if (magnitudePrev + 0.5 < magnitudeMiddle) {
            console.log("Start.................");
            start = true;
            mArray.push(magnitudePrev);
            mArray.push(magnitudeMiddle);
          }
        }

        if (start === true) {
          mArray.push(magnitude);
          if (
            peak === false &&
            magnitudePrev < magnitudeMiddle &&
            magnitudeMiddle > magnitude
          ) {
            peak = true;
            valuePeak = magnitudeMiddle;
          }

          if (peak === true && magnitudeMiddle > magnitude) {
            start = false;
            peak = false;
            if (valuePeak - mArray[0] > 3.5) {
              steps.current += 1;
            }
            console.log(steps.current);
            console.log(mArray);
            console.log("speed, ", valuePeak - mArray[0]);
            console.log("End.................");
            mArray = [];
            forceUpdate();
          }
        }
        magnitudePrev = magnitudeMiddle;
        magnitudeMiddle = magnitude;
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

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
              100 bước
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
