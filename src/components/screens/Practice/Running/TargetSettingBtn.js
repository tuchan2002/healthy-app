import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../CustomText";

export default function TargetSettingBtn() {
  return (
    <TouchableOpacity style={styles.container}>
      <CustomText>Đặt mục tiêu</CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    width: 168,
    borderRadius: 30,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
