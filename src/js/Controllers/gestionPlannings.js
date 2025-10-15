import { Plannings } from "./Planning.js";
import { Controllers } from "./Controllers.js";
import { RDV } from "../Models/RDV.js";

export class GestionPlannings extends Controllers {
    static planning = new Plannings();
    static nextIdVisualRdv = 0;
    static name = "GestionPlannings";

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

    static init(_popup_new_rd) {
        super.init(this);

        this.setPlanning(_popup_new_rd);
    }


    static newRdvFromForm () {
        let nom_rdv = document.getElementById('nom_rdv');
        let heureDebut_rdv = document.getElementById('heureDebut_rdv');
        let heureFin_rdv = document.getElementById('heureFin_rdv');

        let titre = nom_rdv.value;
        let actuelDay = parseInt(this.planning.actualRdvCell.id.split("cell_")[1]); // Correction ici
        
        let date = new Date(this.planning.firstDateOfWeek);
        date.setDate(date.getDate() + actuelDay - 1);

        // Extraire les heures et minutes correctement
        let minuteDebut = parseInt(heureDebut_rdv.value) || 0;        
        let [heureFin, minuteFin] = heureFin_rdv.value.split(":").map(v => parseInt(v) || 0);
        
        console.log(this.planning.actualRdvCell);
        
        let heureDebut = parseInt(this.planning.actualRdvCell.parentNode.id.split("line_")[1]); // Correction ici

        let weekRange = document.getElementById('date-range').textContent;

        let rdv = new RDV(
            titre, 
            date.getDay(), 
            heureDebut, 
            minuteDebut, 
            date.getDay(), 
            heureFin, 
            minuteFin, 
            weekRange, 
            this.planning.actualRdvCell // Passer directement la cellule ici
        );        
        
        console.log(this.planning.actualRdvCell);
        
        let visual = this.planning.createVisualRdv(rdv, this.nextIdVisualRdv, this.planning.actualRdvCell);

        rdv.visualRdv = visual;
        this.planning.addRdv(rdv);

        this.planning.actualRdvCell = null;
        this.planning.popup_new_rdv.classList.remove('show');
        this.planning.popup_new_rdv.classList.add("hidden");

        this.nextIdVisualRdv++;
        this.doUpdate();

        nom_rdv.value = "";
        heureDebut_rdv.value = "";
        heureFin_rdv.value = "";
    }

    

    static createVisualPlannings (table_planning, max_hours = 24, day_week = 7) {
        for (let index = 0; index < max_hours; index++) {
            let tr = document.createElement("tr");
            tr.id = "line_" + index;
            tr.className = "tr_line";
        
            for (let colonne = 0; colonne < day_week + 1; colonne++) { // +1 pour la colonne heure
                let td = document.createElement("td");
                td.id = "line" + index + "_cell_" + colonne;
        
                // Première colonne = heure
                if (colonne === 0) {
                    td.textContent = String(index).padStart(2, '0') + ":00";
                    td.style.cursor = "default";
                } else {
                    td.style.position = "relative";
                    // Cellules cliquables pour les jours
                    td.addEventListener('click', function() {   
                        let heure = parseInt(this.id.split("_cell_")[0].split("line")[1]);  

                        document.getElementById("heureDebutPopUp").textContent = "Heure de debut : " + String(heure).padStart(2, '0') + ":00";     
                        document.getElementById("heureFinPopUp").textContent = "Heure de fin : (à partir de " + String(heure).padStart(2, '0') + ":00)";   

                        GestionPlannings.showModalRdv(this);
                    });
                }
                    
                tr.appendChild(td);
            }
            table_planning.children[1].appendChild(tr);
        
        }
    }





    static clear_planning = document.getElementById("clear_planning").addEventListener("click", async () => {
        console.log("Clear planning" );
        
    });


    static save_planning = document.getElementById("save_planning").addEventListener("click", async () => {
        console.log("Save planning" );
    });


    static clearPlanning () {
        this.planning.clear();
    }

    static savePlanning () {
        this.planning.save();
    }

    static askUpdateWithAndHeightt () {
        this.planning.updateWithAndHeightt();
    }
}