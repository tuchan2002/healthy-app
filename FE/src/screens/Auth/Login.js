import { StyleSheet, View } from "react-native";
import CustomText from "../../components/CustomText";
import UserButton from "../../components/UserButton";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import Layout from "../../layouts/Layout";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useContext, useEffect } from "react";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import { NativeModules } from "react-native";
import { Settings } from "react-native-fbsdk-next";
import { handleLogin } from "../../services/user";
import {
  createTableAuthUsers,
  getAuthUserProperty,
  insertUser,
} from "../../data/user";
import { AuthContext } from "../../providers/AuthProvider";
import ButtonIcon from "../../components/button/ButtonIcon";
import { FontAwesome } from "@expo/vector-icons";

export default function Login({ navigation }) {
  const { setAuthUser, authUser } = useContext(AuthContext);

  useEffect(() => {
    createTableAuthUsers();
    Settings.initializeSDK();
    GoogleSignin.configure({
      webClientId:
        "398419276498-ieb7kgf5crp40npvuc6pf2ehcu3efja1.apps.googleusercontent.com",
    });
  }, []);

  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }
      const accessToken = data.accessToken.toString();
      const infoRequest = new GraphRequest(
        "/me",
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: "id,name,email,picture.type(large)",
            },
          },
        },
        async (error, result) => {
          if (error) {
            console.log("Error fetching data: " + error.toString());
          } else {
            console.log(result);
            const loginData = {
              uid: result.id,
              email: result.email,
              username: result.name,
              avatar: result.picture.data.url,
            };
            //console.log(loginData);
            const res = await handleLogin(loginData);
            if (res.success) {
              const authUserData = {
                token: accessToken,
                id: res.data.id,
                username: res.data.username,
                avatar: res.data.avatar,
              };
              setAuthUser({ ...authUserData, user_id: authUserData.id });
              await insertUser(authUserData);
              if (res.isTheFirst) {
                navigation.push("BMISetting");
              } else {
                navigation.push("Home");
              }
            }
          }
        }
      );
      new GraphRequestManager().addRequest(infoRequest).start();
      // Create a Firebase credential with the AccessToken
    } catch (err) {
      console.log("Error getting access token: " + error.toString());
    }
  }

  const handleLoginViaFacebook = async () => {
    await onFacebookButtonPress();
  };
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    //await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const user = await GoogleSignin.signIn();
    console.log(user);
    return user;
    // Create a Google credential with the token
  }

  const handleLoginViaGoogle = async () => {
    //navigation.push("Home");
    const user = await onGoogleButtonPress();
    const loginData = {
      uid: user.user.id,
      email: user.user.email,
      username: user.user.name,
      avatar: user.user.photo,
    };
    const res = await handleLogin(loginData);
    if (res.success) {
      const authUserData = {
        token: user.idToken,
        id: res.data.id,
        username: res.data.username,
        avatar: res.data.avatar,
      };
      setAuthUser({ ...authUserData, user_id: authUserData.id });
      await insertUser(authUserData);

      if (res.isTheFirst) {
        navigation.push("BMISetting");
      } else {
        navigation.push("Home");
      }
    }
  };

  return (
    <Layout isAuth={false}>
      <View style={styles.container}>
        <FontAwesome
          name="heartbeat"
          size={100}
          color={"#FFA239"}
          style={{ paddingHorizontal: 25, paddingBottom: 40 }}
        />
        <CustomText
          fontFamily="NunitoSans-Bold"
          style={[{ fontSize: 36, marginBottom: 100 }]}
        >
          ĐĂNG NHẬP
        </CustomText>
        <View style={styles.actions}>
          <ButtonIcon
            onPress={handleLoginViaFacebook}
            content={"Đăng nhập bằng Facebook"}
            color="#385898"
          >
            <FontAwesome
              name="facebook-f"
              size={40}
              color={"white"}
              style={{ paddingHorizontal: 25 }}
            />
          </ButtonIcon>
          <ButtonIcon
            onPress={handleLoginViaGoogle}
            content={"Đăng nhập bằng Google"}
            color="#dd4b39"
          >
            <FontAwesome
              name="google"
              size={40}
              color={"white"}
              style={{ paddingHorizontal: 25 }}
            />
          </ButtonIcon>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: (SCREEN_HEIGHT / 100) * 18,
  },
  actions: {
    height: 160,
    width: SCREEN_WIDTH - (SCREEN_WIDTH / 100) * 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
