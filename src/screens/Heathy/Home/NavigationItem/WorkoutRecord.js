import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { homeScreenImages } from "../../../../assets/images/HomeScreen";
import CustomText from "../../../../components/CustomText";
import styles from "../styles";

const WorkoutRecord = ({ distance }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { marginRight: 5 }]}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("WorkoutRecord")}
    >
      <CustomText style={[{ fontSize: 14 }]}>Hồ sơ tập luyện</CustomText>
      <CustomText style={[{ fontSize: 20 }]}>{`${distance}km`}</CustomText>
      <Image
        style={{
          width: "100%",
          height: 100,
          resizeMode: "contain",
        }}
        source={homeScreenImages["home1"]}
      />
    </TouchableOpacity>
  );
};

export default WorkoutRecord;
