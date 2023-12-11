import './style.css'
import { Canvas } from "./class/Canvas.js";
import { Scene, Circle } from "./class/Scene.js";
import { githubVersion } from "./tools/githubAPI.js";
import { Player } from "./class/Player.js";
import { Ball } from './class/Balls.js';

import { spashScreen } from './tools/splashScreen.js';

let keysPressed = {};

function setupGame({ scene, canvas, rect }) {

  canvas.resize();
  scene.setBackground('white');
  scene.run();

  // INIT PLAYER 

  const player = new Player({ canvas, x: 0 });
  const player2 = new Player({ canvas, x: canvas.size.x - canvas.size.x / 70 - canvas.size.x / 70 - 10 });

  let keys = ['w', 's'];
  player.keySetup({ keyPressed: keysPressed, listofKeys: keys });;

  keys = ['ArrowUp', 'ArrowDown'];
  player2.keySetup({ keyPressed: keysPressed, listofKeys: keys });;


  player.paddleSize = scene.settings.paddleSize;

  // INIT BALL

  for (let i = 0; i < scene.settings.nBalls; i++) {
    scene.addObjects(new Ball({ canvas }));
  }
  scene.addElement(player);
  scene.addElement(player2);


  // EVENT LISTENERS


  const settingButton = document.getElementById('setting-button');
  settingButton.addEventListener("click", function () {
    scene.gameOn = false;
  });

  const saveButton = document.getElementById("saveChangesButton");
  saveButton.addEventListener("click", function () {
    if (scene.firstRun) scene.gameOn = true;


  });

  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", function () {
    if (scene.firstRun) scene.gameOn = true;
  });



  window.addEventListener('resize', () => { canvas.run({ elements: scene.elements, objects: scene.objects }) });

  window.addEventListener('keydown', (event) => {


    if (event.key === ' ') {
      console.log("sa")
      event.preventDefault()
      scene.gameOn = !scene.gameOn;
      scene.firstRun = true;


      if (scene.playerWin.hasWin) {
        scene.playerWin.hasWin = false;
        scene.playerWin.text = "";
        scene.elements.forEach(element => {

          element.score = 0;
        });

      }

      return;
    }

    if (keysPressed[event.key] === undefined) return;

    event.preventDefault()
    keysPressed[event.key].keyUp = true;

  });

  window.addEventListener('keyup', (event) => {
    if (keysPressed[event.key] === undefined) return;
    event.preventDefault()
    keysPressed[event.key].keyUp = false;
  });

  // return ball;

}

function initGame() {
  const canvas = new Canvas();
  const scene = new Scene({ canvas: canvas.canvas, ctx: canvas.ctx });


  return [scene, canvas];
}


function mainGame() {

  // INIT AND SETUP GAME
  const [scene, canvas] = initGame();
  setupGame({ scene, canvas });


  // GAME LOOP
  const gameLoop = () => {
    // rect.setSize({ width: canvas.size.x / 70, height: canvas.size.y / 2.5 });
    if (scene.gameOn) {

      for (let key in keysPressed) {
        if (keysPressed.hasOwnProperty(key)) {
          let element = keysPressed[key];
          if (element.keyUp) {
            element.funct();
          }
        }
      }


      scene.objects.forEach(object => {
        object.run()
      });

    }

    // ball update
    if (scene.objects != scene.settings.nBalls) {
      if (scene.objects.length < scene.settings.nBalls) {
        scene.addObjects(new Ball({ canvas }));
      }
      else if (scene.objects.length > scene.settings.nBalls) {
        scene.objects.pop();
      }
    }

    if (scene.settings.ballSpeed != scene.objects[0].baseSpeed)
      scene.objects.forEach(object => {
        object.baseSpeed = scene.settings.ballSpeed;
      }); 

    // player update
    if (scene.settings.paddleSize != scene.elements[0].paddleSize) {
      scene.elements.forEach(element => {
        element.paddleSize = scene.settings.paddleSize;
        element.resize(canvas);
      })
    }

    if (scene.settings.paddleSpeed != scene.elements[0].speed) {
      scene.elements.forEach(element => {
        element.speed = scene.settings.paddleSpeed;
      })
    };


    scene.run();
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
}





document.addEventListener('DOMContentLoaded', () => {
  mainGame();
  githubVersion();
  spashScreen();
});


