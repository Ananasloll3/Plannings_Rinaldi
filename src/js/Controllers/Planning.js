import { VisualRdvBase } from "../Vues/VisualRdvBase.js";

export class Plannings {
    static instance;

    constructor(_popup_new_rd) {
        
        this.list_rdv = [];
        this.popup_new_rdv = _popup_new_rd;

        this.actualRdvCell = null;

        this.firstDateOfWeek = null;

        if (Plannings.instance) return;
        
        Plannings.instance = this;
    }


    update () {
        let nextId = 0;
        for (let rdv of this.list_rdv) {
            console.log(rdv);
            
            for (let index = 0; index < rdv.nombreCellules; index++) {                
                
                let cell = document.getElementById("line" + (index + rdv.heureDebut) + "_cell_" + (rdv.idJourDebut));
                
                
                cell.classList.add("occupied");
                if (index === 0) {
                    cell.textContent = rdv.titre;
                    rdv.startCell = cell;
                }

            }

            console.log(rdv.startCell);            
            this.createVisualRdv(rdv, nextId);
            nextId++;

            
            
        }
 
    }

    createVisualRdv (rdv, nextId) {
        let planningTable = document.getElementById("planning");

        let visualRdv = new VisualRdvBase(nextId);
        visualRdv.spanHeureDebut.textContent = String(rdv.heureDebut).padStart(2, '0') + ":00";
        visualRdv.spanHeureFin.textContent = String(rdv.heureFin).padStart(2, '0') + ":00";
        visualRdv.spanTitre.textContent = rdv.titre;

        let top = rdv.startCell.style.top;
        let left = rdv.startCell.style.left;

        visualRdv.div.style.position = "absolute";
        visualRdv.div.style.zIndex = "9999";
        visualRdv.div.style.top = top;
        visualRdv.div.style.left = left;
        visualRdv.div.style.height = (rdv.nombreCellules * rdv.startCell.style.height ) + "px";

        planningTable.appendChild(visualRdv.div);
    }

    cellIsFree (td) {
        return !td.classList.contains("occupied");
    }

    cellIsInTab (td) {
        this.list_rdv.forEach(element => {
            if (element.startCell === td) {
                return true;
            }
        });
        return false;
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

    showModalRdv (cell) {        
        if (cell.cellIndex === 0 || !this.cellIsFree(cell) || this.cellIsInTab(cell)) {
            alert("Cellule non valide (deja utiliser) !");
            return;
        }

        this.actualRdvCell = cell;
        this.popup_new_rdv.classList.remove("hidden");
        this.popup_new_rdv.classList.add('show');
    }

    addRdv (rdv) {
        this.list_rdv.push(rdv);
    }
        
}


