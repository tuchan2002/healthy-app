import { memo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TabsBar from "../../../components/TabsBar";
import Layout from "../../../layouts/Layout";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";
import DatePicker from "../../../components/screens/Healthy/Footsteps/DatePicker";
import CustomLineChart from "../../../components/screens/Healthy/Footsteps/CustomLineChart";
import {
  getStepByDate,
  getStepByMonth,
  getStepByYear,
} from "../../../data/stepCounter";
import moment from "moment";
import {
  buildSteps,
  buildLabelsSteps,
  buildDayOfMonth,
} from "../../../constants/step";
import { labelExample, labelsMonth } from "../../../constants/lablesChart";

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

function Footsteps() {
  const [chartData, setChartData] = useState(new Array(96).fill(0));
  const [labels, setLabels] = useState(buildLabelsSteps());
  const [date, setDate] = useState(
    new Date(new Date().getTime() + 7 * 60 * 60 * 1000)
  );

  const [keyTab, setKeyTab] = useState(1);

  const fetchStepsByDate = async (date) => {
    const dateBuild = moment(date).format("YYYY-MM-DD");
    const steps = await getStepByDate(dateBuild);
    const dataSteps = buildSteps(steps, labels);
    setChartData(dataSteps);
  };

  const fetchStepsByMonth = async (date) => {
    const dateBuild = moment(date).format("YYYY-MM-DD");
    const steps = await getStepByMonth(dateBuild);
    const dataSteps = buildSteps(steps, labels);
    setChartData(dataSteps);
  };

  const fetchStepsByYear = async (date) => {
    const dateBuild = moment(date).format("YYYY-MM-DD");
    const steps = await getStepByYear(dateBuild);
    const dataSteps = buildSteps(steps, labels);
    setChartData(dataSteps);
  };

  useEffect(() => {
    let labelSet = [];
    if (keyTab === 1) {
      labelSet = buildLabelsSteps();
    } else if (keyTab === 3) {
      labelSet = labelsMonth;
    } else if (keyTab === 2) {
      labelSet = buildDayOfMonth(date.getMonth());
    }
    setLabels(labelSet);
  }, [keyTab]);

  useEffect(() => {
    fetchDataChart();
  }, [date, labels]);

  const fetchDataChart = () => {
    if (keyTab === 1) {
      fetchStepsByDate(date);
    } else if (keyTab === 2) {
      fetchStepsByMonth(date);
    } else if (keyTab === 3) {
      fetchStepsByYear(date);
    } else {
      setLabels([]);
      setChartData([]);
    }
  };

  const handleChangeTab = (tab) => {
    console.log(tab);
    setKeyTab(tab);
  };

  const handleChangeDate = (time) => {
    const newDate = new Date(new Date(time).getTime());
    setDate(newDate);
  };

  return (
    <Layout>
      <HealthyHeaderBar title={"Thống kê bước chân"} />
      <View style={styles.container}>
        <TabsBar
          tabs={tabs}
          defaultTab={keyTab}
          onChangeTab={handleChangeTab}
        />
        <DatePicker onChange={handleChangeDate} />
        <CustomLineChart data={chartData} labels={labels} />
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
