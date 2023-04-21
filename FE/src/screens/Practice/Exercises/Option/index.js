import React, { useState } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import { memo } from "react";
import CustomText from "../../../../components/CustomText";

const Option = ({ data, setSelected , selected }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: pressed
          ? "rgba(255, 162, 57, 1)"
          : "rgba(226, 221, 221, 1)",
      }}
      onPress={(e) => {
        if (selected.includes(data.id)) {
          setSelected((prev) => {
            return prev.filter((element) => {return element !== data.id});
          })
        } else {
          setSelected((prev) => {
            const newState = prev;
            newState.push(data.id);
            //console.log(newState);
            return newState;
          })
        }
        setPressed((prev) => {
          return !prev;
        });
      }}
    >
      <CustomText style={[{ textAlign: "center", fontSize: 14, color: pressed
          ? "rgba(255, 255, 255, 1)"
          : "rgba(132, 132, 132, 1)"}]}>{data.content}</CustomText>
    </Pressable>
  );
};

export default memo(Option);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    paddingVertical: 5,
    width: 75,
    color: "rgba(132, 132, 132, 1)",
    backgroundColor: "rgba(226, 221, 221, 1)",
    borderRadius: 20,
  },
});
