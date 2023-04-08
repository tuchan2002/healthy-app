import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomText from "../CustomText";
import { useNavigation } from "@react-navigation/core";

export default function FooterBar({ activeMenu = "healthy" }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.push("Practice")}>
        <View style={styles.option}>
          <AntDesign
            name="star"
            size={30}
            color={activeMenu === "practice" ? "#FFA239" : "#848484"}
          />
          <CustomText
            style={[
              styles.text,
              activeMenu === "practice" && styles.activeText,
            ]}
          >
            Tập luyện
          </CustomText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("Home")}>
        <View style={styles.option}>
          <AntDesign
            name="heart"
            size={30}
            color={activeMenu === "healthy" ? "#FFA239" : "#848484"}
          />
          <CustomText
            style={[styles.text, activeMenu === "healthy" && styles.activeText]}
          >
            Sức khỏe
          </CustomText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("User")}>
        <View style={styles.option}>
          <AntDesign
            name="user"
            size={30}
            color={activeMenu === "user" ? "#FFA239" : "#848484"}
          />
          <CustomText
            style={[styles.text, activeMenu === "user" && styles.activeText]}
          >
            Người dùng
          </CustomText>
        </View>
      </TouchableOpacity>
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
