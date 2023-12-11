let settings = {
    nPlayers: 2,
    nBalls: 1,
    isNWin: true,
    nWin: 10,
    paddleSize: 1,
    paddleSpeed: 10,
    ballSpeed: 1,
};

const newSettings = {
    nPlayers: 2,
    nBalls: 1,
    isNWin: true,
    nWin: 10,
    paddleSize: 1,
    paddleSpeed: 10,
    ballSpeed: 1,
};

const rangeInput = document.getElementById("nPlayers");
const rangeInputBalls = document.getElementById("nBalls");
const nPlayerResult = document.getElementById("nPlayerResult");
const nBallsResult = document.getElementById("nBallsResult");

const isNWin = document.getElementById("isNWin");
const nWin = document.getElementById("nWin");

const rangePaddleSize = document.getElementById("paddle-size-input");
const paddleSize = document.getElementById("paddle-size-title");

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
});

nWin.addEventListener("input", function() {
    newSettings.nWin = nWin.value;
});

rangePaddleSize.addEventListener("input", function() {
    if (rangePaddleSize.value == 0) {
        paddleSize.innerHTML = `Extra Small`;
        
        newSettings.paddleSize = 15;
    }
    if (rangePaddleSize.value == 1) {
        paddleSize.innerHTML = `small`;
        
        newSettings.paddleSize = rangePaddleSize.value * 5;
    }
    else if (rangePaddleSize.value == 2) {
        paddleSize.innerHTML = `medium`;
        newSettings.paddleSize = rangePaddleSize.value * 1.5;
    }
    else if (rangePaddleSize.value == 3) {
        paddleSize.innerHTML = `large`;
        newSettings.paddleSize = rangePaddleSize.value * 0.75;
    }
    else if (rangePaddleSize.value == 4) {
        paddleSize.innerHTML = `XXXL`;
        newSettings.paddleSize = rangePaddleSize.value * 0.5;
    }
});


const rangePaddleSpeed = document.getElementById("paddle-speed-input");
const paddleSpeed = document.getElementById("paddle-speed-title");

rangePaddleSpeed.addEventListener("input", function() {
    if (rangePaddleSpeed.value == 0) {
        paddleSpeed.innerHTML = `Extra Slow`;
        newSettings.paddleSpeed = 2;
    }
    if (rangePaddleSpeed.value == 1) {
        paddleSpeed.innerHTML = `Slow`;
        newSettings.paddleSpeed = 5;
    }
    else if (rangePaddleSpeed.value == 2) {
        paddleSpeed.innerHTML = `medium`;
        newSettings.paddleSpeed = 10;
    }
    else if (rangePaddleSpeed.value == 3) {
        paddleSpeed.innerHTML = `Fast`;
        newSettings.paddleSpeed = 15;
    }
    else if (rangePaddleSpeed.value == 4) {
        paddleSpeed.innerHTML = `Extra Fast`;
        newSettings.paddleSpeed = 20;
    }
});

const rangeBallSpeed = document.getElementById("ball-speed-input");
const ballSpeed = document.getElementById("ball-speed-title");

rangeBallSpeed.addEventListener("input", function() {
    if (rangeBallSpeed.value == 0) {
        ballSpeed.innerHTML = `Extra Slow`;
        newSettings.ballSpeed = 0.25;
    }
    else if (rangeBallSpeed.value == 1) {
        ballSpeed.innerHTML = `Slow`;
        newSettings.ballSpeed = 0.5;
    }
    else if (rangeBallSpeed.value == 2) {
        ballSpeed.innerHTML = `medium`;
        newSettings.ballSpeed = 1;
    }
    else if (rangeBallSpeed.value == 3) {
        ballSpeed.innerHTML = `Fast`;
        newSettings.ballSpeed = 2;
    }
    else if (rangeBallSpeed.value == 4) {
        ballSpeed.innerHTML = `Extra Fast`;
        newSettings.ballSpeed = 4;
    }

});




// save buttons
const saveButton = document.getElementById("saveChangesButton");
saveButton.addEventListener("click", function() {
    Object.assign(settings, newSettings);
});

export { settings };
