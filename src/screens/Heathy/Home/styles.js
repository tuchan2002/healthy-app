import { Dimensions, StyleSheet } from "react-native";
import color from "../../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0efef",
    paddingHorizontal: 18,
  },
  title: {
    fontSize: 24,
    color: "rgba(0, 0, 0, 0.5)",
  },
  topContainer: {
    marginVertical: 18,
    paddingHorizontal: 36,
    paddingVertical: 18,
    backgroundColor: color.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  topCircle: {
    borderWidth: 12,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 100,
    width: 120,
    height: 120,
    marginBottom: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 18,
    flexGrow: 1,
    width: Dimensions.get("window").width / 2 - 18 - 5,
  },
});

export default styles;
