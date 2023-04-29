import { StyleSheet, View } from "react-native";
import Actions from "./Actions";
import Info from "./Info";
import runningInfo from "../../../assets/fakeDatas/runningInfo";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FOOTERBAR_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH, STATUSBAR_HEIGHT } from "../../../constants/size";

export default function Running() {
  const [defaultRunningInfo, setDefaultRunningInfo] = useState(runningInfo);

  const handleChangeTarget = (newTarget) => {
    setDefaultRunningInfo({
      ...defaultRunningInfo,
      target: newTarget,
    });
  };

  const handleStartRunning = () => {
    setDefaultRunningInfo({
      ...defaultRunningInfo,
      isStarted: true,
    });
  };

  return (
    <View>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.4)", "transparent"]}
        style={[
          styles.content,
          {
            zIndex:
              defaultRunningInfo.target && defaultRunningInfo.isStarted ? 1 : 2,
          },
        ]}
      >
        <Actions
          target={defaultRunningInfo.target}
          isStarted={defaultRunningInfo.isStarted}
          onChangeInput={handleChangeTarget}
          onStart={handleStartRunning}
        />
      </LinearGradient>
      <View style={{ zIndex: 3, marginHorizontal: "2%" }}>
        <View style={styles.info}>
          <Info info={defaultRunningInfo} />
        </View>
      </View>
      <View style={[styles.content, styles.mapContainer]}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 21.0292,
            longitude: 105.8526,
            latitudeDelta: 0,
            longitudeDelta: 3,
          }}
          provider={ PROVIDER_GOOGLE }
        >
          <Marker
            title="Xuất phát"
            coordinate={{ latitude: 21.0292, longitude: 105.8526 }}
          />
          <Polyline
            coordinates={[
              { latitude: 21.0292, longitude: 105.8526 },
              { latitude: 21.03, longitude: 105.8526 },
              { latitude: 21.033, longitude: 105.853 },
              { latitude: 21.034, longitude: 105.854 },
              { latitude: 21.02, longitude: 105.855 },
              { latitude: 20.02, longitude: 105.855 },
              { latitude: 20.02, longitude: 105.9 },
              { latitude: 21.0292, longitude: 106.8526 },
            ]}
            strokeWidth={4}
            strokeColor="violet"
          />
          <Marker
            title="Hiện tại"
            pinColor="blue"
            coordinate={{ latitude: 21.0292, longitude: 106.8526 }}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: SCREEN_HEIGHT - STATUSBAR_HEIGHT - 48 - 20 - FOOTERBAR_HEIGHT,
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    marginHorizontal: "2%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
    position: "relative",
    justifyContent: "center",
  },
  info: {
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH - (SCREEN_WIDTH / 100) * 4,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  mapContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    width: SCREEN_WIDTH - (SCREEN_WIDTH / 100) * 4,
    zIndex: 1,
  },
});
