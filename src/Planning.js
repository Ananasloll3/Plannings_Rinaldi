export class Plannings {
    constructor(_popup_new_rd) {
        
        this.list_rdv = [];
        this.popup_new_rdv = _popup_new_rd;
    }


    update () {
        for (let rdv of this.list_rdv) {
            console.log(rdv);
            
            let nombreCellules = (rdv.idJjourFin - rdv.idJourDebut + 1) * (rdv.heureFin - rdv.heureDebut);

            for (let index = 0; index < nombreCellules; index++) {
                let cell = document.getElementById("line" + (rdv.heureDebut + Math.floor(index / (rdv.idJjourFin - rdv.idJourDebut + 1))) + "_cell_" + (rdv.idJourDebut + 1 + (index % (rdv.idJjourFin - rdv.idJourDebut + 1))));
                
                cell.classList.add("occupied");
                if (index === 0) {
                    cell.textContent = rdv.titre;
                }
            }
            
        }
    }

    /*
    addRdv (td) {
        
        if (this.firstCellSelected === null) {
            this.firstCellSelected = td;
            td.classList.add("pending");
        }

        else {
            this.firstCellSelected.classList.remove("pending");
            
            let startHour = Math.min(parseInt(this.firstCellSelected.parentElement.id.split("_")[1]), parseInt(td.parentElement.id.split("_")[1]));
            let endHour = Math.max(parseInt(this.firstCellSelected.parentElement.id.split("_")[1]), parseInt(td.parentElement.id.split("_")[1]));
            let startDay = Math.min(this.firstCellSelected.cellIndex - 1, td.cellIndex - 1);
            let endDay = Math.max(this.firstCellSelected.cellIndex - 1, td.cellIndex - 1);
            
            let titreRDV = prompt("Titre du RDV :", "RDV");
            this.list_rdv.push(new RDV(titreRDV, startDay, startHour, endDay, endHour));
            this.firstCellSelected = null;
            this.update();
        }
    }*/

    newRdv (cell) {
        this.popup_new_rdv.classList.remove("hidden");
        this.popup_new_rdv.classList.add('show');
    }
        
}


export class RDV {
    static lastRdvId = 0;

    constructor(titre = `RDV${RDV.lastRdvId}`, jourDebut, heureDebut, jourFin, heureFin) {
        this.id = RDV.lastRdvId;
        RDV.lastRdvId++;

        this.titre = titre;
        this.idJourDebut = jourDebut;
        this.idJjourFin = jourFin;

        this.heureDebut = heureDebut;
        this.heureFin = heureFin;
    }

}

