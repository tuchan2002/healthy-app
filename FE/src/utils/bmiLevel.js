import CustomText from "../components/CustomText";
import bmiValues from "../constants/bmiValues";

export const checkLevelBmi = (bmi) => {
  if (bmi) {
    const bmiValue = (bmi.weight / ((bmi.height * bmi.height) / 10000)).toFixed(
      2
    );

    for (key in bmiValues) {
      if (
        bmiValue >= bmiValues[key].minValue &&
        bmiValue <= bmiValues[key].maxValue
      ) {
        return (
          <CustomText
            fontFamily="NunitoSans-Bold"
            style={[{ color: bmiValues[key].color }]}
          >
            {bmiValues[key].content}
          </CustomText>
        );
      }
    }
  } else {
    return "---";
  }
};
