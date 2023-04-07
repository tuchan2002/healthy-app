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
      style={[styles.itemContainer, { marginLeft: 5 }]}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("TargetsSetting")}
    >
      <CustomText style={[{ fontSize: 14 }]}>IBM</CustomText>
      <CustomText
        style={[{ fontSize: 20, textAlign: "center", marginVertical: 10 }]}
      >
        {IBMValue}
      </CustomText>
      <CustomText style={[{ fontSize: 20, textAlign: "center" }]}>
        {IBMDescription}
      </CustomText>
      <Image
        style={{
          width: 45,
          height: 45,
          resizeMode: "contain",
          marginLeft: "auto",
          marginTop: 10,
        }}
        source={homeScreenImages["home4"]}
      />
    </TouchableOpacity>
  );
};

export default IBMIndex;
