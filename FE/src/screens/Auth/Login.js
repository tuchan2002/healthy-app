import { Image, StyleSheet, Text, View } from "react-native";
import CustomText from "../../components/CustomText";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import Layout from "../../layouts/Layout";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useContext, useEffect } from "react";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";
import { Settings } from "react-native-fbsdk-next";
import { handleLogin } from "../../services/user";
import { createTableAuthUsers, insertUser } from "../../data/user";
import { AuthContext } from "../../providers/AuthProvider";
import ButtonIcon from "../../components/button/ButtonIcon";
import { FontAwesome } from "@expo/vector-icons";
import ImageGoogleLogo from "../../assets/images/HomeScreen/th.png";
import { StepSyncToLocal, createTableLastSync } from "../../data/lastSync";
import { createTableSteps } from "../../data/stepCounter";
import { createTableRunningInfos } from "../../data/runningInfo";
import { createTableLocations } from "../../data/locations";

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
    let user;
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!isSignedIn) {
      user = await GoogleSignin.signIn();
    } else {
      user = await GoogleSignin.getCurrentUser();
    }
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

      await createTableLastSync();
      //droptTable("lastSync");
      await createTableSteps();
      await createTableRunningInfos();
      await createTableLocations();
      await StepSyncToLocal(authUserData.id);

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
        <View
          style={{
            paddingBottom: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="heartbeat"
            size={100}
            color={"white"}
            style={{ paddingHorizontal: 25 }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 40,
              fontFamily: "NunitoSans-Bold",
              color: "white",
            }}
          >
            Heathy App
          </Text>
        </View>
        <CustomText
          fontFamily="NunitoSans-Bold"
          style={[
            {
              fontSize: 20,
              marginBottom: 10,
              paddingHorizontal: 20,
              color: "white",
            },
          ]}
        >
          ĐĂNG NHẬP
        </CustomText>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.actions}>
            <ButtonIcon
              onPress={handleLoginViaFacebook}
              content={"Đăng nhập bằng Facebook"}
              color="white"
            >
              <FontAwesome
                name="facebook-official"
                size={60}
                color={"#385898"}
                style={{ paddingHorizontal: 5, paddingRight: 20 }}
              />
            </ButtonIcon>
            <ButtonIcon
              onPress={handleLoginViaGoogle}
              content={"Đăng nhập bằng Google"}
              color="white"
            >
              <Image
                source={ImageGoogleLogo}
                style={{
                  height: 58,
                  width: 60,
                  borderRadius: 10,
                  marginHorizontal: 3,
                  marginRight: 10,
                }}
              />
            </ButtonIcon>
          </View>
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
    paddingTop: (SCREEN_HEIGHT / 100) * 8,
    backgroundColor: "#FFA239",
  },
  actions: {
    height: 160,
    width: SCREEN_WIDTH - (SCREEN_WIDTH / 100) * 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
