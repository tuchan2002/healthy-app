import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { homeScreenImages } from "../../../../assets/images/HomeScreen";
import CustomText from "../../../../components/CustomText";
import styles from "../styles";
import { useState, useEffect } from "react";
import { getStepByDate } from "../../../../data/stepCounter";
import moment from "moment";
import { buildSteps } from "../../../../constants/step";
import ChartStepHome from "../../../../components/screens/Healthy/Home/ChartStepHome";

const Sleep = () => {
  const [chartData, setChartData] = useState(new Array(96).fill(0));
  const navigation = useNavigation();
  const fetchSteps = async (date) => {
    const dateBuild = moment(date).format("YYYY-MM-DD");
    let steps = [];
    steps = await getStepByDate(dateBuild);
    const dataSteps = await buildSteps(steps, 96);
    setChartData(dataSteps);
  };

  useEffect(() => {
    fetchSteps(new Date());
  }, []);

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { marginRight: 8 }]}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Footsteps")}
    >
      <CustomText style={[{ fontSize: 14 }]}>Bước chân</CustomText>
      <ChartStepHome data={chartData} />
    </TouchableOpacity>
  );
};

export default Sleep;
