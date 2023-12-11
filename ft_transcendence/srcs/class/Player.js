import { Rectangle } from './Scene'

class Player {
    constructor({ canvas, x }) {
        this.rect = new Rectangle(50, 50, 50, 50, '#3B3979');
        this.score = 0;
        
        this.offset = x;

        this.paddleSize = 5

        this.rect.setSize({ width: canvas.size.x / 70, height: canvas.size.y / this.paddleSize });
        this.rect.setPosition({ x: canvas.size.x / 70 + this.offset, y: canvas.size.y / 2 - this.rect.height / this.paddleSize });
        this.sceneSize = canvas.size;


        this.speed = 10;
        this.marginRatio =  0.02 ;

    }

    updateScore() {
        this.score += 1;
    }

    moveUp() {
        if (this.rect.y > this.sceneSize.y * this.marginRatio) this.rect.move({ x: 0, y: -this.speed });
    }

    moveDown() {
        if (this.rect.y + this.rect.height < this.sceneSize.y - this.sceneSize.y * this.marginRatio) this.rect.move({ x: 0, y: this.speed });
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

    resize( canva ) {
        this.rect.setSize({ width: canva.size.x / 70, height: canva.size.y / this.paddleSize });
        this.rect.setPosition({ x: canva.size.x / 70 + this.offset, y: canva.size.y / 2 - this.rect.height / this.paddleSize });

    }


    get getRect() {
        return this.rect;
    }
}

export { Player }