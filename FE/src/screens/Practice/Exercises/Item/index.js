import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableHighlight } from "react-native";
import { View } from "react-native";
import CustomText from "../../../../components/CustomText";
const Item = ({ data, navigation }) => {
  return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2554/2554042.png",
          }}
        />
        <View>
          <Text numberOfLines={1} style={[styles.title]}>
            {data.title}
          </Text>
          <CustomText style={[{ fontSize: 14 }]}>
            {`Thời gian: ${data.duration}`}
          </CustomText>
          <CustomText style={[{ fontSize: 14 }]}>
            {`Tiêu thụ: ${data.kalo} kalo`}
          </CustomText>
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
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    height: "100%",
    width: "30%",
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    width: 265,
    fontFamily: "NunitoSans-Regular",
    color: "rgba(255, 162, 57, 1)",
    marginBottom: 2,
  },
});
