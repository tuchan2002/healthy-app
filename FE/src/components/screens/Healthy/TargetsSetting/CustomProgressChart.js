import { ProgressChart } from "react-native-chart-kit";

export default function CustomProgressChart({
  data,
  size = { height: 220, width: 220 },
  backgroundColor = "#F0EFEF",
}) {
  return (
    <ProgressChart
      data={data}
      height={size.height}
      width={size.width}
      chartConfig={{
        backgroundColor: backgroundColor,
        backgroundGradientFrom: backgroundColor,
        backgroundGradientTo: backgroundColor,
        decimalPlaces: 4,
        color: (opacity = 1, index) => {
          return `rgba(132, 132, 132, ${opacity})`;
        },
        propsForDots: {
          r: 1,
        },
      }}
      withCustomBarColorFromData={true}
      hideLegend={true}
    />
  );
}
