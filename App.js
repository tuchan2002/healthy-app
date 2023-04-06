import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TargetsSetting from "./src/screens/Heathy/TargetsSetting";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TargetsSetting" component={TargetsSetting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
