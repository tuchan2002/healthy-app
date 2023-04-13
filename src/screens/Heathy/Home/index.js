import React, {useState, useEffect, useRef} from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import CustomText from "../../../components/CustomText";
import Layout from "../../../layouts/Layout";
import styles from "./styles";
import WorkoutRecord from "./NavigationItem/WorkoutRecord";
import Target from "./NavigationItem/Target";
import Sleep from "./NavigationItem/Sleep";
import IBMIndex from "./NavigationItem/IBMIndex";
import { useNavigation } from "@react-navigation/native";
import { Accelerometer } from 'expo-sensors';
import { FOOTERBAR_HEIGHT } from "../../../constants/size";
export default function Home() {
  const navigation = useNavigation();
  const [magnitudePrev, setMagnitudePrev] = useState(9)
  const [change, setOnchange] = useState(false)
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const steps = useRef(0)

  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
        Accelerometer.addListener((data)=> {
          const x = data.x * 9.81;
          const y = data.y * 9.81;
          const z = data.z * 9.81;
          const magnitude = Math.sqrt(x*x + y*y + z*z)
          const magnitudeDelta  = magnitude - magnitudePrev;
          setMagnitudePrev(magnitude)
          if (magnitudeDelta > 3) {
            steps.current += 1
            setOnchange(!change)
          }
          setData(data)
        })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // useEffect(() => {
  //   _subscribe();
  //   return () => _unsubscribe();
  // }, []);




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
              <CustomText style={[{ color: "white" }]}>{steps.current}</CustomText>
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
        {/* <View>
          <CustomText>
            Vui lòng cấp quyền đếm bước chân
          </CustomText>
          <CustomText style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</CustomText>
          <CustomText style={styles.text}>x: {x}</CustomText>
          <CustomText style={styles.text}>y: {y}</CustomText>
          <CustomText style={styles.text}>z: {z}</CustomText>
        </View> */}

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
}
