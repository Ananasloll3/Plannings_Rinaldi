// Génération de la navigation entre semaines
const dateRangeEl = document.getElementById("date-range");
const dayHeaders = Array.from(document.querySelectorAll("#planning thead th[id^='day-']"));

let currentDate = new Date();

// Trouver le lundi de la semaine actuelle
function getMonday(d) {
    d = new Date(d);
    let day = d.getDay();
    let diff = d.getDate() - day + (day === 0 ? -6 : 1); // si dimanche -> recule à lundi précédent
    return new Date(d.setDate(diff));
}

function updatePlanning(weekStart) {
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    let current = new Date(weekStart);

    // Remplir les en-têtes du tableau
    dayHeaders.forEach((th, i) => {
        const day = new Date(current);
        day.setDate(weekStart.getDate() + i);

        const options = { day: "numeric", month: "short" };
        th.textContent = `${daysOfWeek[i]} ${day.toLocaleDateString("fr-FR", options)}`;
    });

    // Afficher la plage de dates
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const optionsRange = { day: "numeric", month: "long", year: "numeric" };
    dateRangeEl.textContent = `${weekStart.toLocaleDateString("fr-FR", optionsRange)} - ${weekEnd.toLocaleDateString("fr-FR", optionsRange)}`;
}

// Initialisation
let weekStart = getMonday(currentDate);
updatePlanning(weekStart);

// Navigation entre semaines
document.getElementById("prevWeek").addEventListener("click", () => {
    weekStart.setDate(weekStart.getDate() - 7);
    updatePlanning(weekStart);
});

document.getElementById("nextWeek").addEventListener("click", () => {
    weekStart.setDate(weekStart.getDate() + 7);
    updatePlanning(weekStart);
});
