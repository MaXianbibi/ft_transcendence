import './style.css'
import { Canvas } from "./class/Canvas.js";
import { Scene, Rectangle } from "./class/Scene.js";
import { githubVersion } from "./tools/githubAPI.js";

function mainGame() {

  // Setup
  const canvas = new Canvas();
  const scene = new Scene({ canvas: canvas.canvas, ctx: canvas.ctx });
  
  const rect = new Rectangle(50, 50, 50, 50, '#3B3979');
  window.addEventListener('resize', () => { canvas.run()});  

  scene.addElement(rect); 
  scene.setBackground('white');
  scene.run();

  // Game loop
  const gameLoop = () => {
    rect.setSize({ width: canvas.size.x / 70, height: canvas.size.y / 2.5});
    rect.setPosition({ x: canvas.size.x / 70, y: canvas.size.y / 2 - rect.y / 2});
    scene.run();
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  requestAnimationFrame(gameLoop);
}


// Main
document.addEventListener('DOMContentLoaded', () => { 
  mainGame()
  githubVersion();
});





