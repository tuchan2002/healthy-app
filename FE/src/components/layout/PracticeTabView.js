import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Running from "../../screens/Practice/Running";
import CustomText from "../CustomText";
import Cycling from "../../screens/Practice/Cycling";
import Exercises from "../../screens/Practice/Exercises";

export default function PracticeTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "running", title: "Chạy bộ" },
    { key: "cycling", title: "Đạp xe" },
    { key: "exercises", title: "Bài tập" },
  ]);

  const renderScene = SceneMap({
    running: Running,
    cycling: Cycling,
    exercises: Exercises,
  });

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "#FFA239" }}
        style={{ backgroundColor: "white" }}
        renderLabel={({ route, focused, color }) => (
          <CustomText
            style={[
              { color: focused ? "#FFA239" : "black", margin: 8, fontSize: 16 },
            ]}
          >
            {route.title}
          </CustomText>
        )}
      />
    );
  };
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
