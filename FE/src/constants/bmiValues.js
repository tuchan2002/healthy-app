export default {
  underWeight: {
    minValue: 0,
    maxValue: 18.5,
    content: "Gầy",
    color: "#5ABCE3",
  },
  normal: {
    minValue: 18.6,
    maxValue: 24.9,
    content: "Bình thường",
    color: "#9FB536",
  },
  overWeight: {
    minValue: 25,
    maxValue: 29.9,
    content: "Thừa cân",
    color: "#F48221",
  },
  obese: {
    minValue: 30,
    maxValue: 34.9,
    content: "Béo",
    color: "#E74536",
  },
  extremlyObese: {
    minValue: 35,
    maxValue: Number.MAX_SAFE_INTEGER,
    content: "Béo phì",
    color: "#BE3B8B",
  },
};
