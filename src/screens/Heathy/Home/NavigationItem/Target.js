import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { homeScreenImages } from "../../../../assets/images/HomeScreen";
import CustomText from "../../../../components/CustomText";
import styles from "../styles";

const Target = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, { marginLeft: 5 }]}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("TargetsSetting")}
    >
      <CustomText style={[{ fontSize: 14 }]}>Mục tiêu</CustomText>
      <Image
        style={{
          width: "100%",
          height: 100,
          resizeMode: "contain",
        }}
        source={homeScreenImages["home2"]}
      />
    </TouchableOpacity>
  );
};

export default Target;
