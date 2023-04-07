import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../CustomText";

export default function StartBtn() {
  return (
    <TouchableOpacity style={styles.container}>
      <CustomText
        style={[{ fontSize: 20, color: "white", textAlign: "center" }]}
      >
        Bắt đầu
      </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "#FFA239",
    borderRadius: 50,
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
