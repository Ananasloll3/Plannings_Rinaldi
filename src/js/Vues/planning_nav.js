import { GestionPlannings } from "../Controllers/gestionPlannings.js";
import { Plannings } from "../Controllers/Planning.js";

setTimeout(() => {}, 500);


const dateRangeEl = document.getElementById("date-range");
const dayHeaders = Array.from(document.querySelectorAll("#planning thead th[id^='day-']"));

const prevBtn = document.getElementById("prevWeek");
const nextBtn = document.getElementById("nextWeek");

let today = new Date();
let currentMonday = getMonday(today); // lundi de la semaine actuelle
let shownMonday = new Date(currentMonday); // lundi affiché

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay();
    let diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

function updatePlanning(weekStart) {
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    let current = new Date(weekStart);

    // Colonnes avec dates
    dayHeaders.forEach((th, i) => {
        const day = new Date(current);
        day.setDate(weekStart.getDate() + i);

        const options = { day: "numeric", month: "short" };

        th.textContent = `${daysOfWeek[i]} ${day.toLocaleDateString("fr-FR", options)}`;        
    });

    // Période affichée
    const weekEnd = new Date(weekStart);
    GestionPlannings.planning.firstDateOfWeek = weekStart;
    
    weekEnd.setDate(weekStart.getDate() + 6);

    const optionsRange = { day: "numeric", month: "long", year: "numeric" };
    dateRangeEl.textContent = `${weekStart.toLocaleDateString("fr-FR", optionsRange)} - ${weekEnd.toLocaleDateString("fr-FR", optionsRange)}`;
    GestionPlannings.planning.update();

    // Désactiver le bouton "←" si on est déjà à la semaine actuelle
    prevBtn.disabled = weekStart <= currentMonday;
}

// Init
updatePlanning(shownMonday);

// Navigation
prevBtn.addEventListener("click", () => {
    let newMonday = new Date(shownMonday);
    newMonday.setDate(newMonday.getDate() - 7);

    if (newMonday >= currentMonday) {
        shownMonday = newMonday;
        updatePlanning(shownMonday);
    }
});

nextBtn.addEventListener("click", () => {
    shownMonday.setDate(shownMonday.getDate() + 7);
    updatePlanning(shownMonday);
});
