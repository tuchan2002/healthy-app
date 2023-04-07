import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../../CustomText";
import { Feather } from "@expo/vector-icons";
import { cloneElement, useEffect, useRef, useState } from "react";
import Dialog, {
  DialogContent,
  DialogFooter,
  SlideAnimation,
} from "react-native-popup-dialog";
import Input from "../../../Input";
import TimePicker from "../../../TimePicker";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

function StateDetailBox({
  icon,
  title,
  content,
  children,
  editable,
  onChange = () => {},
}) {
  const [dialogVisibale, setDialogVisible] = useState(false);
  const [value, setValue] = useState("");
  const dialogRef = useRef();

  const handleEdit = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleSave = () => {
    onChange(value);
    handleCancel();
  };

  return (
    <>
      <View style={styles.box}>
        <View style={styles.left}>
          <View style={styles.icon}>{icon}</View>
          <View>
            <CustomText style={[styles.text]}>{title}</CustomText>
          </View>
        </View>
        <View style={styles.right}>
          <CustomText style={[styles.text]}>{content}</CustomText>
          {editable && (
            <TouchableOpacity onPress={handleEdit}>
              <Feather name="edit-3" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Dialog
        ref={dialogRef}
        visible={dialogVisibale}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        dialogTitle={
          <CustomText
            fontFamily="NunitoSans-SemiBold"
            style={[{ fontSize: 20, paddingHorizontal: 24 }]}
          >
            {title}
          </CustomText>
        }
        dialogStyle={{
          backgroundColor: "white",
          width: (SCREEN_WIDTH / 4) * 3,
          border: 10,
          paddingTop: 20,
        }}
        onTouchOutside={handleCancel}
      >
        <DialogContent style={{ paddingVertical: 12, paddingHorizontal: 24 }}>
          {cloneElement(children, { setValue })}
        </DialogContent>
        <DialogFooter style={styles.dialogFooter}>
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <CustomText style={[styles.buttonText]}>Lưu</CustomText>
          </TouchableOpacity>
          <View
            style={{
              width: 2,
              height: 32,
              backgroundColor: "white",
              borderRadius: 8,
            }}
          ></View>
          <TouchableOpacity onPress={handleCancel} style={styles.button}>
            <CustomText style={[styles.buttonText]}>Bỏ qua</CustomText>
          </TouchableOpacity>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function FootStepsInput({ setValue }) {
  return (
    <Input
      placeholder="Nhập số bước chân"
      keyboardType="numeric"
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
}

function TimePickerInput({ defaultValue, minimumDate, maximumDate, setValue }) {
  return (
    <TimePicker
      defaultValue={defaultValue}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
      onChange={(value) => setValue(value)}
    />
  );
}

StateDetailBox.FootStepsInput = FootStepsInput;
StateDetailBox.TimePickerInput = TimePickerInput;

export default StateDetailBox;

const styles = StyleSheet.create({
  box: {
    height: 60,
    backgroundColor: "white",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    marginVertical: 8,
  },
  left: {
    display: "flex",
    flexDirection: "row",
  },
  right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  text: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  dialogFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    backgroundColor: "rgba(255, 162, 57, 1)",
  },
  button: {
    width: "48%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
});
