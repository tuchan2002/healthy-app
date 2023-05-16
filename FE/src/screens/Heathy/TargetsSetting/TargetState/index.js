import { StyleSheet, View } from "react-native";
import TopContent from "./TopContent";
import BottomContent from "./BottomContent";
import { useContext, useEffect, useState } from "react";
import { handleGetTargetStates } from "../../../../services/userTargetState";
import { AuthContext } from "../../../../providers/AuthProvider";
import moment from "moment";
import { getStepByDate } from "../../../../data/stepCounter";
import { convertDate } from "../../../../utils/datetime";
import { buildSteps } from "../../../../constants/step";

export default function TargetState({ day }) {
  const [targetState, setTargetState] = useState();
  const [targetStates, setTargetStates] = useState();
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    getTargetStates();
  }, []);

  const handleChangeTargetDetail = (newTargetDetail) => {
    setTargetState({
      ...targetState,
      UserTarget: newTargetDetail,
    });
  };

  const getTargetStates = async () => {
    const res = await handleGetTargetStates(authUser.user_id);
    setTargetStates(res.data);
  };

  useEffect(() => {
    const getInitialData = async () => {
      if (day && targetStates) {
        const tS = targetStates[day - 2] || {};
        const date = new Date();
        date.setDate(date.getDate() - (convertDate(new Date()).day - day));
        console.log("date", convertDate(new Date()).day - day);
        const dateBuild = moment(date).format("YYYY-MM-DD");
        const steps = await getStepByDate(dateBuild);
        setTargetState({
          ...tS,
          steps,
        });
      }
    };

    getInitialData();
  }, [day, targetStates]);

  return (
    <View>
      {targetState && (
        <>
          <TopContent
            targetState={targetState}
            targetDetail={targetState?.UserTarget}
          />
          <BottomContent
            targetState={targetState}
            targetDetail={targetState?.UserTarget}
            onChange={(newTargetDetail) =>
              handleChangeTargetDetail(newTargetDetail)
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
