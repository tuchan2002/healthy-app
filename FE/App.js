import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Heathy/Home";
import TargetsSetting from "./src/screens/Heathy/TargetsSetting";
import WorkoutRecord from "./src/screens/Heathy/WorkoutRecord";
import Practice from "./src/screens/Practice";
import User from "./src/screens/User";
import Login from "./src/screens/Auth/Login";
import Footsteps from "./src/screens/Heathy/Footsteps";
import Exercises from "./src/screens/Practice/Exercises";
import Detail from "./src/screens/Practice/Exercises/Detail"
import BMISetting from "./src/screens/Auth/BMISetting";

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
        <Stack.Screen name="BMISetting" component={BMISetting} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="WorkoutRecord" component={WorkoutRecord} />
        <Stack.Screen name="TargetsSetting" component={TargetsSetting} />
        <Stack.Screen name="Practice" component={Practice} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Footsteps" component={Footsteps} />
        <Stack.Screen name="Exercises" component={Exercises} />
        <Stack.Screen name="Video" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
