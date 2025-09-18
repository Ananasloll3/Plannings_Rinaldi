import { GestionPlannings } from "./js/Controllers/gestionPlannings.js";
import { RDV } from "./js/Models/RDV.js";

let table_planning = document.getElementById("planning");
let clear_planning = document.getElementById("clear_planning");
let save_planning = document.getElementById("save_planning");

let popup_rdv = document.getElementById("popup-rdv");

let cancelBtnModal = document.getElementById('popup-close-id');
let formModalRdv = document.getElementById('form-rdv');
 
let max_hours = 24;
let day_week = 7;


GestionPlannings.setPlanning(popup_rdv);

document.addEventListener("DOMContentLoaded", () => {

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
                td.addEventListener('click', () => {                    
                    GestionPlannings.showModalRdv(this);
                });
            }
            
            tr.appendChild(td);
        }
        table_planning.children[1].appendChild(tr);

    }
});


clear_planning.addEventListener("click", async () => {
})


save_planning.addEventListener("click", async () => {
})


cancelBtnModal.addEventListener("click", () => {
    popup_rdv.classList.remove('show');
    popup_rdv.classList.add("hidden");
});


formModalRdv.addEventListener("submit", (event) => {

    event.preventDefault();
    GestionPlannings.newRdvFromForm();
});