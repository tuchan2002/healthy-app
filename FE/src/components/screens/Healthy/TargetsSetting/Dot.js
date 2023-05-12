import { StyleSheet, View } from "react-native";
import color from "../../../../constants/color"

export default function Dot({ bgColor = color.sleep }) {
  return <View style={[styles.container, { backgroundColor: bgColor }]}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
});
