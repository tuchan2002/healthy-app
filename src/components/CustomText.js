import { Text } from "react-native";

export default function CustomText({
  children,
  style = [],
  fontFamily = "NunitoSans-Regular",
}) {
  return (
    <Text style={[{ fontFamily, fontSize: 16 }, ...style]}>{children}</Text>
  );
}
