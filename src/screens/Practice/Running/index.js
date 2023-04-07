import { Dimensions, StyleSheet, View } from "react-native";
import Actions from "./Actions";
import Info from "./Info";
import runningInfo from "../../../assets/fakeDatas/runningInfo";
import MapView from "react-native-maps";

const { height: SCREEN_HEIGHT, width: SCEEN_WIDTH } = Dimensions.get("window");

export default function Running() {
  return (
    <View>
      <View style={styles.content}>
        <Actions />
        <View style={styles.info}>
          <Info info={runningInfo} />
        </View>
      </View>
      <View>
        <MapView style={styles.content} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: SCREEN_HEIGHT - 50 - 48 - 20 - 60,
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    marginHorizontal: "2%",
    backgroundColor: "rgba(0, 0, 5, 0.3)",
    borderRadius: 10,
    position: "relative",
    justifyContent: "center",
  },
  info: {
    position: "absolute",
    bottom: 0,
    width: SCEEN_WIDTH - (SCEEN_WIDTH / 100) * 4,
  },
});
