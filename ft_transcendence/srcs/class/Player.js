import { Rectangle } from './Scene'

class Player {
    constructor({ canvas, x }) {
        this.rect = new Rectangle(50, 50, 50, 50, '#3B3979');
        this.score = 0;
        
        this.offset = x;
        this.rect.setSize({ width: canvas.size.x / 70, height: canvas.size.y / 3 });
        this.rect.setPosition({ x: canvas.size.x / 70 + this.offset, y: canvas.size.y / 2 - this.rect.height / 3 });
        this.sceneSize = canvas.size;

        this.marginRatio =  0.0315 ;

    }

    updateScore() {
        this.score += 1;
    }

    moveUp() {
        if (this.rect.y > this.sceneSize.y * 0.0315) this.rect.move({ x: 0, y: -10 });
    }

    moveDown() {
        if (this.rect.y + this.rect.height < this.sceneSize.y - this.sceneSize.y * 0.0315) this.rect.move({ x: 0, y: 10 });
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