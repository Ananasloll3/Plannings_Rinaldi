import { Plannings } from "./Planning.js";
import { Controllers } from "./Controllers.js";
import { RDV } from "../Models/RDV.js";

export class GestionPlannings extends Controllers {
    static planning = new Plannings();
    static nextIdVisualRdv = 0;

    static get planning() {
        return this._planning;
    }


    static createRdv (titre, jourDebut, heureDebut, jourFin, heureFin, startCell) {
        let newRdv = new RDV(titre, jourDebut, heureDebut, jourFin, heureFin, startCell);
        this.planning.addRdv(newRdv);
        this.planning.update();
    }


    static showModalRdv (td) {        
        this.planning.showModalRdv(td);
    }


    static doUpdate () {
        this.planning.update();
    }

    static setPlanning(_popup_new_rd) {
        this.planning = new Plannings(_popup_new_rd);
    }


    static newRdvFromForm () {
        
        let nom_rdv = document.getElementById('nom_rdv');
        let heureDebut_rdv = document.getElementById('heureDebut_rdv');
        let heureFin_rdv = document.getElementById('heureFin_rdv');

        let titre = nom_rdv.value;
        let actuelDay = parseInt(this.planning.actualRdvCell.id.split("_")[2]);
        let date = new Date(this.planning.firstDateOfWeek);
        date.setDate(date.getDate() + actuelDay - 1);
        let heureDebut = parseInt(heureDebut_rdv.value);
        let heureFin = parseInt(heureFin_rdv.value);

        let weekRange = document.getElementById('date-range').textContent;


        let cell = document.getElementById("line" + (heureDebut) + "_cell_" + (actuelDay));
        
        let rdv = new RDV(titre, date.getDay(), heureDebut, date.getDay(), heureFin, weekRange, this.planning.actualRdvCell);

        rdv.startCell = cell;
        let visual = this.planning.createVisualRdv(rdv, this.nextIdVisualRdv);

        rdv.visualRdv = visual;
        this.planning.addRdv(rdv);


        this.planning.actualRdvCell = null;
        this.planning.popup_new_rdv.classList.remove('show');
        this.planning.popup_new_rdv.classList.add("hidden");


        this.nextIdVisualRd++;
        this.doUpdate();
    }
    
}