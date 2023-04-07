import { StyleSheet, View } from "react-native";
import TopContent from "./TopContent";
import BottomContent from "./BottomContent";
import targetStates from "../../../../assets/fakeDatas/targetStates";
import { useEffect, useMemo, useState } from "react";

const defaultTargetDetail = {
  getUpAt: new Date(2023, 4, 6, 6, 0),
  sleepAt: new Date(2023, 4, 6, 23, 0),
  stepsNumber: 10000,
  calo: 400,
};

export default function TargetState({ day }) {
  const [targetState, setTargetState] = useState();
  const [targetDetail, setTargetDetail] = useState(defaultTargetDetail);

  useEffect(() => {
    if (day) {
      setTargetState(targetStates[day - 2]);
    }
  }, [day]);

  const handleChange = (changedTarget) => {
    setTargetDetail(changedTarget);
  };
  return (
    <View>
      {targetState && (
        <>
          <TopContent targetState={targetState} targetDetail={targetDetail} />
          <BottomContent
            targetState={targetState}
            targetDetail={targetDetail}
            onChange={handleChange}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
