const chalk = require("chalk");
const baseInterval = +process.argv[2] || 500;
const mode = +process.argv[3] || 1;
const timeouts = [];
const redLight = {
  name: "red",
  active: false
};
const yellowLight = {
  name: "yellow",
  active: false
};
const greenLight = {
  name: "green",
  active: false
};
const controlPoints = [
  { light: redLight, timing: 8 * baseInterval },
  { light: yellowLight, timing: 4 * baseInterval },
  { light: yellowLight, timing: 8 * baseInterval },
  { light: greenLight, timing: 8 * baseInterval },
  { light: greenLight, timing: 12 * baseInterval },
  { light: greenLight, timing: 13 * baseInterval },
  { light: greenLight, timing: 14 * baseInterval },
  { light: greenLight, timing: 15 * baseInterval },
  { light: greenLight, timing: 16 * baseInterval },
  { light: greenLight, timing: 17 * baseInterval },
  { light: greenLight, timing: 18 * baseInterval },
  { light: yellowLight, timing: 19 * baseInterval },
  { light: yellowLight, timing: 23 * baseInterval }
];

function printState() {
  console.log(`
    --------
    |  ${redLight.active ? chalk.bgRed(redLight.name) : chalk.gray(redLight.name)} |
    --------
    |${yellowLight.active ? chalk.bgYellow.black(yellowLight.name) : chalk.gray(yellowLight.name)}|
    --------
    | ${greenLight.active ? chalk.bgGreen.white(greenLight.name) : chalk.gray(greenLight.name)}|
    --------
  `)
  setTimeout(() => console.clear(), baseInterval);
}

setInterval(printState, baseInterval)

function onOperatingMode() {
  toggleLight(redLight);
  timeouts.push(setTimeout(onOperatingMode, 23 * baseInterval));
  for (let i = 0; i < controlPoints.length; i++) {
    timeouts.push(
      setTimeout(toggleLight, controlPoints[i].timing, controlPoints[i].light)
    );
  }
}

function toggleLight(light) {
  light.active = !light.active;
}

if (mode === 1) {
  onOperatingMode();
} else if (mode === 2) {
  setInterval(toggleLight, baseInterval, yellowLight);
}