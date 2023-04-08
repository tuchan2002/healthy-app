import { StyleSheet, View } from "react-native";
import UserButton from "../../components/UserButton";

export default function Actions() {
  const handleSync = () => {};

  const handleSignOut = () => {};
  return (
    <View style={styles.container}>
      <UserButton content={"Đồng bộ"} onPress={handleSync} />
      <UserButton content={"Đăng xuất"} onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "4%",
    height: 160,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
