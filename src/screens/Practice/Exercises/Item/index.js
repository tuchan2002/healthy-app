import React from "react";
import { Image, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";

const Item = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/2554/2554042.png",
        }}
      />
      <View>
        <Text style={styles.title}>Title</Text>
        <Text style={{ fontSize: 14 }}>
          Thời gian: 15 phút, Tiêu thụ: 30kalo
        </Text>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginVertical: 6,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    height: "100%",
    width: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
  },
});
