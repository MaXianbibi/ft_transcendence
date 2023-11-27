import { Circle } from './Scene.js';


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


class Ball {
    constructor({canvas}) {

        console.log(canvas.size.x * 0.012);

        this.circle = new Circle(canvas.size.x / 2 - 10 / 2, canvas.size.y / 2 - 10 / 2, canvas.size.x * 0.012, '#3B3979');
        this.velocity = { x: 1, y: 0 };

        if (getRandomInt(0, 2) == 0) this.velocity.x = -1;


        this.speed = 1;
    }


    move() {
        this.circle.setPosition({ x: this.circle.x + this.velocity.x * this.speed, y: this.circle.y + this.velocity.y * this.speed });
    }

    run () {
        // if ()

        this.move();
    }
}

export { Ball }

