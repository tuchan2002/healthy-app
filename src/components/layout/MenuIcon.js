import { Entypo } from "@expo/vector-icons";
import { FlatList, StyleSheet, View } from "react-native";

export default function MenuIcon() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[0, 1, 2, 3]}
        renderItem={({ item }) => (
          <Entypo name="dot-single" size={16} color="black" />
        )}
        //Setting the number of column
        numColumns={2}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
  },
});
