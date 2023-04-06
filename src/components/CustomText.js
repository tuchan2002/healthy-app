import { Text } from "react-native";

export default function CustomText({
  children,
  style = [],
  fontFamily = "NunitoSans-Regular",
}) {
  return (
      <Text style={[{ fontFamily, }, ...style]}>{ children }</Text>
  );
}
