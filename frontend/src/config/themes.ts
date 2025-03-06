const purple = {
  name: "purple",
  bg: ["#FFFFFF", "#C5C5C5", "#A7A7A7", "#898989"],
  text: ["#1E1E1E", "#6D6D6D", "#A7A7A7", "#FFFFFF"],
  main: ["#EFD5F2", "#D2A0D9", "#C479D9", "#6903AD"],
  hl: ["#DC9D4F", "#BF8845", "#A2733A", "#855F30"],

  red: ["#ffa3b7", "#ff6e8d", "#ff3863", "#ff0037"],
};

const green = {
  name: "green",
  bg: purple.bg,
  text: purple.text,
  main: ["#B4F4FF", "#04B6CA", "#038290", "#025E73"],
  hl: ["#F2668B", "#D55A7A", "#B84D6A", "#9B4159"],

  red: purple.red,
};

const themes = [purple, green];

export default themes;
