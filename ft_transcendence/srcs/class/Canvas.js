function vec2(x, y) {
    return { x: x, y: y };
}

class Canvas {
    constructor() {
        this._canvas = document.getElementById('pong');
        this._container = this._canvas.parentElement; 
        this._ctx = this._canvas.getContext('2d');
        this._size = vec2(this._container.clientWidth, this._container.clientHeight);

        this.resize();
    }
    
    resize() {

        this._size = vec2(this._container.clientWidth, this._container.clientHeight);
        if (this._size.x > 700) this._size.x = 700;
        if (this._size.y > 700) this._size.y = 700;
        if (this._size.x > this._size.y) {
            this._size.x = this._size.y;
        } else if (this._size.y > this._size.x) {
            this._size.y = this._size.x;
        }

        this._canvas.width = this._size.x;
        this._canvas.height = this._size.y;
    }

    run() {
        this.resize()    
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
