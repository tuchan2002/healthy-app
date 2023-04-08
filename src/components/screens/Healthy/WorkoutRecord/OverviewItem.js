import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../../../CustomText";

const OverviewItem = ({ overviewValue, overviewLabel }) => {
  return (
    <View style={styles.container}>
      <CustomText
        style={[{ fontSize: 18, textAlign: "center" }]}
        fontFamily="NunitoSans-SemiBold"
      >
        {overviewValue}
      </CustomText>
      <CustomText style={[{ fontSize: 14, textAlign: "center" }]}>
        {overviewLabel}
      </CustomText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OverviewItem;
