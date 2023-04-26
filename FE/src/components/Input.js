import { useState } from "react";
import { TextInput } from "react-native";

export default function Input({
  placeholder,
  keyboardType,
  autoFocus = true,
  onChange,
  style,
  defaultValue
}) {
  const handleChangeInput = (newValue) => {
    onChange(newValue);
  };

  return (
    <TextInput
      autoFocus={autoFocus}
      keyboardType={keyboardType}
      placeholder={placeholder}
      onChangeText={handleChangeInput}
      defaultValue={defaultValue}
      style={[
        {
          height: 48,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 8,
          paddingHorizontal: 12,
          fontFamily: "NunitoSans-Regular",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
        style,
      ]}
    />
  );
}
