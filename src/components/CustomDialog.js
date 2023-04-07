import Dialog, {
  DialogContent,
  DialogFooter,
  SlideAnimation,
} from "react-native-popup-dialog";
import CustomText from "./CustomText";
import { SCREEN_WIDTH } from "../constants/size";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { cloneElement } from "react";

export default function CustomDialog({
  title,
  childrenProps = {},
  visibale,
  onTouchOutside,
  children,
  onSave,
  onCancel,
}) {
  return (
    <Dialog
      visible={visibale}
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
      onTouchOutside={onTouchOutside}
    >
      <DialogContent style={{ paddingVertical: 12, paddingHorizontal: 24 }}>
        {cloneElement(children, { ...childrenProps })}
      </DialogContent>
      <DialogFooter style={styles.dialogFooter}>
        <TouchableOpacity onPress={onSave} style={styles.button}>
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
        <TouchableOpacity onPress={onCancel} style={styles.button}>
          <CustomText style={[styles.buttonText]}>Bỏ qua</CustomText>
        </TouchableOpacity>
      </DialogFooter>
    </Dialog>
  );
}

const styles = StyleSheet.create({
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
