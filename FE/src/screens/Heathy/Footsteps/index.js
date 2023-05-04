import { memo, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import TabsBar from "../../../components/TabsBar";
import Layout from "../../../layouts/Layout";
import HealthyHeaderBar from "../../../components/layout/HeathyHeaderBar";
import DatePicker from "../../../components/screens/Healthy/Footsteps/DatePicker";
import { CustomLineChart as LineChartClass } from "../../../components/class/CustomLineChart";
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
  buildTimeLabel,
} from "../../../constants/step";
import { labelsMonth } from "../../../constants/lablesChart";
import { SCREEN_WIDTH } from "../../../constants/size";
import color from "../../../constants/color";
import { Svg, Line } from "react-native-svg";
import { useLoading } from "../../../providers/LoadingProvider";

function Footsteps() {
  const { setLoading } = useLoading();
  const [keyTab, setKeyTab] = useState(1);
  const [chartData, setChartData] = useState(new Array(96).fill(0));
  const [labels, setLabels] = useState(buildLabelsSteps());
  const [date, setDate] = useState(new Date());
  const labelsDate = buildLabelsSteps();
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    index: 0,
    value: 0,
    visible: false,
  });
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

  const fetchSteps = async (date) => {
    const dateBuild = moment(date).format("YYYY-MM-DD");
    let steps = [];
    if (keyTab === 1) {
      steps = await getStepByDate(dateBuild);
    } else if (keyTab === 2) {
      steps = await getStepByMonth(dateBuild);
    } else {
      steps = await getStepByYear(dateBuild);
    }
    const dataSteps = await buildSteps(steps, labels);
    setChartData(dataSteps);
  };

  useEffect(() => {
    setLoading(true);
    if (keyTab === 1) {
      setLabels(labelsDate);
    } else if (keyTab === 2) {
      setLabels(buildDayOfMonth(date.getMonth()));
    } else if (keyTab === 3) {
      setLabels(labelsMonth);
    }
  }, [keyTab]);

  useEffect(() => {
    fetchDataChart();
  }, [date, labels]);

  const fetchDataChart = async () => {
    setLoading(true);
    await fetchSteps(date);
    resetTooltip();
    setLoading(false);
  };

  const resetTooltip = () => {
    setTooltipPos({
      x: 40,
      value: chartData[0],
      index: 0,
      y: 0,
    });
  };

  const handleChangeTab = (tab) => {
    if (tab !== keyTab) {
      setKeyTab(tab);
    }
  };

  const handleChangeDate = (time) => {
    const newDate = new Date(new Date(time).getTime());
    setDate(newDate);
  };

  const handlerClickPointChart = (data) => {
    // check if we have clicked on the same point again
    let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

    // if clicked on the same point again toggle visibility
    // else,render tooltip to new position and update its value
    isSamePoint
      ? setTooltipPos((previousState) => {
          return {
            ...previousState,
            value: data.value,
            visible: !previousState.visible,
          };
        })
      : setTooltipPos({
          x: data.x,
          value: data.value,
          index: data.index,
          y: data.y,
          visible: true,
        });
  }; // end function

  const chartConfig = {
    withOuterLines: false,
    backgroundColor: color.bg,
    decimalPlaces: 0,
    strokeWidth: 2,
    color: (opacity = 1) => `rgba(231, 85, 85, ${1})`,
    labelColor: (opacity = 1) => `rgba(133, 133, 133, ${opacity})`,
    propsForDots: {
      r: "4",
      strokeWidth: "1",
      stroke: color.bg,
    },
    propsForBackgroundLines: {
      stroke: "rgba(133, 133, 133, 0.2)",
      strokeDasharray: "",
    },
    useShadowColorFromDataset: true,
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

        <LineChartClass
          data={{
            labels: labels,
            datasets: [
              {
                data: chartData,
              },
            ],
          }}
          width={SCREEN_WIDTH - 20}
          height={250}
          chartConfig={chartConfig}
          withVerticalLines={false}
          style={{
            margin: 0,
            paddingRight: 40,
            backgroundColor: "white",
            borderRadius: 10,
          }}
          renderHorizontalLines={{
            width: 20,
          }}
          onDataPointClick={(data) => handlerClickPointChart(data)}
          decorator={() => {
            return (
              <View>
                <View
                  style={{
                    transform: [
                      {
                        translateX: SCREEN_WIDTH / 2 - 60,
                      },
                      {
                        translateY: 10,
                      },
                    ],
                  }}
                >
                  <View style={{ display: "flex", justifyContent: "center" }}>
                    <Text>{buildTimeLabel(tooltipPos, keyTab)}</Text>
                    <Text>{tooltipPos.value + " bước"}</Text>
                  </View>
                </View>
                <View>
                  <Svg>
                    <Line
                      x1={tooltipPos.x}
                      x2={tooltipPos.x}
                      y1={40}
                      y2={280}
                      stroke="rgba(231, 85, 85, 1)"
                      strokeWidth="1"
                    />
                  </Svg>
                </View>
              </View>
            );
          }}
        />
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
