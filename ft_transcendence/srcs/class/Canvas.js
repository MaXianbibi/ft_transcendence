import { Rectangle } from "./Scene";

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
    
        if (this._size.x > 900) this._size.x = 900;
    
        this._size.y = this._size.x / this.ratio;
    
       
        if (this._size.y > this._container.clientHeight) {
            this._size.y = this._container.clientHeight;
            this._size.x = this._size.y * this.ratio; 
        }
    
        this._canvas.width = this._size.x;
        this._canvas.height = this._size.y;
    }
    
    run({ elements, objects }) {
        this.resize()    

        
        elements.forEach(element => {
            element.sceneSize = this.size;

            if (element.offset != 0){
                element.offset = this.size.x - this.size.x / 70 * 3; // je sais franchement pas 3 mais ça marche // a non je sais jcrois
            }
            element.rect.setSize({ width: this.size.x / 70, height: this.size.y / 5 });
            element.rect.setPosition({ x: this.size.x / 70 + element.offset, y: this.size.y / 2 - element.rect.height / 5 });
        });

        objects.forEach(object => {
            object.circle.setSize({width : this.size.x * 0.012});
            object.circle.setPosition({ x: this.size.x / 2 - object.circle.radius / 2, y: this.size.y / 2 - object.circle.radius / 2 });
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
