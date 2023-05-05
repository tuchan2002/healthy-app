import { useContext, useState } from "react";
import Layout from "../../layouts/Layout";
import Avatar from "./Avatar";
import fakeUser from "../../assets/fakeDatas/user";
import Actions from "./Actions";
import { StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT } from "../../constants/size";
import { AuthContext } from "../../providers/AuthProvider";

export default function User() {
  const { authUser } = useContext(AuthContext);

  return (
    <Layout activeMenu="user">
      <View style={styles.container}>
        <Avatar user={authUser ? authUser : fakeUser} />
        <Actions />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: SCREEN_HEIGHT - 50 - 60,
  },
});
