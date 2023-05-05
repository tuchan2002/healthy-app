import { Image, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";

export default function Avatar({ user }) {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user.avatar ? (
        <Image
          source={{ uri: user?.avatar }}
          style={{ height: 200, width: 200 }}
        />
      ) : (
        <FontAwesome5 name="user-circle" size={260} color="black" />
      )}
      <CustomText fontFamily="NunitoSans-SemiBold" style={[{ fontSize: 32 }]}>
        {user.username}
      </CustomText>
    </View>
  );
}
