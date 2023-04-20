import { Pedometer } from "expo-sensors";

/**
 * Subcribe count step.
 *
 * @param {Function} setStepCount
 */
export const subscribe = (setStepCount) => {
  Pedometer.isAvailableAsync().then(
    (result) => {
      const subsription = Pedometer.watchStepCount((results) => {
        console.log(results);
        setStepCount(results.steps);
      });
    },
    (error) => {
      console.log(error);
    },
  );
};
