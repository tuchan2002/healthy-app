import Layout from "../../layouts/Layout";
import CustomText from "../../components/CustomText";
import Input from "../../components/Input";
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import UserButton from "../../components/UserButton";
import { useEffect, useState } from "react";
import bmiValues from "../../constants/bmiValues";
import { SCREEN_HEIGHT } from "../../constants/size";

export default function BMISetting({ navigation }) {
  const [bmi, setBmi] = useState({
    weight: null,
    height: null,
  });
  const [error, setError] = useState("");
  const [bmiValue, setBmiValue] = useState("---");

  useEffect(() => {
    if (error) {
      setError("");
    }
    if (bmi.weight && bmi.height) {
      setBmiValue(
        (bmi.weight / ((bmi.height * bmi.height) / 10000)).toFixed(2),
      );
    } else setBmiValue("---");
  }, [bmi.weight, bmi.height]);

  const handleChange = (newValue) => {
    setBmi({
      ...bmi,
      ...newValue,
    });
  };

  const handleSubmit = () => {
    if (!bmi.weight) {
      setError("Bạn phải nhập cân nặng!");
    } else if (!bmi.height) {
      setError("Bạn phải nhập chiều cao!");
    } else {
      console.log(bmi);
      navigation.push("Home");
    }
  };

  const checkLevel = () => {
    if (bmiValue !== "---") {
      for (key in bmiValues) {
        if (
          bmiValue >= bmiValues[key].minValue &&
          bmiValue <= bmiValues[key].maxValue
        ) {
          return (
            <CustomText
              fontFamily="NunitoSans-Bold"
              style={[{ color: bmiValues[key].color }]}
            >
              {bmiValues[key].content}
            </CustomText>
          );
        }
      }
    } else {
      return "---";
    }
  };

  return (
    <Layout isAuth={false}>
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
              />
              <CustomText>cm</CustomText>
            </View>
          </View>
          <CustomText>
            Chỉ số BMI của bạn: {bmiValue} | {checkLevel()}
          </CustomText>
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
    width: "92%",
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
