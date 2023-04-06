import { StyleSheet, View } from "react-native";
import FooterBar from "../components/layout/FooterBar";

export default function Layout({ children, activeMenu }) {
  return (
    <View style={styles.container}>
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
