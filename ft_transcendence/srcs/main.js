import './style.css'
import { Canvas } from "./class/Canvas.js";
import { Scene, Rectangle } from "./class/Scene.js";
import { githubVersion } from "./tools/githubAPI.js";
import { Player } from "./class/Player.js";

let keysPressed = {};




function setupGame({ scene, canvas, rect }) {

  canvas.resize();
  scene.setBackground('white');
  scene.run();

  // INIT PLAYER 

  const player = new Player({ canvas, x: 0 });
  
  const player2 = new Player({ canvas, x: canvas.size.x - canvas.size.x / 70 - canvas.size.x / 70 - 10});

  let keys = ['ArrowUp', 'ArrowDown'];
  player.keySetup({ keyPressed: keysPressed, listofKeys: keys });;


  scene.addElement(player);
  scene.addElement(player2);


  // EVENT LISTENERS

  window.addEventListener('resize', () => { canvas.run({ elements: scene.elements }) });

  window.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (keysPressed[event.key] === undefined) return;
    keysPressed[event.key].keyUp = true;
  });

  window.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (keysPressed[event.key] === undefined) return;
    keysPressed[event.key].keyUp = false;

  });

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


    for (let key in keysPressed) {
      if (keysPressed.hasOwnProperty(key)) {
        let element = keysPressed[key];
        if (element.keyUp) {
          element.funct();
        }
      }
    }
    scene.run();
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);




}

document.addEventListener('DOMContentLoaded', () => {
  mainGame();
  githubVersion();

  let loaded = false;
  let minimumTimeMet = false;

  setTimeout(() => {
    minimumTimeMet = true;
    if (loaded) fadeOutLoadingScreen();
  }, 1000);

  window.onload = function () {
    loaded = true;
    if (minimumTimeMet) fadeOutLoadingScreen();
  };
});

function fadeOutLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.style.opacity = '0';

  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 250);
}


