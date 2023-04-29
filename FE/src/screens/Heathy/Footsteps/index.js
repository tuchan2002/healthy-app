import { memo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TabsBar from "../../../components/TabsBar";
import Layout from "../../../layouts/Layout";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";
import DatePicker from "../../../components/screens/Healthy/Footsteps/DatePicker";
import CustomLineChart from "../../../components/screens/Healthy/Footsteps/CustomLineChart";
import { getStepByDate } from "../../../data/stepCounter";
import moment from "moment";
import { buildSteps, buildLabelsSteps } from "../../../constants/step";

import color from "../../../constants/color";

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
  const [chartData, setChartData] = useState(new Array(96).fill(0));
  const [steps, setSteps] = useState([]);
  const dataLabel = buildLabelsSteps();

  const fetchStepsByDate = async (date) => {
    const steps = await getStepByDate(date);
    const dataSteps = buildSteps(steps);
    setChartData(dataSteps);
  };

  useEffect(() => {
    const date = new Date(new Date().getTime() + 7 * 60 * 60 * 1000);
    fetchStepsByDate(moment(date).format("YYYY-MM-DD"));
  }, []);

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
        <CustomLineChart data={chartData} labels={dataLabel} />
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
