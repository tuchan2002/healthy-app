import { StyleSheet, View } from "react-native";
import TopContent from "./TopContent";
import BottomContent from "./BottomContent";
import { useContext, useEffect, useState } from "react";
import { handleGetTargetStates } from "../../../../services/userTargetState";
import { AuthContext } from "../../../../providers/AuthProvider";

export default function TargetState({ day }) {
  const [targetState, setTargetState] = useState();
  const [targetStates, setTargetStates] = useState();
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    getTargetStates();
  }, []);

  const getTargetStates = async () => {
    const res = await handleGetTargetStates(authUser.user_id);
    setTargetStates(res.data);
  };

  useEffect(() => {
    if (day && targetStates) {
      setTargetState(targetStates[day - 2] || {});
    }
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
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
