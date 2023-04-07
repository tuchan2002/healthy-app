import { StyleSheet, View } from "react-native";
import TargetSettingBtn from "../../../components/screens/Practice/Running/TargetSettingBtn";
import StartBtn from "../../../components/screens/Practice/Running/StartBtn";

export default function Actions() {
  return (
    <View style={styles.container}>
      <TargetSettingBtn />
      <StartBtn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 160,
  },
});
