let settings = {
    nPlayers: 2,
    nBalls: 1,
    isNWin: true,
    nWin: 10,
};

const newSettings = {
    nPlayers: 2,
    nBalls: 1,
    isNWin: true,
    nWin: 10,
};

const rangeInput = document.getElementById("nPlayers");
const rangeInputBalls = document.getElementById("nBalls");
const nPlayerResult = document.getElementById("nPlayerResult");
const nBallsResult = document.getElementById("nBallsResult");

const isNWin = document.getElementById("isNWin");
const nWin = document.getElementById("nWin");


rangeInput.addEventListener("input", function() {
    newSettings.nPlayers = rangeInput.value;
    nPlayerResult.innerHTML = newSettings.nPlayers;
});

rangeInputBalls.addEventListener("input", function() {
    newSettings.nBalls = rangeInputBalls.value;




    nBallsResult.innerHTML = newSettings.nBalls;
});


// Gestionnaire d'événements pour le changement de la case à cocher
isNWin.addEventListener("change", function() {
    newSettings.isNWin = isNWin.checked;

    nWin.disabled = !isNWin.checked;

    console.log(nWin)

});

nWin.addEventListener("change", function() {
    console.log("dsa")
});




// save buttons
const saveButton = document.getElementById("saveChangesButton");
saveButton.addEventListener("click", function() {
    Object.assign(settings, newSettings);
});




export { settings };
