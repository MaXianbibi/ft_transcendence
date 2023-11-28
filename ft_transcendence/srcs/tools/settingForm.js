let settings = {
    nPlayers: 2,
    nBalls: 1,
};

const newSettings = {
    nPlayers: 2,
    nBalls: 1,
};

const rangeInput = document.getElementById("nPlayers");
const rangeInputBalls = document.getElementById("nBalls");
const nPlayerResult = document.getElementById("nPlayerResult");
const nBallsResult = document.getElementById("nBallsResult");

rangeInput.addEventListener("input", function() {
    newSettings.nPlayers = rangeInput.value;
    nPlayerResult.innerHTML = newSettings.nPlayers;
});

rangeInputBalls.addEventListener("input", function() {
    newSettings.nBalls = rangeInputBalls.value;
    nBallsResult.innerHTML = newSettings.nBalls;
});

const saveButton = document.getElementById("saveChangesButton");
saveButton.addEventListener("click", function() {
    Object.assign(settings, newSettings);
});

export { settings };
