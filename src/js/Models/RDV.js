import { RdvState } from "../Controllers/Rdv_State.js";

export class RDV {
    static lastRdvId = 0;

    constructor(titre = `RDV${RDV.lastRdvId}`, jourDebut, heureDebut, jourFin, heureFin, startCell = null) {
        this.id = RDV.lastRdvId;
        RDV.lastRdvId++;

        this.titre = titre;
        this.idJourDebut = jourDebut;
        this.idJjourFin = jourFin;

        this.heureDebut = heureDebut;
        this.heureFin = heureFin;

        this.startCell = startCell;        
        this.nombreCellules = 0;

        this.state = RdvState.occuped;

        this.UpdateNombreCellules();
        console.log(this.nombreCellules);
        
    }

    UpdateNombreCellules () {
        this.nombreCellules = this.nombreCellules = Math.max(this.heureDebut, this.heureFin) - Math.min(this.heureDebut, this.heureFin) + 1;;
    }

}