import { StyleSheet, TouchableOpacity, View } from "react-native";
import Layout from "../../layouts/Layout";
import CustomText from "../../components/CustomText";
import UserButton from "../../components/UserButton";
import NotiDialog from "../../components/NotiDialog";
import { SCREEN_HEIGHT } from "../../constants/size";
import { useState } from "react";

export default function DefaultTargetSetting() {
  const [error, setError] = useState("");
  const handleSubmit = () => {};
  return (
    <Layout isAuth={false}>
      <View style={styles.container}>
        <View>
          <CustomText fontFamily="NunitoSans-Bold" style={[styles.title]}>
            Mục tiêu ban đầu
          </CustomText>
          <CustomText style={[{ textAlign: "center" }]}>
            Hãy đặt ra mục tiêu ban đầu để hình thành thói quen khỏe mạnh ngay
            nào!
          </CustomText>
        </View>
        <View style={styles.form}>
          <View style={styles.field}>
            <CustomText style={[styles.label]}>Thức dậy lúc</CustomText>
            <View style={styles.input}></View>
          </View>
          <View style={styles.field}>
            <CustomText style={[styles.label]}>Đi ngủ lúc</CustomText>
            <View style={styles.input}></View>
          </View>
          <CustomText style={[styles.error]}>{error}</CustomText>
          <View style={styles.buttons}>
            <UserButton onPress={handleSubmit} content={"Lưu"} />
            <TouchableOpacity style={styles.cancelButton}>
              <CustomText style={[{ textAlign: "center" }]}>Bỏ qua</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "4%",
    marginTop: (SCREEN_HEIGHT / 100) * 12,
    display: "flex",
    flexDirection: "column",
    height: SCREEN_HEIGHT,
  },
  form: {
    paddingBottom: (SCREEN_HEIGHT / 100) * 8,
    marginTop: (SCREEN_HEIGHT / 100) * 16,
  },
  field: {
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  label: {
    marginBottom: 8,
    fontFamily: "NunitoSans-SemiBold",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customInput: {
    width: "90%",
  },
  cancelButton: {
    paddingVertical: 16,
  },
  error: {
    textAlign: "center",
    color: "red",
    marginVertical: 8,
  },
  buttons: {
    marginTop: (SCREEN_HEIGHT / 100) * 12,
  },
});
