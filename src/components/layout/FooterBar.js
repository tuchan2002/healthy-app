import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function FooterBar({ activeMenu = "healthy" }) {
  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <AntDesign name="star" size={30} color={activeMenu === "practice" ? "#FFA239" : "#848484"} />
        <Text style={[styles.text, activeMenu === "practice" && styles.activeText]}>Tập luyện</Text>
      </View>
      <View style={styles.option}>
        <AntDesign name="heart" size={30} color={activeMenu === "healthy" ? "#FFA239" : "#848484"} />
        <Text style={[styles.text, activeMenu === "healthy" && styles.activeText]}>Sức khỏe</Text>
      </View>
      <View style={styles.option}>
        <AntDesign name="user" size={30} color={activeMenu === "user" ? "#FFA239" : "#848484"} />
        <Text style={[styles.text, activeMenu === "practice" && styles.activeText]}>Người dùng</Text>
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
