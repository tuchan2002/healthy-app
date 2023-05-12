import Layout from "../../layouts/Layout";
import CustomText from "../../components/CustomText";
import Input from "../../components/Input";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import UserButton from "../../components/UserButton";
import { useEffect, useMemo, useState } from "react";
import {
  FOOTERBAR_HEIGHT,
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
} from "../../constants/size";
import { handleGetBMI, handlePostBMI } from "../../services/bmi";
import NotiDialog from "../../components/NotiDialog";
import { getAuthUserProperty } from "../../data/user";
import { checkLevelBmi } from "../../utils/bmiLevel";

export default function BMISetting({ navigation }) {
  const [bmi, setBmi] = useState({
    weight: "",
    height: "",
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [bmiValue, setBmiValue] = useState("---");
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openFailDialog, setOpenFailDialog] = useState(false);
  const navigateHistory = useMemo(() => navigation.getState()?.routes);
  const previousScreen = useMemo(
    () => navigateHistory[navigateHistory.length - 2]
  );

  console.log(previousScreen);

  useEffect(() => {
    const getUserId = async () => {
      const ui = await getAuthUserProperty("user_id");
      setUserId(ui[0].user_id);
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      getBMI();
    }
  }, [userId]);

  const getBMI = async () => {
    const bmiRes = await handleGetBMI(userId);
    if (bmiRes.success) {
      const weight = bmiRes.data?.weight == "null" ? "" : bmiRes.data?.weight;
      const height = bmiRes.data?.height == "null" ? "" : bmiRes.data?.height;
      setBmi({
        weight,
        height,
      });
    }
  };

  useEffect(() => {
    if (error) {
      setError("");
    }
    if (bmi.weight && bmi.height) {
      setBmiValue(
        (bmi.weight / ((bmi.height * bmi.height) / 10000)).toFixed(2)
      );
    } else setBmiValue("---");
  }, [bmi.weight, bmi.height]);

  const handleChange = (newValue) => {
    setBmi({
      ...bmi,
      ...newValue,
    });
  };

  const handleSubmit = async () => {
    if (!bmi.weight) {
      setError("Bạn phải nhập cân nặng!");
    } else if (!bmi.height) {
      setError("Bạn phải nhập chiều cao!");
    } else {
      const data = {
        user_id: userId,
        ...bmi,
        value: bmiValue,
      };
      const res = await handlePostBMI(data);
      if (res.success) {
        setOpenSuccessDialog(true);
      } else {
        setOpenFailDialog(res.message);
      }
    }
  };

  const handleCancel = () => {
    if (previousScreen.name === "Login") {
      navigation.push("DefaultTargetSetting");
    } else {
      navigation.push(previousScreen.name);
    }
  };

  return (
    <Layout isAuth={previousScreen.name !== "Login"}>
      <View style={styles.container}>
        <CustomText fontFamily="NunitoSans-Bold" style={[styles.title]}>
          Chỉ số BMI
        </CustomText>
        <View style={styles.form}>
          <View style={styles.field}>
            <CustomText style={[styles.label]}>Cân nặng</CustomText>
            <View style={styles.input}>
              <Input
                placeholder="Nhập cân nặng"
                keyboardType="numeric"
                style={styles.customInput}
                onChange={(value) => handleChange({ weight: value })}
                defaultValue={String(bmi.weight)}
              />
              <CustomText>kg</CustomText>
            </View>
          </View>
          <View style={styles.field}>
            <CustomText style={[styles.label]}>Chiều cao</CustomText>
            <View style={styles.input}>
              <Input
                placeholder="Nhập chiều cao"
                keyboardType="numeric"
                style={styles.customInput}
                onChange={(value) => handleChange({ height: value })}
                defaultValue={String(bmi.height)}
              />
              <CustomText>cm</CustomText>
            </View>
          </View>
          <CustomText>
            Chỉ số BMI của bạn: {bmiValue} | {checkLevelBmi(bmi)}
          </CustomText>
          <CustomText style={[styles.error]}>{error}</CustomText>
          <View style={styles.buttons}>
            <UserButton onPress={handleSubmit} content={"Lưu"} />
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <CustomText style={[{ textAlign: "center" }]}>Bỏ qua</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <NotiDialog
        visibale={openSuccessDialog || openFailDialog}
        onTouchOutside={() => {
          if (openSuccessDialog) setOpenSuccessDialog(false);
          if (openFailDialog) setOpenFailDialog(false);
        }}
        onOk={() => {
          if (openSuccessDialog) {
            setOpenSuccessDialog(false);
            if (previousScreen.name === "Login") {
              navigation.push("DefaultTargetSetting");
            }
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
          {openSuccessDialog && `Chỉ số BMI của bạn là ${bmiValue}`}
          {openFailDialog}
        </CustomText>
      </NotiDialog>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
    display: "flex",
    flexDirection: "column",
    paddingTop: "8%",
    height: SCREEN_HEIGHT - FOOTERBAR_HEIGHT - STATUSBAR_HEIGHT,
  },
  form: {
    paddingBottom: (SCREEN_HEIGHT / 100) * 8,
  },
  field: {
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: (SCREEN_HEIGHT / 100) * 16,
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
