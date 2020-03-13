let baseInterval = intervalInput.value;
let countdownFrequency = baseInterval >= 1000 ? 1000 : baseInterval;
const timeouts = [];
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

function toggleLight(light) {
  light.classList.toggle("active");
}

function clearAppState(event) {
  timeouts.forEach(timeout => {
    clearTimeout(timeout);
    clearInterval(timeout);
  });
  greenCountdownCell.textContent = "";
  document
    .querySelectorAll(".container > div")
    .forEach(light => light.classList.remove("active"));
  if (event) event.target.disabled = true;
}

function validateInterval(interval) {
  if (interval < 1) return;
  return !/\D/g.test(String(interval));
}

function greenLightCountdown() {
  let secRemained = (4 * baseInterval) / 1000;
  greenCountdownCell.textContent = Number.isInteger(secRemained)
    ? secRemained
    : secRemained.toFixed(1);
  let timer = setInterval(() => {
    secRemained -= countdownFrequency / 1000;
    greenCountdownCell.textContent = Number.isInteger(secRemained)
      ? secRemained
      : secRemained.toFixed(1);
  }, countdownFrequency);
  timeouts.push(timer);
  timeouts.push(
    setTimeout(() => {
      clearInterval(timer);
      greenCountdownCell.textContent = "";
    }, 4 * baseInterval)
  );
}

function onOperatingMode() {
  redLight.classList.add("active");
  timeouts.push(setTimeout(onOperatingMode, 23 * baseInterval));
  timeouts.push(setTimeout(greenLightCountdown, 8 * baseInterval));
  for (let i = 0; i < controlPoints.length; i++) {
    timeouts.push(
      setTimeout(toggleLight, controlPoints[i].timing, controlPoints[i].light)
    );
  }
}

intervalInput.addEventListener("change", event => {
  if (!validateInterval(+event.target.value)) {
    wrongInterval.textContent = "Wrong value for interval";
    return;
  }
  wrongInterval.textContent = "";
  if (+event.target.value !== baseInterval) {
    const ratio = +event.target.value / baseInterval;
    controlPoints.forEach(control => (control.timing *= ratio));
    clearAppState();
    operatingButton.disabled = false;
  }
  baseInterval = +event.target.value;
  countdownFrequency = baseInterval >= 1000 ? 1000 : baseInterval;
});

operatingButton.addEventListener("click", event => {
  clearAppState(event);
  standByButton.disabled = false;
  stopTrafficLight.disabled = false;
  timeouts.push(setTimeout(onOperatingMode, 0));
});

standByButton.addEventListener("click", event => {
  clearAppState(event);
  operatingButton.disabled = false;
  stopTrafficLight.disabled = false;
  timeouts.push(setInterval(toggleLight, baseInterval, yellowLight));
});

stopTrafficLight.addEventListener("click", event => {
  clearAppState(event);
  standByButton.disabled = false;
  operatingButton.disabled = false;
});
