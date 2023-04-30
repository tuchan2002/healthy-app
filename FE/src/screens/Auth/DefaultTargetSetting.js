import { StyleSheet, TouchableOpacity, View } from "react-native";
import Layout from "../../layouts/Layout";
import CustomText from "../../components/CustomText";
import UserButton from "../../components/UserButton";
import { FOOTERBAR_HEIGHT, SCREEN_HEIGHT, STATUSBAR_HEIGHT } from "../../constants/size";
import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input";
import TimePicker from "../../components/screens/Healthy/TargetsSetting/TimePicker";
import {
  handleGetUserTarget,
  handlePostUserTarget,
} from "../../services/userTarget";
import defaultUserTarget from "../../assets/fakeDatas/defaultUserTarget";
import NotiDialog from "../../components/NotiDialog";
import { getAuthUserProperty } from "../../data/user";
import { AuthContext } from "../../providers/AuthProvider";

export default function DefaultTargetSetting({ navigation }) {
  const [userTarget, setUserTarget] = useState({});
  const [error, setError] = useState("");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const { authUser } = useContext(AuthContext);
  const [openFailDialog, setOpenFailDialog] = useState(false);

  useEffect(() => {
    if (authUser) {
      getUserTarget();
    }
  }, [authUser]);

  console.log(authUser);

  const getUserTarget = async () => {
    const res = await handleGetUserTarget(authUser.user_id);
    console.log(res);
    if (res.success) {
      setUserTarget(res.data ? res.data : defaultUserTarget);
    } else {
      setUserTarget(defaultUserTarget);
    }
  };

  const handleChange = (value) => {
    setUserTarget({
      ...userTarget,
      ...value,
    });
  };

  const handleSubmit = async () => {
    const res = await handlePostUserTarget({
      ...userTarget,
      user_id: authUser.user_id,
    });

    console.log({
      ...userTarget,
      user_id: authUser.user_id,
    });

    if (res.success) {
      setOpenSuccessDialog(res.message);
    } else {
      setOpenFailDialog(res.message);
    }
  };

  const handleCancel = () => {
    navigation.push("Home");
  };
  return (
    <Layout isAuth={false}>
      {userTarget && (
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
              <CustomText style={[styles.label]}>
                Lượng calo muốn tiêu hao mỗi ngày
              </CustomText>
              <View style={styles.input}>
                <Input
                  placeholder="Nhập calo"
                  keyboardType="numeric"
                  style={styles.customInput}
                  onChange={(value) => handleChange({ kcal: value })}
                  defaultValue={String(userTarget.kcal)}
                />
                <CustomText>kcal</CustomText>
              </View>
            </View>
            <View style={styles.field}>
              <CustomText style={[styles.label]}>
                Số bước chân muốn đi mỗi ngày
              </CustomText>
              <View style={styles.input}>
                <Input
                  placeholder="Nhập số bước chân"
                  keyboardType="numeric"
                  style={styles.customInput}
                  onChange={(value) =>
                    handleChange({ footsteps_amount: value })
                  }
                  defaultValue={String(userTarget.footsteps_amount)}
                />
                <CustomText>bước</CustomText>
              </View>
            </View>
            <View
              style={[
                styles.field,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <CustomText style={[styles.label]}>
                Thức dậy mỗi ngày lúc
              </CustomText>
              <View style={[styles.input, { marginLeft: 16 }]}>
                <TimePicker
                  onChange={(value) => handleChange({ getUpAt: value })}
                  defaultValue={userTarget.getUpAt}
                />
              </View>
            </View>
            <View
              style={[
                styles.field,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <CustomText style={[styles.label]}>
                Đi ngủ mỗi ngày lúc
              </CustomText>
              <View style={[styles.input, { marginLeft: 16 }]}>
                <TimePicker
                  onChange={(value) => handleChange({ sleepAt: value })}
                  defaultValue={userTarget.sleepAt}
                />
              </View>
            </View>
            <CustomText style={[styles.error]}>{error}</CustomText>
            <View style={styles.buttons}>
              <UserButton onPress={handleSubmit} content={"Lưu"} />
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.cancelButton}
              >
                <CustomText style={[{ textAlign: "center" }]}>
                  Bỏ qua
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <NotiDialog
        visibale={openSuccessDialog || openFailDialog ? true : false}
        onTouchOutside={() => {
          if (openSuccessDialog) setOpenSuccessDialog(false);
          if (openFailDialog) setOpenFailDialog(false);
        }}
        onOk={() => {
          if (openSuccessDialog) {
            setOpenSuccessDialog(false);
            navigation.push("Home");
          }
          if (openFailDialog) {
            setOpenFailDialog(false);
          }
        }}
        title={
          openSuccessDialog
            ? "Cập nhật thành công!"
            : openFailDialog
            ? "Cập nhật thất bại!"
            : ""
        }
      >
        <CustomText>
          {openSuccessDialog}
          {openFailDialog}
        </CustomText>
      </NotiDialog>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "4%",
    marginTop: (SCREEN_HEIGHT / 100) * 4,
    display: "flex",
    flexDirection: "column",
    height: SCREEN_HEIGHT - FOOTERBAR_HEIGHT - STATUSBAR_HEIGHT,
  },
  form: {
    marginTop: (SCREEN_HEIGHT / 100) * 4,
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
    marginTop: (SCREEN_HEIGHT / 100) * 2,
  },
});
