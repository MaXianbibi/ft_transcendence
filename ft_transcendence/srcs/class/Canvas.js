import { Rectangle, DrawableElement } from "./Scene";

function vec2(x, y) {
    return { x: x, y: y };
}

class Canvas {
    constructor() {
        this._canvas = document.getElementById('pong');
        this._container = this._canvas.parentElement; 
        this._ctx = this._canvas.getContext('2d');
        this._size = vec2(this._container.clientWidth, this._container.clientHeight);

        this.ratio = 4 / 3;
        

    }
    
    resize() {
        this._size = vec2(this._container.clientWidth, this._container.clientHeight);
    
        // Limite de la largeur
        if (this._size.x > 900) this._size.x = 900;
    
        // Calcul initial de la hauteur en fonction de la largeur et du ratio
        this._size.y = this._size.x / this.ratio;
    
        // Si la hauteur calculée est supérieure à la hauteur disponible, ajustez la largeur
        if (this._size.y > this._container.clientHeight) {
            this._size.y = this._container.clientHeight;
            this._size.x = this._size.y * this.ratio; // Maintenir le ratio en ajustant la largeur
        }
    
        this._canvas.width = this._size.x;
        this._canvas.height = this._size.y;
    }
    
    run({ elements }) {
        this.resize()    

        
        elements.forEach(element => {
            element.setPosition({ x: this.size.x / 70, y: this.size.y / 2 - element.height / 2});
        });

    }

    get canvas() {
        return this._canvas;
    }

    get ctx() {
        return this._ctx;
    }

    get size() {
        return this._size;
    }
}

export { Canvas };
