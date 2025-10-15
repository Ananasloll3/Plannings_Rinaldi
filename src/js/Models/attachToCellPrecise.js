
function calculatePreciseHeight(heureDebut, minuteDebut, heureFin, minuteFin, cellHeight) {
    const startTotalMinutes = heureDebut * 60 + minuteDebut;
    const endTotalMinutes = heureFin * 60 + minuteFin;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    const durationHours = durationMinutes / 60;
    return cellHeight * durationHours;
}


function calculateMinuteOffset(minuteDebut, cellHeight) {
    return (minuteDebut / 60) * cellHeight;
}


export function attachToCell(visualRdv, cell, rdv) {
    const table_planning = document.getElementById("planning");
    const container = document.getElementById("div_planning");

    if (!table_planning || !container) {
        console.warn("❌ planning introuvable");
        return;
    }

    // 📏 Coordonnées relatives au conteneur, pas à la fenêtre
    const rect = cell.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const cellHeight = rect.height;
    const minuteOffset = (rdv.minuteDebut / 60) * cellHeight;
    const preciseHeight = ((rdv.heureFin * 60 + rdv.minuteFin) - (rdv.heureDebut * 60 + rdv.minuteDebut)) / 60 * cellHeight;

    const relativeLeft = rect.left - containerRect.left;
    const relativeTop = rect.top - containerRect.top + minuteOffset;

    // ✅ Application exacte
    visualRdv.style.left = `${relativeLeft}px`;
    visualRdv.style.top = `${relativeTop}px`;
    visualRdv.style.width = `${rect.width}px`;
    visualRdv.style.height = `${preciseHeight}px`;

    // ✅ Ajout dans le bon conteneur
    if (!visualRdv.parentNode) {
        container.appendChild(visualRdv);
    }
}



