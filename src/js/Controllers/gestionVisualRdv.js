import { Controllers } from "./Controllers.js";


export class GestionVisualRdv extends Controllers {
    
    static name = "GestionVisualRdv";

    static init() {
        super.init(this);
    }

    static startEventListeners() {

        document.querySelectorAll('visual-rdv-base').forEach(vrdv => {
            vrdv.addEventListener('click', (event) => {
                event.stopPropagation();
                console.log("Clicked on visual-rdv-base with id: " + vrdv.id);
                // Ajouter ici le code pour gérer le clic sur le rdv
            });
        });
    }
}