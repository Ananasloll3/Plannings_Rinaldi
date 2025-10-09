import { RdvState } from "../Controllers/Rdv_State.js";

export class RDV {
    static lastRdvId = 0;

    constructor(titre = `RDV${RDV.lastRdvId}`, jourDebut, heureDebut, minuteDebut, jourFin, heureFin, minuteFin, weekRange, startCell = null) {
        this.id = RDV.lastRdvId;
        RDV.lastRdvId++;

        this.titre = titre;
        this.idJourDebut = jourDebut;
        this.idJjourFin = jourFin;
        this.heureDebut = heureDebut;
        this.minuteDebut = minuteDebut;
        this.heureFin = heureFin;
        this.minuteFin = minuteFin;
        this.weekRange = weekRange;

        this.startCell = startCell;        
        this.nombreCellules = weekRange;

        this.state = RdvState.occuped;
        this.visualRdv = null;

        this.UpdateNombreCellules();
        console.log(this.nombreCellules);
        
    }

    UpdateNombreCellules () {
        this.nombreCellules = this.nombreCellules = Math.max(this.heureDebut, this.heureFin) - Math.min(this.heureDebut, this.heureFin) + 1;;
    }

}