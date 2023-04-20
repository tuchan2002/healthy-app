import { ProgressChart } from "react-native-chart-kit";

export default function CustomProgressChart({ data }) {
  return (
    <ProgressChart
      data={data}
      height={220}
      width={220}
      chartConfig={{
        backgroundColor: "#F0EFEF",
        backgroundGradientFrom: "#F0EFEF",
        backgroundGradientTo: "#F0EFEF",
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
