import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../../CustomText";
import { FontAwesome5 } from "@expo/vector-icons";
import color from "../../../../constants/color";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import {
  convertDateToString1,
  convertDateToString3,
} from "../../../../utils/datetime";

const WorkoutRecordItem = ({ workoutRecord }) => {
  const navigation = useNavigation();

  const { times, date, duration, distance, kcal } = workoutRecord;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Home")}
    >
      <CustomText
        style={[{ textTransform: "uppercase" }]}
        fontFamily="NunitoSans-SemiBold"
      >
        {convertDateToString1(date)}
      </CustomText>
      <View style={{ flexDirection: "row" }}>
        <CustomText
          style={[{ marginRight: 32 }]}
          fontFamily="NunitoSans-SemiBold"
        >
          {`Lần ${times}`}
        </CustomText>
        <CustomText>{(duration / 60).toFixed(1)} phút</CustomText>
      </View>
      <CustomText style={[{ marginVertical: 16 }]}>
        Chạy bộ ngoài trời
      </CustomText>
      <View style={styles.bottomContainer}>
        <View style={styles.iconWrapper}>
          <FontAwesome5 name="walking" size={28} color="white" />
        </View>
        <CustomText
          style={[{ marginHorizontal: 32 }]}
          fontFamily="NunitoSans-SemiBold"
        >
          {`${(distance / 1000).toFixed(3)} Km`}
        </CustomText>
        <CustomText fontFamily="NunitoSans-SemiBold">
          {`${kcal.toFixed(0)} kcal`}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 18,
    paddingTop: 12,
    marginBottom: 12,
  },
  iconWrapper: {
    backgroundColor: color.primary,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default WorkoutRecordItem;
