import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "../CustomText";

export default function FooterBar({ activeMenu = "healthy" }) {
  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <AntDesign name="star" size={30} color={activeMenu === "practice" ? "#FFA239" : "#848484"} />
        <CustomText style={[styles.text, activeMenu === "practice" && styles.activeText]}>Tập luyện</CustomText>
      </View>
      <View style={styles.option}>
        <AntDesign name="heart" size={30} color={activeMenu === "healthy" ? "#FFA239" : "#848484"} />
        <CustomText style={[styles.text, activeMenu === "healthy" && styles.activeText]}>Sức khỏe</CustomText>
      </View>
      <View style={styles.option}>
        <AntDesign name="user" size={30} color={activeMenu === "user" ? "#FFA239" : "#848484"} />
        <CustomText style={[styles.text, activeMenu === "practice" && styles.activeText]}>Người dùng</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6",
    height: 60,
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "2%",
  },
  text: {
    color: "#848484",
  },
  activeText: {
    color: "#FFA239",
  },
  option: {
    display: "flex",
    alignItems: "center",
  },
});
