import { StyleSheet, View } from "react-native";

export default function Dot({ bgColor = "#FF00D6" }) {
  return <View style={[styles.container, { backgroundColor: bgColor }]}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
});
