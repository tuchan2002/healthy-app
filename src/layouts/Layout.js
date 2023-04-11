import { StyleSheet, View } from "react-native";
import FooterBar from "../components/layout/FooterBar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import { useRoute } from "@react-navigation/native";
import CustomFloatingAction from "../components/screens/Healthy/Home/CustomFloatingAction";

SplashScreen.preventAutoHideAsync();

export default function Layout({ children, activeMenu, isAuth = true }) {
  const { name } = useRoute();

  const [fontsLoaded] = useFonts({
    "NunitoSans-Regular": require("../assets/fonts/NunitoSans-Regular.ttf"),
    "NunitoSans-SemiBold": require("../assets/fonts/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Bold": require("../assets/fonts/NunitoSans-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {children}
      {isAuth && <FooterBar activeMenu={activeMenu} />}
      {name === "Home" && <CustomFloatingAction />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: "100%",
  },
});
