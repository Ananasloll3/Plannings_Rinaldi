
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
    const rect = cell.getBoundingClientRect();

    const cellHeight = rect.height;

    const minuteOffset = calculateMinuteOffset(rdv.minuteDebut, cellHeight);

    // Calcule la hauteur précise du RDV basée sur la durée exacte
    const preciseHeight = calculatePreciseHeight(
        rdv.heureDebut, 
        rdv.minuteDebut, 
        rdv.heureFin, 
        rdv.minuteFin, 
        cellHeight
    ); 

    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const absoluteLeft = rect.left + scrollLeft;
    const absoluteTop = rect.top + scrollTop;

    // Placer le composant en position absolue dans le body
    visualRdv.style.left = `${absoluteLeft}px`;
    // Ajoute l'offset des minutes + ton offset de -101
    visualRdv.style.top = `${absoluteTop + minuteOffset - 101}px`;

    // Taille du composant
    visualRdv.style.width = `${rect.width}px`;
    visualRdv.style.height = `${preciseHeight}px`;

    let table_planning = document.getElementById("planning");
    if (!visualRdv.parentNode) {
        table_planning.appendChild(visualRdv);
    }
}
