const standByButton = document.querySelector(".standby-mode");
const operatingButton = document.querySelector(".operating-mode");
const redLight = document.querySelector(".red-light");
const yellowLight = document.querySelector(".yellow-light");
const greenLight = document.querySelector(".green-light");
let standByTimer, greenTimer;
const timeouts = [];
const controlFunctions = [
  {
    func: toggleLight,
    light: redLight
  },
  {
    func: toggleLight,
    light: yellowLight
  },
  {
    func: toggleLight,
    light: yellowLight
  },
  {
    func: toggleLight,
    light: greenLight
  },
  {
    func: flashGreen,
    light: greenLight
  },
  {
    func: toggleLight,
    light: yellowLight
  },
  {
    func: toggleLight,
    light: yellowLight
  }
];
const timings = [4000, 2000, 4000, 4000, 6000, 9500, 11500];

function toggleLight(light) {
  light.classList.toggle("active");
}

function deactivateLights() {
  document
    .querySelectorAll(".container > div")
    .forEach(light => light.classList.remove("active"));
}

function flashGreen() {
  greenTimer = setInterval(toggleLight, 500, greenLight);
  timeouts.push(greenTimer);
  timeouts.push(setTimeout(() => {
    clearInterval(greenTimer);
  }, 3500));
}

function onOperatingMode() {
  redLight.classList.add("active");
  timeouts.push(setTimeout(onOperatingMode, 11500));
  for (let i = 0; i < controlFunctions.length; i++) {
    if (controlFunctions[i].func === flashGreen) {
      timeouts.push(setTimeout(controlFunctions[i].func, 6000));
    } else {
      timeouts.push(setTimeout(controlFunctions[i].func, timings[i], controlFunctions[i].light))
    }
  }
}

operatingButton.addEventListener("click", event => {
  clearInterval(standByTimer);
  deactivateLights();
  event.target.disabled = true;
  standByButton.disabled = false;
  onOperatingMode();
});

standByButton.addEventListener("click", event => {
  timeouts.forEach(timeout => {
    clearTimeout(timeout);
    clearInterval(timeout);
  });
  deactivateLights();
  event.target.disabled = true;
  operatingButton.disabled = false;
  standByTimer = setInterval(toggleLight, 500, yellowLight);
});
