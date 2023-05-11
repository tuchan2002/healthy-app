import { StyleSheet, View } from "react-native";
import UserButton from "../../components/UserButton";
import { useNavigation } from "@react-navigation/native";
import { droptTable } from "../../data/user";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { unregisterLocationTask } from "../../utils/locationTask";
import { useLoading } from "../../providers/LoadingProvider";
import { useStep } from "../../providers/StepProvider";
import { StepSync } from "../../data/lastSync";

export default function Actions() {
  const { setLoading } = useLoading();
  const navigation = useNavigation();
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { steps } = useStep();
  const handleSync = async () => {
    //console.log(authUser);
    StepSync(authUser.user_id);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await StepSync(authUser.user_id);
    await droptTable("auth_users");
    steps.current.calo = 0;
    steps.current.count = 0;
    steps.current.lengthTravel = 0;
    setAuthUser(null);
    if (GoogleSignin.isSignedIn) {
      await GoogleSignin.signOut();
    }
    unregisterLocationTask();
    await droptTable("lastSync");
    await droptTable("steps");
    await droptTable("locations");
    await droptTable("running_infos");
    setLoading(false);
    navigation.push("Login");
  };
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
