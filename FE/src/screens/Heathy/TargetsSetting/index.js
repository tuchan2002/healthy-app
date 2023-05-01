import { StyleSheet, View } from "react-native";
import Layout from "../../../layouts/Layout";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";
import * as DateTime from "../../../utils/datetime";
import CustomText from "../../../components/CustomText";
import TabsBar from "../../../components/TabsBar";
import TargetState from "./TargetState";
import { useState } from "react";

const tabs = [
  {
    name: "THỨ HAI",
    key: 2,
  },
  {
    name: "THỨ BA",
    key: 3,
  },
  {
    name: "THỨ TƯ",
    key: 4,
  },
  {
    name: "THỨ NĂM",
    key: 5,
  },
  {
    name: "THỨ SÁU",
    key: 6,
  },
  {
    name: "THỨ BẢY",
    key: 7,
  },
  {
    name: "CHỦ NHẬT",
    key: 8,
  },
];

export default function TargetsSetting() {
  const [activeTab, setActiveTab] = useState(
    DateTime.convertDate(new Date()).day,
  );

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <HealthyHeaderBar title="Cài đặt mục tiêu" />
      <View style={styles.container}>
        <CustomText style={[styles.date]}>
          {DateTime.convertDateToString1(Date.now())}
        </CustomText>
        <TabsBar
          tabs={tabs}
          defaultTab={activeTab}
          onChangeTab={handleChangeTab}
          type={"day"}
        />
        <TargetState day={activeTab} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "4%",
  },
  date: {
    textAlign: "center",
    fontSize: 12,
    marginVertical: 16,
  },
});
