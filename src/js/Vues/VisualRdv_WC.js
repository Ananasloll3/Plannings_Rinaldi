export class VisualRdvBase extends HTMLElement {

    constructor() {

        super();

        this.root = this.attachShadow({mode: 'open'});

        
        this.container;
        this.spanHeureDebut;
        this.spanHeureFin;
        this.spanTitre;
    
    }

    set x(value) {
        console.log("Value (x) : " + value);

        if (isNaN(value)) throw new Error("x doit être un nombre");
        if (value < 0) throw new Error("x doit être positif");
        if (value > window.screen.width) throw new Error("x doit être inférieur à " + window.screen.width);

        this._x = value;
        this.style.left = `${value}px`;   // X contrôle la position horizontale
    }
    
    get x() {
        return this._x;
    }
    
    set y(value) {
        console.log("Value (y) : " + value);
        if (isNaN(value)) throw new Error("y doit être un nombre");
        if (value < 0) throw new Error("y doit être positif");
        if (value > window.screen.height) throw new Error("y doit être inférieur à " + window.screen.height);

        this._y = value;
        this.style.top = `${value}px`;   // Y contrôle la position verticale
    }
    
    get y() {
        return this._y;
    }
    

    set height(value) {
        if (isNaN(value)) throw new Error("height doit être un nombre");
        if (value < 0) throw new Error("height doit être positif");

        this.style.height = value + "px";
        this.style.width = this._width + "px";
        this._height = value;
    }

    get height() {
        return this._height;
    }

    set width(value) {
        if (isNaN(value)) throw new Error("width doit être un nombre");
        if (value < 0) throw new Error("width doit être positif");

        this.style.width = value + "px";
        this.style.height = this._height + "px";
        this._width = value;
    }

    get width() {
        return this._width;
    }

}