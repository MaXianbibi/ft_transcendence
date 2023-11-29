import { settings } from "../tools/settingForm.js"



function calculateBallAngle(ball, paddle) {
    // Distance entre le centre de la balle et le centre de la raquette
    let relativeY = (ball.circle.y - (paddle.rect.y + paddle.rect.height / 2));

    // Normaliser cette distance en fonction de la hauteur de la raquette
    let normalizedRelativeY = relativeY / (paddle.rect.height / 2);

    // Calculer l'angle de base
    let baseAngle = normalizedRelativeY * (Math.PI / 4);

    // Ajuster l'angle en fonction de la direction actuelle de la balle
    let adjustedAngle;
    if (ball.velocity.x > 0) {
        // La balle se déplace vers la droite
        adjustedAngle = Math.PI - baseAngle;
    } else {
        // La balle se déplace vers la gauche
        adjustedAngle = baseAngle;
    }

    return adjustedAngle;
}


class Scene {
    constructor({ canvas, ctx }) {

        this.canvas = canvas;
        this.ctx = ctx;
        this.elements = []; // player
        this.objects = []; // other
        this.backgroundColor = "white";

        this.gameOn = false;


        this.nplayer = 2;

        this.settings = settings;

        this.firstRun = false;

    }

    setBackground(color) {
        this.canvas.style.background = color;
    }

    addElement(element) {
        this.elements.push(element);
    }

    addObjects(object) {
        this.objects.push(object);
    }

    draw() {

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let element of this.elements) {
            if (typeof element.rect.draw === 'function') {
                element.rect.draw(this.ctx);
            }
        }
        for (let object of this.objects) {
            if (typeof object.circle.draw === 'function') {
                object.circle.draw(this.ctx);
            }
        }
        
        if (this.settings.nPlayers == 2) {
            if (this.elements.length == 0) return; 


            this.ctx.font = '20px Arial'; // Définit la taille et la police du texte
            this.ctx.fillStyle = 'black'; // Définit la couleur du texte
            

            
            this.ctx.fillText(this.elements[0].score, this.canvas.width / 8, this.canvas.height / 8); // Écrit le texte sur le canvas
            this.ctx.fillText(this.elements[1].score, this.canvas.width / 1.1, this.canvas.height / 8); // Écrit le texte sur le canvas
        }

    }

    gameLogic2Player() {
        if (this.nplayer == 2) {


            if (this.objects.length == 0) return;
            this.objects.forEach(object => {








                const ball = object;

                // debug


                const player = this.elements[0];
                const player2 = this.elements[1];

                if (ball.speed > 30) ball.speed = 30;

                if (ball.circle.x + ball.circle.radius > this.canvas.width) {
                    player.updateScore();
                    ball.reset();
                }
                else if (ball.circle.x < 0) {
                    player2.updateScore();
                    ball.reset();
                }

                if (ball.circle.y + ball.circle.radius > this.canvas.height) {
                    ball.velocity.y = ball.velocity.y * -1;
                }
                else if (ball.circle.y < 0) {
                    ball.velocity.y = ball.velocity.y * -1;
                }
                if (ball.circle.x - ball.circle.radius < player.rect.x + player.rect.width && ball.circle.y + ball.circle.radius > player.rect.y && ball.circle.y - ball.circle.radius < player.rect.y + player.rect.height) {
                    let angle = calculateBallAngle(ball, player);

                    ball.velocity.x = Math.cos(angle);
                    ball.velocity.y = Math.sin(angle);

                    ball.speed = ball.speed + 0.5;
                }
                else if (ball.circle.x + ball.circle.radius > player2.rect.x && ball.circle.y + ball.circle.radius > player2.rect.y && ball.circle.y - ball.circle.radius < player2.rect.y + player2.rect.height) {
                    let angle = calculateBallAngle(ball, player2);


                    ball.velocity.x = Math.cos(angle);
                    ball.velocity.y = Math.sin(angle);

                    ball.speed = ball.speed + 0.5;
                }
            });
        }
    }

    run() {
        this.gameLogic2Player();
        this.draw();

        



    }
}

// Classe pour représenter des éléments dessinables
class DrawableElement {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move({ x, y }) {
        this.x += x;
        this.y += y;
    }

    draw(ctx) {
        // La logique de dessin spécifique est définie dans les sous-classes
    }
}

// Sous-classe pour dessiner un rectangle, par exemple
class Rectangle extends DrawableElement {
    constructor(x, y, width, height, color) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    setSize({ width, height }) {
        this.width = width;
        this.height = height;
    }

    setPosition({ x, y }) {
        this.x = x;
        this.y = y;
    }
}
class Circle extends DrawableElement {
    constructor(x, y, width, color) {
        super(x, y);
        this.radius = width
        this.color = color;
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // Crée un arc/cercle

        ctx.fillStyle = this.color; // Couleur de remplissage
        ctx.fill(); // Remplit le cercle

    }

    setSize({ width }) {
        this.radius = width;
    }

    setPosition({ x, y }) {
        this.x = x;
        this.y = y;
    }
}

// Exemple d'utilisation
export { Scene, Rectangle, Circle };
