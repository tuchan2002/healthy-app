import { StyleSheet, View } from "react-native";
import FooterBar from "../components/layout/FooterBar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function Layout({ children, activeMenu }) {
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
      <FooterBar activeMenu={activeMenu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: "100%",
  },
});
