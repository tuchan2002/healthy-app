import { TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import color from "../constants/color";

export default function UserButton({ content, onPress }) {
  return (
    <TouchableOpacity
      style={{
        height: 64,
        backgroundColor: color.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 28,
      }}
      onPress={onPress}
    >
      <CustomText style={[{ color: "white", fontSize: 18 }]}>
        {content}
      </CustomText>
    </TouchableOpacity>
  );
}
