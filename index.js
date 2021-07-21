const canvas = document.getElementById("callCanvas");
const numerator = document.querySelector(".calls-numerator");
const denominator = document.querySelector(".calls-denominator");

// Simulating random
const allTopic = {
  Adherence: Math.ceil(Math.random() * 10),
  "Combination Therapy": Math.ceil(Math.random() * 10),
  Dosing: Math.ceil(Math.random() * 10),
  Guidelines: Math.ceil(Math.random() * 10),
  Safety: Math.ceil(Math.random() * 10),
  Other: Math.ceil(Math.random() * 3),
};

let sumOfAllTopics = Object.values(allTopic).reduce((sum, e) => sum + e);
let numeratorValue = Math.floor(1 + Math.random() * sumOfAllTopics);

numerator.innerHTML = numeratorValue;
denominator.innerHTML = `/ ${sumOfAllTopics}`;

// canvas draw
const canvasWidth = canvas.getAttribute("width");
const canvasHeight = canvas.getAttribute("height");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 15;
ctx.strokeStyle = "rgb(221, 221, 221)";
ctx.beginPath();
ctx.arc(
  canvasWidth / 2,
  canvasHeight / 2,
  (canvasWidth / 2) * 0.85,
  0,
  2 * Math.PI
);

ctx.stroke();

ctx.strokeStyle = "rgb(246,139,21)";
ctx.beginPath();
ctx.arc(
  canvasWidth / 2,
  canvasHeight / 2,
  (canvasWidth / 2) * 0.9,
  0,
  2 * Math.PI * (numeratorValue / sumOfAllTopics)
);
ctx.stroke();

let percentage = Object.values(allTopic).map((e) =>
  Math.round((e * 100) / sumOfAllTopics)
);

// converting the instances of the different topics into percentages value

const allTopicPercentages = Object.keys(allTopic).reduce(
  (output, topic) => ({
    ...output,
    [topic]: Math.round((allTopic[topic] * 100) / sumOfAllTopics),
  }),
  {}
);

// targetting the specific bars and segments

const barAvg = document.querySelector(".bar-avg");
const avgAdherence = barAvg.querySelector(".bar-segment-adherence");
const avgCombinationTherapy = barAvg.querySelector(
  ".bar-segment-combination-therapy"
);
const avgDosing = barAvg.querySelector(".bar-segment-dosing");
const avgGuidelines = barAvg.querySelector(".bar-segment-guidelines");
const avgSafety = barAvg.querySelector(".bar-segment-safety");
const avgOther = barAvg.querySelector(".bar-segment-other");

// Setting the bars according to the % values

avgAdherence.style.flex = allTopicPercentages["Adherence"];
avgCombinationTherapy.style.flex = allTopicPercentages["Combination Therapy"];
avgDosing.style.flex = allTopicPercentages["Dosing"];
avgGuidelines.style.flex = allTopicPercentages["Guidelines"];
avgSafety.style.flex = allTopicPercentages["Safety"];
avgOther.style.flex = allTopicPercentages["Other"];

// setting % for display

avgAdherence.querySelector("span").innerHTML =
  allTopicPercentages["Adherence"] + "%";
avgCombinationTherapy.querySelector("span").innerHTML =
  allTopicPercentages["Combination Therapy"] + "%";
avgDosing.querySelector("span").innerHTML = allTopicPercentages["Dosing"] + "%";
avgGuidelines.querySelector("span").innerHTML =
  allTopicPercentages["Guidelines"] + "%";
avgSafety.querySelector("span").innerHTML = allTopicPercentages["Safety"] + "%";
