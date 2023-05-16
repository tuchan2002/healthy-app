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
      style={[styles.itemContainer, { marginRight: 8 }]}
      activeOpacity={0.88}
      onPress={() => navigation.push("WorkoutRecord")}
    >
      <CustomText style={[{ fontSize: 14 }]}>Hồ sơ tập luyện</CustomText>
      <CustomText style={[{ fontSize: 20 }]}>{`${distance}km`}</CustomText>
      <Image
        style={{
          width: "100%",
          resizeMode: "contain",
        }}
        source={homeScreenImages["home1"]}
      />
    </TouchableOpacity>
  );
};

export default WorkoutRecord;
