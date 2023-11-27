class Scene {
    constructor({ canvas, ctx }) {

        this.canvas = canvas;
        this.ctx = ctx;
        this.elements = []; // player
        this.objects = []; // other
        this.backgroundColor = "white";

        this.gameOn = false;

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
            if (typeof object.draw === 'function') {
                object.draw(this.ctx);
            }
        }

    }

    run() {
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
class Circle extends DrawableElement
{
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

    setSize({ width}) {
        this.radius = width;
    }

    setPosition({ x, y }) {
        this.x = x;
        this.y = y;
    }
}

// Exemple d'utilisation
export { Scene, Rectangle, Circle };
