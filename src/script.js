import { GestionPlannings } from "./js/Controllers/gestionPlannings.js";
import { VisualRdvBase } from "./js/Vues/VisualRdv_WC.js";

let table_planning = document.getElementById("planning");

let popup_rdv = document.getElementById("popup-rdv");

let cancelBtnModal = document.getElementById('popup-close-id');
let formModalRdv = document.getElementById('form-rdv');
 
let max_hours = 24;
let day_week = 7;





GestionPlannings.init(popup_rdv);



document.addEventListener('load', async () => {
    window.customElements.define('visual-rdv-base', VisualRdvBase);
});



document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.uuid_user) {
        alert("Hello, " + localStorage.uuid_user)
    }
    /*else {
        window.location.href = "./js/Vues/login_signup/Login.html";
        return;
    }*/

    GestionPlannings.createVisualPlannings(table_planning, max_hours, day_week);
});





cancelBtnModal.addEventListener("click", () => {
    popup_rdv.classList.remove('show');
    popup_rdv.classList.add("hidden");
});



formModalRdv.addEventListener("submit", (event) => {

    event.preventDefault();    
    GestionPlannings.newRdvFromForm();
});



window.addEventListener('resize', () => {
    console.log("Rezize event detected");
    
    GestionPlannings.askUpdateWithAndHeightt();
});