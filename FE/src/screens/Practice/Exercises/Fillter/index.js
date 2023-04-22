import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import Option from "../Option";
import CustomText from "../../../../components/CustomText";

const prop = {
  label: "Mục tiêu",
  data: ["Giảm mỡ", "Tăng cơ", "Định hình", "Dãn cơ"],
};

const Fillter = ({data, setSelected, selected, label}) => {
  return (
    <View style={styles.container}>
      <CustomText style={[{marginRight: 5}]}>{`${label} :`}</CustomText>
      <View style={[{ display: "flex", flexDirection: "row" }]}>
        {data.map((element, index) => {
          return (
            <Option key={index} data={element} setSelected={setSelected} selected={selected}/>
          );
        })}
      </View>
    </View>
  );
};

export default Fillter;

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    marginHorizontal: 2,
    display: "flex",
    flexDirection: "row",
  },
});
