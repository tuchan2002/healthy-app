import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import Option from "../Option";

const prop = {
  label: "Mục tiêu",
  data: ["Giảm mỡ", "Tăng cơ", "Định hình", "Dãn cơ"],
};

const Fillter = () => {
  return (
    <View style={styles.container}>
      <TextInput style={{marginRight: 5}}>{`${prop.label} :`}</TextInput>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {prop.data.map((element, index) => {
          return (
            <Option key={index} label={element} />
          );
        })}
      </View>
    </View>
  );
};

export default Fillter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 7,
    marginVertical: 6,
    display: "flex",
    flexDirection: "row",
  },
});
