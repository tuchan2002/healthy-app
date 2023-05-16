import { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Layout from "../../../layouts/Layout";
import { StyleSheet, View } from "react-native";
import {
  FOOTERBAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUSBAR_HEIGHT,
} from "../../../constants/size";

export default function WorkoutMap({ path = [] }) {
  const [nowLocation, setNowLocation] = useState();

  useEffect(() => {
    const getInitialData = async () => {
      await getPermissions();
      await getNowLocation();
    };
    getInitialData();
  }, []);

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Hãy cho phép ứng dụng lấy thông tin vị trí của bạn!");
      return;
    }
  };

  const getNowLocation = async () => {
    const currentPermission = await Location.getForegroundPermissionsAsync();
    if (currentPermission.granted) {
      const location = await Location.getCurrentPositionAsync();
      setNowLocation(location.coords);
    }
  };
  return (
    <Layout>
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
                path[0] || {
                  latitude: nowLocation.latitude,
                  longitude: nowLocation.longitude,
                }
              }
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: "white",
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: "#9bcf1a",
                }}
              ></View>
            </Marker>
            <Polyline
              coordinates={[]}
              strokeWidth={6}
              strokeColor={"#80e6f1"}
            />
            <Marker
              title="Hiện tại"
              pinColor="red"
              coordinate={
                path[path.length - 1] || {
                  latitude: nowLocation.latitude,
                  longitude: nowLocation.longitude,
                }
              }
            />
          </MapView>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  map: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - FOOTERBAR_HEIGHT,
  },
});
