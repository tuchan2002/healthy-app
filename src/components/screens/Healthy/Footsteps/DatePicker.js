import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../../../CustomText";
import { convertDate, convertDateToString3 } from "../../../../utils/datetime";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function DatePicker({ defaultValue = new Date(), onChange }) {
  const [value, setValue] = useState(defaultValue);
  const [isShowPicker, setIsShowPicker] = useState(false);

  const handlePick = () => {
    setIsShowPicker(true);
  };

  const handleChangeDate = (event, time) => {
    setIsShowPicker(false);
    onChange(time);
    setValue(time);
  };

  const handleBackDate = () => {
    const date = value;
    date.setDate(value.getDate() - 1);
    onChange(date);
    setValue(date);
  };

  const handleNextDate = () => {
    const date = value;
    date.setDate(value.getDate() + 1);
    onChange(date);
    setValue(date);
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleBackDate()}>
          <Ionicons
            name="ios-chevron-back-outline"
            size={28}
            color="rgba(0, 0, 0, 0.6)"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePick} style={styles.pickBtn}>
          <CustomText
            style={[
              { fontSize: 14, marginRight: 10, color: "rgba(0, 0, 0, 0.6)" },
            ]}
          >
            {convertDateToString3(value)}
          </CustomText>
          <FontAwesome name="caret-down" size={24} color="rgba(0, 0, 0, 0.6)" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNextDate()}
          disabled={convertDate(value).date === convertDate(new Date()).date}
        >
          <Ionicons
            name="chevron-forward"
            size={28}
            color="rgba(0, 0, 0, 0.6)"
          />
        </TouchableOpacity>
      </View>
      {isShowPicker && (
        <RNDateTimePicker
          mode="date"
          value={value}
          onChange={handleChangeDate}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  pickBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
