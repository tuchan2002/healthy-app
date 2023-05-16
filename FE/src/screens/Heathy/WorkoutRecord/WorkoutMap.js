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
import CustomText from "../../../components/CustomText";
import { convertTime } from "../../../utils/datetime";
import { useLoading } from "../../../providers/LoadingProvider";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";

export default function WorkoutMap({ route }) {
  const { setLoading } = useLoading();

  const { path, distance, kcal, duration } = route.params.dataPass;

  const [nowLocation, setNowLocation] = useState();

  useEffect(() => {
    const getInitialData = async () => {
      setLoading(true);
      await getPermissions();
      await getNowLocation();
      setLoading(false);
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
      <HealthyHeaderBar title="Hồ sơ chi tiết" />
      <View style={styles.extraInfo}>
        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Thời lượng</CustomText>
          <CustomText style={[styles.colValue]}>
            {convertTime(duration ? duration * 1000 : 0)}
          </CustomText>
        </View>

        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Quãng đường</CustomText>
          <CustomText style={[styles.colValue]}>
            {`${(distance ? distance / 1000 : 0).toFixed(3)} Km`}
          </CustomText>
        </View>

        <View style={styles.col}>
          <CustomText style={[styles.colLabel]}>Calo</CustomText>
          <CustomText style={[styles.colValue]}>
            {`${kcal ? kcal.toFixed(1) : 0} kcal`}
          </CustomText>
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
              coordinates={path}
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
  extraInfo: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: SCREEN_WIDTH,
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colLabel: {
    color: "#717171",
  },
});
