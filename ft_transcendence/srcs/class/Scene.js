class Scene {
    constructor({ canvas, ctx }) {

        this.canvas = canvas;
        this.ctx = ctx;
        this.elements = [];

        this.margin = 5;

        this.sceneSize = { topLeft : {x : this.margin, y: this.margin},
                            bottomLeft : {x : this.margin, y: this.canvas.height - this.margin},
                            topRight : {x : this.canvas.width - this.margin, y: this.margin},
                            bottomRight : {x : this.canvas.width - this.margin, y: this.canvas.height - this.margin}
                        };

        this.backgroundColor = "white";
    }

    setBackground(color) {
        this.canvas.style.background = color;
    }

    addElement(element) {
        this.elements.push(element);
    }

    draw() {

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let element of this.elements) {
            if (typeof element.rect.draw === 'function') {
                element.rect.draw(this.ctx);
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

// Exemple d'utilisation
export { Scene, Rectangle, DrawableElement };
