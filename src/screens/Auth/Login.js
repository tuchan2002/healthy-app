import { StyleSheet, View } from "react-native";
import CustomText from "../../components/CustomText";
import UserButton from "../../components/UserButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";

export default function Login({ navigation }) {
  const handleLoginViaFacebook = () => {
    navigation.push("Home");
  };

  const handleLoginViaGoogle = () => {
    navigation.push("Home");
  };
  return (
    <View style={styles.container}>
      <CustomText
        fontFamily="NunitoSans-Bold"
        style={[{ fontSize: 36, marginBottom: 100 }]}
      >
        ĐĂNG NHẬP
      </CustomText>
      <View style={styles.actions}>
        <UserButton
          onPress={handleLoginViaFacebook}
          content={"Đăng nhập bằng Facebooke"}
        />
        <UserButton
          onPress={handleLoginViaGoogle}
          content={"Đăng nhập bằng Google"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: (SCREEN_HEIGHT / 100) * 40,
  },
  actions: {
    height: 160,
    width: SCREEN_WIDTH - (SCREEN_WIDTH / 100) * 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
