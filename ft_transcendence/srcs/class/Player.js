import { Rectangle } from './Scene'

class Player {
    constructor({ canvas }) {
        this.rect = new Rectangle(50, 50, 50, 50, '#3B3979');
        this.score = 0;
        this.heig
        this.rect.setSize({ width: canvas.size.x / 70, height: canvas.size.y / 1.5 });
        this.rect.setPosition({ x: canvas.size.x / 70, y: canvas.size.y / 2 - this.rect.height / 3 });
    }

    updateScore() {
        this.score += 1;
    }

    moveUp() {
        this.rect.move({ x: 0, y: -10 });
    }

    moveDown() {
        this.rect.move({ x: 0, y: 10 });
    }


    keySetup({ keyPressed, listofKeys }) {
        // Vérifier que listofKeys contient au moins deux éléments
        if (listofKeys.length >= 2) {
            keyPressed[listofKeys[0]] = { funct: this.moveUp.bind(this), keyUp: false };
            keyPressed[listofKeys[1]] = { funct: this.moveDown.bind(this), keyUp: false };
        } else {
            console.error("listofKeys does not have enough elements");
        }
    }

    get getRect() {
        return this.rect;
    }
}

export { Player }