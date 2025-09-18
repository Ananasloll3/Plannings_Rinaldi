export class VisualRdvBase extends HTMLElement {

    constructor() {

        super();

        //let root = this.attachShadow({mode: 'open'});
        this.appendChild( this.initChildNode() ) ;
        console.log("ad");
        

        //root.appendChild(div);
        

        
    }


    initChildNode(){
        let _div = document.createElement('div');
        
        let spanHeureDebut = document.createElement('span');
        let spanHeureFin = document.createElement('span');
        let spanTitre = document.createElement('span');

        _div.appendChild(spanHeureDebut);
        _div.appendChild(spanTitre);
        _div.appendChild(spanHeureFin);

        return _div;
    }


}

window.customElements.define('visual-rdv-base', VisualRdvBase);
