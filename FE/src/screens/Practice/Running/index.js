import { StyleSheet, View } from "react-native";
import Actions from "./Actions";
import Info from "./Info";
import runningInfo from "../../../assets/fakeDatas/runningInfo";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  FOOTERBAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUSBAR_HEIGHT,
} from "../../../constants/size";
import * as Location from "expo-location";
import {
  LOCATION_TASK_NAME,
  registerLocationTask,
} from "../../../utils/locationTask";
import { createTableLocations, getTheLocation } from "../../../data/locations";

export let forceUpdateLocations;

export default function Running() {
  const [defaultRunningInfo, setDefaultRunningInfo] = useState(runningInfo);
  const [nowLocation, setNowLocation] = useState();
  const path = useRef(0);

  const getPath = async () => {
    const theLocation = await getTheLocation();
    path.current = theLocation;
  };

  const useForceUpdate = () => {
    const [, setState] = useState();
    getPath();
    return () => setState({});
  };

  forceUpdateLocations = useForceUpdate();

  useEffect(() => {
    createTableLocations();
    getPath();
    getNowLocation();
  }, []);

  const getNowLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    setNowLocation(location.coords);
  };

  useEffect(() => {
    if (defaultRunningInfo.isStarted) {
      startBackgroundTracking();
      registerLocationTask();
    }
  }, [defaultRunningInfo]);

  const startBackgroundTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.LocationAccuracy.BestForNavigation,
      timeInterval: 1000,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Title",
        notificationBody: "This is body!",
        notificationColor: "#AA1111",
      },
      deferredUpdatesInterval: 100,
      activityType: Location.ActivityType.AutomotiveNavigation,
    });
  };

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Hãy cho phép ứng dụng lấy thông tin vị trí của bạn!");
      return;
    }
  };

  const handleChangeTarget = (newTarget) => {
    setDefaultRunningInfo({
      ...defaultRunningInfo,
      target: newTarget,
    });
  };

  const handleStartRunning = async () => {
    if (!defaultRunningInfo.isStarted) {
      getPermissions();
      if (!nowLocation) {
        await getNowLocation();
      }
      setDefaultRunningInfo({
        ...defaultRunningInfo,
        isStarted: true,
      });
    }
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
        {nowLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: nowLocation.latitude,
              longitude: nowLocation.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
            provider={PROVIDER_GOOGLE}
          >
            <Marker
              title="Xuất phát"
              pinColor="blue"
              coordinate={
                path.current[0] || {
                  latitude: nowLocation.latitude,
                  longitude: nowLocation.longitude,
                }
              }
            />
            <Polyline
              coordinates={path.current}
              strokeWidth={6}
              strokeColor={"orange"}
            />
            <Marker
              title="Hiện tại"
              pinColor="red"
              coordinate={
                path.current[path.current.length - 1] || {
                  latitude: nowLocation.latitude,
                  longitude: nowLocation.longitude,
                }
              }
            />
          </MapView>
        )}
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
