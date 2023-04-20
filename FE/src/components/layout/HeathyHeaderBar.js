import { StyleSheet, Text, View } from "react-native";
import MenuIcon from "./MenuIcon";
import CustomText from "../CustomText";
import BackButton from "./BackButton";

export default function HealthyHeaderBar({ title }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <BackButton />
        <CustomText style={[styles.text]} fontFamily="NunitoSans-SemiBold">
          {title}
        </CustomText>
      </View>
      <MenuIcon />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "2%",
  },

  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    marginLeft: 12,
  },
});
