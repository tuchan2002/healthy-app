import React, { useState } from "react";
import { FloatingAction } from "react-native-floating-action";
import { homeScreenImages } from "../../../../assets/images/HomeScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../../../constants/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import { convertDateToString2 } from "../../../../utils/datetime";

const CustomFloatingAction = ({ targetState, stepDoneCount }) => {
  const route = useRoute();

  const navigation = useNavigation();

  const [isShowFloatingAction, setIsShowFloatingAction] = useState(false);

  return (
    <FloatingAction
      actions={[
        {
          text: `Số bước ${stepDoneCount}/${targetState?.UserTarget?.footsteps_amount} bước`,
          name: "TargetsSetting_1",
          color: "#fff",
          buttonSize: 30,
          icon: (
            <MaterialCommunityIcons
              name="foot-print"
              size={21}
              color="#FFBC39"
            />
          ),
          textStyle: {
            fontFamily: "NunitoSans-Regular",
            fontSize: 14,
            lineHeight: 14,
            paddingTop: 5,
          },
          position: 1,
        },
        {
          text: `Thức dậy --/${
            convertDateToString2(targetState?.UserTarget?.getUpAt) + " SA"
          }`,
          name: "TargetsSetting_2",
          color: "#fff",
          buttonSize: 30,
          icon: (
            <MaterialCommunityIcons
              name="human-handsup"
              size={21}
              color="#FF00D6"
            />
          ),
          textStyle: {
            fontFamily: "NunitoSans-Regular",
            fontSize: 14,
            lineHeight: 14,
            paddingTop: 5,
          },
          position: 2,
        },
      ]}
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
