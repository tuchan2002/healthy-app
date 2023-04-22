import { Accelerometer } from "expo-sensors";
export const calculateEMA = (mArray, mRange) => {
  const k = 2 / (mRange + 1);
  let ema = mArray[0];
  for (let i = 1; i < mArray.length; i++) {
    ema = mArray[i] * k + ema * (1 - k);
  }
  return ema;
};

const _subscribe = async () => {
  let mArray = [];
  let start = false;
  let peak = false;
  let valuePeak = 9.81;
  let magnitudePrev = 9.81;
  let magnitudeMiddle = 9.81;
  let i = 0;
  setSubscription(
    Accelerometer.addListener(async (data) => {
      const x = data.x;
      const y = data.y;
      const z = data.z;
      const magnitude = 9.81 * Math.sqrt(x * x + y * y + z * z);
      console.log(magnitudePrev + ", " + magnitudeMiddle + ", " + magnitude);
      const magnitudeDelta = magnitudeMiddle - magnitudePrev;

      if (start === false) {
        if (magnitudePrev + 0.5 < magnitudeMiddle) {
          console.log("Start.................");
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
          if (valuePeak - mArray[0] > 3.5) {
            steps.current += 1;
          }
          console.log(steps.current);
          console.log(mArray);
          console.log("speed, ", valuePeak - mArray[0]);
          console.log("End.................");
          mArray = [];
          forceUpdate();
        }
      }
      magnitudePrev = magnitudeMiddle;
      magnitudeMiddle = magnitude;
    })
  );
};

const readFile = async () => {
  try {
    data = await FileSystem.readAsStringAsync(
      FileSystem.documentDirectory + "data.csv"
    );
  } catch (error) {
    console.log(error);
  }
};

const writeFile = async () => {
  try {
    let data = "";

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "data.csv",
      data + content
    );
    console.log("write true:", data + content);
  } catch (e) {
    console.log("error", e);
  }
};
