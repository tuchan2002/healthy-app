import { StyleSheet, View } from "react-native";
import CustomText from "../../../../components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { convertDate, convertDateToString2 } from "../../../../utils/datetime";
import { useEffect, useState } from "react";
import StateDetailBox from "../../../../components/screens/Healthy/TargetsSetting/StateDetailBox";

export default function BottomContent({
  targetState,
  targetDetail: tD,
  onChange,
}) {
  const [isNow, setIsNow] = useState(false);
  const [targetDetail, setTargetDetail] = useState(tD);

  useEffect(() => {
    setIsNow(
      convertDate(targetState.createdAt).date === convertDate(new Date()).date,
    );
  }, [targetState]);

  const handleChangeState = (value) => {
    const newTargetDetail = {
      ...targetDetail,
      ...value,
    };
    setTargetDetail(newTargetDetail);
    onChange(newTargetDetail);
  };

  return (
    <View style={styles.bottom}>
      <View style={styles.leftBottom}>
        <Feather name="sunrise" size={12} color="black" />
        <View style={styles.line}></View>
        <FontAwesome5 name="moon" size={12} color="black" />
      </View>
      <View style={styles.rightBottom}>
        <StateDetailBox
          title="Thức dậy"
          content={
            (convertDateToString2(targetState?.gotUpAt) || "--") +
            "/" +
            convertDateToString2(targetDetail.getUpAt) +
            " SA"
          }
          icon={<Ionicons name="sunny" size={24} color="black" />}
          editable={isNow}
          onChange={(value) => handleChangeState({ getUpAt: value })}
        >
          <StateDetailBox.TimePickerInput defaultValue={targetDetail.getUpAt} />
        </StateDetailBox>
        <StateDetailBox
          title="Hoạt động"
          content="Nghỉ ngơi"
          icon={<FontAwesome5 name="hotjar" size={24} color="black" />}
          editable={isNow}
        >
          <></>
        </StateDetailBox>
        <StateDetailBox
          title="Số bước"
          content={
            <CustomText>
              <CustomText style={[{ fontSize: 20 }]}>
                {targetState?.stepsNumber || "0"}
              </CustomText>
              /{targetDetail.stepsNumber} bước
            </CustomText>
          }
          icon={
            <MaterialCommunityIcons name="foot-print" size={24} color="black" />
          }
          editable={isNow}
          onChange={(value) => handleChangeState({ stepsNumber: value })}
        >
          <StateDetailBox.FootStepsInput />
        </StateDetailBox>
        <StateDetailBox
          title="Đi ngủ"
          content={
            (convertDateToString2(targetState?.sleepedAt) || "--") +
            "/" +
            convertDateToString2(targetDetail.sleepAt) +
            " SA"
          }
          icon={<Ionicons name="moon" size={24} color="black" />}
          editable={isNow}
          onChange={(value) => handleChangeState({ sleepAt: value })}
        >
          <StateDetailBox.TimePickerInput defaultValue={targetDetail.sleepAt} />
        </StateDetailBox>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftBottom: {
    width: "8%",
    height: 244,
    display: "flex",
    justifyContent: "space-between",
  },

  rightBottom: {
    width: "90%",
  },

  line: {
    width: 6,
    height: 204,
    borderColor: "black",
    borderRightWidth: 1,
    borderStyle: "dashed",
  },
});
