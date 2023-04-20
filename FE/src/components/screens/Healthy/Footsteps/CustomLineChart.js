import { LineChart } from "react-native-chart-kit";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../constants/size";
import color from "../../../../constants/color";

export default function CustomLineChart({ data }) {
  return (
    <LineChart
      data={{
        labels: ["0:00", "6:00", "12:00", "18:00", "24:00"],
        datasets: [
          {
            data,
          },
        ],
      }}
      width={(SCREEN_WIDTH / 100) * 96} // from react-native
      height={(SCREEN_HEIGHT / 100) * 40}
      chartConfig={{
        withShadow: false,
        withOuterLines: false,
        backgroundColor: color.bg,
        backgroundGradientFrom: color.bg,
        backgroundGradientTo: color.bg,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 255) => `rgba(231, 85, 85, 1)`,
        labelColor: (opacity = 1) => `rgba(133, 133, 133, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: color.bg,
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
        marginVertical: 8,
        borderRadius: 8,
      }}
      withVerticalLines={false}
      withShadow={false}
    />
  );
}
