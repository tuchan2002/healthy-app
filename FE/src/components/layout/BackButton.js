import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";

export default function BackButton({style = []}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={{...style}} onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={32} color="black" />
    </TouchableOpacity>
  );
}
