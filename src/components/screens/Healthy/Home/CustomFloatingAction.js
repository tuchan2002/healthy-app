import React, { useState } from "react";
import { FloatingAction } from "react-native-floating-action";
import { homeScreenImages } from "../../../../assets/images/HomeScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../../../constants/color";
import { useNavigation, useRoute } from "@react-navigation/native";

const actions = [
  {
    text: "Số bước 0/10000 bước",
    name: "TargetsSetting_1",
    color: "#fff",
    buttonSize: 30,
    icon: (
      <MaterialCommunityIcons name="foot-print" size={21} color="#FFBC39" />
    ),
    textStyle: {
      fontFamily: "NunitoSans-Regular",
      fontSize: 14,
      lineHeight: 14,
      paddingVertical: 5,
    },
    position: 1,
  },
  {
    text: "Thức dậy --/7:00",
    name: "TargetsSetting_2",
    color: "#fff",
    buttonSize: 30,
    icon: (
      <MaterialCommunityIcons name="human-handsup" size={21} color="#FF00D6" />
    ),
    textStyle: {
      fontFamily: "NunitoSans-Regular",
      fontSize: 14,
      lineHeight: 14,
      paddingVertical: 5,
    },
    position: 2,
  },
];
const CustomFloatingAction = () => {
  const route = useRoute();
  console.log("route", route.name);

  const navigation = useNavigation();

  const [isShowFloatingAction, setIsShowFloatingAction] = useState(false);

  return (
    <FloatingAction
      actions={actions}
      onPressItem={(name) => {
        const routeName = name.split("_")[0];
        navigation.navigate(routeName);
      }}
      onOpen={() => {
        setIsShowFloatingAction(true);
      }}
      onClose={() => {
        setIsShowFloatingAction(false);
      }}
      distanceToEdge={{ vertical: 85, horizontal: 30 }}
      color={color.primary}
      iconWidth={31}
      iconHeight={24}
      buttonSize={50}
      floatingIcon={
        !isShowFloatingAction ? (
          homeScreenImages["home4"]
        ) : (
          <Ionicons name="close-outline" size={40} color="white" />
        )
      }
    />
  );
};

export default CustomFloatingAction;
