import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Heathy/Home";
import TargetsSetting from "./src/screens/Heathy/TargetsSetting";
import WorkoutRecord from "./src/screens/Heathy/WorkoutRecord";
import Practice from "./src/screens/Practice";
import User from "./src/screens/User";
import Login from "./src/screens/Auth/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WorkoutRecord" component={WorkoutRecord} />
        <Stack.Screen name="TargetsSetting" component={TargetsSetting} />
        <Stack.Screen name="Practice" component={Practice} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
