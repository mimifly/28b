const canvas = document.getElementById("callCanvas");
const numerator = document.querySelector(".calls-numerator");
const denominator = document.querySelector(".calls-denominator");

// Simulating random
const allTopic = {
  adherence: Math.ceil(Math.random() * 10),
  "combination therapy": Math.ceil(Math.random() * 10),
  dosing: Math.ceil(Math.random() * 10),
  guidelines: Math.ceil(Math.random() * 10),
  safety: Math.ceil(Math.random() * 10),
  other: Math.ceil(Math.random() * 3),
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

const barAvgSegments = barAvg.querySelectorAll(".bar-segment");

// Setting the bars according to the % values

Array.from(barAvgSegments).forEach((segment) => {
  const dataTopic = segment.getAttribute("data-topic");
  segment.style.flex = allTopicPercentages[dataTopic];
});

// setting % for display

Array.from(barAvgSegments).forEach((segment) => {
  const dataTopic = segment.getAttribute("data-topic");
  if (dataTopic === "other") return;
  segment.querySelector("span").innerHTML =
    allTopicPercentages[dataTopic] + "%";
});
