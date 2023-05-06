import { StyleSheet, View } from "react-native";
import TargetSettingBtn from "../../../components/screens/Practice/Running/TargetSettingBtn";
import StartBtn from "../../../components/screens/Practice/Running/StartBtn";
import { useEffect, useState } from "react";
import CustomDialog from "../../../components/CustomDialog";
import Input from "../../../components/Input";

export default function Actions({
  target,
  isStarted,
  isStopped,
  onChangeInput,
  onStart,
}) {
  const [settingDialogVisible, setSettingDialogVisible] = useState(false);
  const [targetValue, setTargetValue] = useState("");

  useEffect(() => {
    setTargetValue(target);
  }, [target, isStarted]);

  const handleCancelDialog = () => {
    setSettingDialogVisible(false);
  };

  const handleChangeInput = (value) => {
    setTargetValue(value);
  };

  const handleSave = () => {
    onChangeInput(targetValue);
    handleCancelDialog();
  };
  return (
    <>
      <View style={styles.container}>
        {!targetValue && (
          <TargetSettingBtn onPress={() => setSettingDialogVisible(true)} />
        )}
        {!isStarted && !isStopped ? (
          <StartBtn
            onPress={() => onStart()}
            disabled={target ? false : true}
          />
        ) : (
          <></>
        )}
      </View>
      <CustomDialog
        title="Đặt mục tiêu (km)"
        visibale={settingDialogVisible}
        onTouchOutside={handleCancelDialog}
        onCancel={handleCancelDialog}
        onSave={handleSave}
      >
        <Input
          placeholder="Nhập mục tiêu"
          onChange={handleChangeInput}
          keyboardType="numeric"
        />
      </CustomDialog>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 160,
  },
  dialogView: {
    paddingHorizontal: 24,
  },
});
