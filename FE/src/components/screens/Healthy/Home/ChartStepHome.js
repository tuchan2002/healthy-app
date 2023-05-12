import React from "react";
import { LineChart } from "react-native-chart-kit";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../constants/size";
import color from "../../../../constants/color";
import { labelExample } from "../../../../constants/lablesChart";
import { Dimensions } from "react-native";

const ChartStepHome = ({ data = [] }) => {
  return (
    <LineChart
      data={{
        datasets: [
          {
            data,
          },
        ],
      }}
      width={Dimensions.get("window").width / 2 - 50} // from react-native
      height={100}
      chartConfig={{
        withShadow: false,
        withOuterLines: false,
        backgroundColor: "white",
        backgroundGradientFrom: "white",
        backgroundGradientTo: "white",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 255) => `rgba(231, 85, 85, 1)`,
        labelColor: (opacity = 1) => `rgba(133, 133, 133, ${opacity})`,
        strokeWidth: 1,
        style: {
          borderRadius: 16,
        },
        propsForBackgroundLines: {
          stroke: "rgba(133, 133, 133, 0.2)",
          strokeDasharray: "",
        },
        useShadowColorFromDataset: false,
        fillShadowGradientToOffset: 1,
      }}
      spacingInner={1}
      bezier
      style={{
        marginRight: 0,
        paddingRight: 0,
      }}
      withDots={false}
      withVerticalLines={false}
      withHorizontalLabels={false}
      withHorizontalLines={false}
      withShadow={false}
    />
  );
};

export default ChartStepHome;
