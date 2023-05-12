import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { homeScreenImages } from "../../../../assets/images/HomeScreen";
import CustomText from "../../../../components/CustomText";
import styles from "../styles";

const IBMIndex = ({ IBMValue, IBMDescription }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { marginLeft: 8 }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("BMISetting")}
    >
      <CustomText style={[{ fontSize: 14 }]}>BMI</CustomText>
      <CustomText
        style={[{ fontSize: 20, textAlign: "center", marginVertical: 10 }]}
      >
        {IBMValue}
      </CustomText>
      <CustomText style={[{ fontSize: 20, textAlign: "center" }]}>
        {IBMDescription}
      </CustomText>
    </TouchableOpacity>
  );
};

export default IBMIndex;
