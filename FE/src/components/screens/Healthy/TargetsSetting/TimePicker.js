import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../../CustomText";
import { convertDateToString2 } from "../../../../utils/datetime";

export default function TimePicker({
  defaultValue = new Date(2023, 4, 7, 24, 0),
  minimumDate,
  maximumDate,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue);
  const [clockVisible, setClockVisible] = useState(false);
  const handlePick = () => {
    setClockVisible(true);
  };

  const handleChange = (event, time) => {
    setValue(time);
    setClockVisible(false);
    onChange(time);
  };
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePick} style={styles.button}>
          <CustomText style={[styles.text]}>
            {convertDateToString2(value)}
          </CustomText>
        </TouchableOpacity>
      </View>
      {clockVisible && (
        <RNDateTimePicker
          mode="time"
          value={value}
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          display="spinner"
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    padding: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 162, 57, 0.4)",
  },
  text: {
    fontSize: 16,
  },
});
