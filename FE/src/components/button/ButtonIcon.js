import React from "react";
import { TouchableOpacity } from "react-native";
import CustomText from "../CustomText";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const ButtonIcon = ({ content, onPress, color = "#FFA239", children }) => {
  return (
    <TouchableOpacity
      style={{
        height: 64,
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
        borderRadius: 10,
      }}
      onPress={onPress}
    >
      {children}
      <CustomText
        style={[{ color: "#FFA239", fontSize: 18, fontWeight: "bold" }]}
      >
        {content}
      </CustomText>
    </TouchableOpacity>
  );
};

export default ButtonIcon;
