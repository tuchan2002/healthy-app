import React from "react";
import { useState, useRef, useEffect, createContext, useContext } from "react";
import { Accelerometer } from "expo-sensors";
import {
  insertStep,
  createTableSteps,
  countStepOfDay,
  droptTable,
} from "../data/stepCounter";
import { AuthContext } from "./AuthProvider";
import { createTableLastSync } from "../data/lastSync";

export const StepContext = createContext();

export const StepProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);
  const useForceUpdate = () => {
    const [, setState] = useState();
    return () => setState({});
  };

  const forceUpdate = useForceUpdate();
  const steps = useRef(0);

  const _slow = () => {
    Accelerometer.setUpdateInterval(30);
  };

  _slow();

  const _subscribe = async () => {
    let mArray = [];
    let start = false;
    let peak = false;
    let valuePeak = 9.81;
    let magnitudePrev = 9.81;
    let magnitudeMiddle = 9.81;
    setSubscription(
      Accelerometer.addListener((data) => {
        const x = data.x;
        const y = data.y;
        const z = data.z;
        const magnitude = 9.81 * Math.sqrt(x * x + y * y + z * z);

        if (start === false) {
          if (magnitudePrev + 0.5 < magnitudeMiddle) {
            start = true;
            mArray.push(magnitudePrev);
            mArray.push(magnitudeMiddle);
          }
        }

        if (start === true) {
          mArray.push(magnitude);
          if (
            peak === false &&
            magnitudePrev < magnitudeMiddle &&
            magnitudeMiddle > magnitude
          ) {
            peak = true;
            valuePeak = magnitudeMiddle;
          }

          if (peak === true && magnitudeMiddle > magnitude) {
            start = false;
            peak = false;
            if (valuePeak - mArray[0] > 4) {
              console.log(mArray);
              steps.current += 1;
              insertStep(valuePeak - mArray[0]);
              magnitudePrev = magnitudeMiddle;
              magnitudeMiddle = magnitude;
              mArray = [];
              forceUpdate();
            } else {
              start = false;
              peak = false;
              valuePeak = 9.81;
              mArray = [];
            }
          }
        }
        magnitudePrev = magnitudeMiddle;
        magnitudeMiddle = magnitude;
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    createTableLastSync();
    //droptTable("lastSync");
    createTableSteps();
    const getResult = async () => {
      const count = await countStepOfDay();
      steps.current = count;
      forceUpdate();
    };
    getResult();
  }, [authUser]);

  useEffect(() => {
    console.log(authUser);
    if (authUser && authUser.user_id) {
      _subscribe();
      return () => _unsubscribe();
    }
    if (!authUser) {
      _unsubscribe();
    }
  }, [authUser]);

  return (
    <StepContext.Provider value={{ steps }}>{children}</StepContext.Provider>
  );
};

export const useStep = () => useContext(StepContext);
