export class VisualRdvBase {

    constructor(id) {
        this.div = document.createElement('div');
        
        this.spanHeureDebut = document.createElement('span');
        this.spanHeureFin = document.createElement('span');
        this.spanTitre = document.createElement('span');

        this.div.appendChild(this.spanHeureDebut);
        this.div.appendChild(this.spanTitre);
        this.div.appendChild(this.spanHeureFin);


        this.div.classList.add('visual-rdv-base-' + id);
        this.div.id = 'visual-rdv-base-' + id;

        


    }


}