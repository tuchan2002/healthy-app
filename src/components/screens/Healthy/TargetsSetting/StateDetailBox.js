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
import CustomDialog from "../../../CustomDialog";

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
      <CustomDialog
        title={title}
        childrenProps={{ setValue }}
        visibale={dialogVisibale}
        onTouchOutside={handleCancel}
        onCancel={handleCancel}
        onSave={handleSave}
      >
        {children}
      </CustomDialog>
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
});
