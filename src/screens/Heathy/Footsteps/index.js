import { StyleSheet, View } from "react-native";
import TabsBar from "../../../components/TabsBar";
import Layout from "../../../layouts/Layout";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";
import DatePicker from "../../../components/screens/Healthy/Footsteps/DatePicker";
import CustomLineChart from "../../../components/screens/Healthy/Footsteps/CustomLineChart";
import { memo, useState } from "react";

const tabs = [
  {
    key: 1,
    name: "NGÀY",
  },
  {
    key: 2,
    name: "THÁNG",
  },
  {
    key: 3,
    name: "NĂM",
  },
];

const fakeChartData = [
  Math.round(Math.random() * 100),
  Math.round(Math.random() * 100),
  Math.round(Math.random() * 100),
  Math.round(Math.random() * 100),
  Math.round(Math.random() * 100),
];

function Footsteps() {
  const [chartData, setChartData] = useState(fakeChartData);
  const handleChangeTab = (tab) => {
    const data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    setChartData(data);
  };

  const handleChangeDate = (time) => {
    const data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
    ];
    setChartData(data);
  };
  return (
    <Layout>
      <HealthyHeaderBar title={"Thống kê bước chân"} />
      <View style={styles.container}>
        <TabsBar tabs={tabs} defaultTab={1} onChangeTab={handleChangeTab} />
        <DatePicker onChange={handleChangeDate} />
        <CustomLineChart data={chartData} />
      </View>
    </Layout>
  );
}

export default memo(Footsteps);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginHorizontal: "2%",
  },
});
