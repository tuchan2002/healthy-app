import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { useState } from "react";
import { convertDate } from "../utils/datetime";

export default function TabsBar({ defaultTab, tabs, onChangeTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleChangeTab = (tabKey) => {
    setActiveTab(tabKey);
    onChangeTab(tabKey);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.bar}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map((tab, index) => {
          return (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tab,
                index === 0 && { paddingLeft: 0 },
                index === tabs.length - 1 && { paddingRight: 0 },
              ]}
              onPress={() => handleChangeTab(tab.key)}
              disabled={tab.key > convertDate(Date.now()).day}
            >
              <CustomText
                style={[
                  styles.text,
                  activeTab === tab.key && styles.activeText,
                  tab.key > convertDate(Date.now()).day && styles.disabledText,
                ]}
              >
                {tab.name}
              </CustomText>
              {activeTab === tab.key && (
                <View
                  style={[
                    styles.underline,
                    index === 0 && { marginLeft: 0 },
                    index === tabs.length - 1 && { marginRight: 0 },
                  ]}
                ></View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  bar: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
  },

  text: {
    fontSize: 10,
  },

  activeText: {
    color: "#FFA239",
  },

  disabledText: {
    color: "#848484",
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "relative",
  },

  underline: {
    height: 2,
    backgroundColor: "#FFA239",
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginHorizontal: 16,
  },
});
