import { attachToCell } from "../Models/attachToCellPrecise.js";


export class Plannings {
    static instance;

    constructor(_popup_new_rd) {
        
        this.list_rdv = [];
        this.popup_new_rdv = _popup_new_rd;

        this.actualRdvCell = null;

        this.firstDateOfWeek = null;
        this.nombreUpdate = 0;

        if (Plannings.instance) return;
        
        Plannings.instance = this;
    }


    update () {
        //let planning_table = document.getElementById("plannings");
        console.log("[UPDATE " + this.nombreUpdate + "]");
        this.nombreUpdate++;
        
        for (let rdv of this.list_rdv) {
            console.log(rdv);
                        
            if (rdv.weekRange === document.getElementById('date-range').textContent) {
                rdv.visualRdv.classList.remove("RdvHidden");
                rdv.visualRdv.classList.add("RdvVisible");
                
            }
            else {
                rdv.visualRdv.classList.remove("RdvVisible");
                rdv.visualRdv.classList.add("RdvHidden");
            }
            
        }
 
    }

    updateWithAndHeightt () {

        for (let rdv of this.list_rdv) {
            attachToCell(rdv.visualRdv, rdv.startCell, rdv);
        }
    }

    createVisualRdv (rdv, nextId, cell) {

        let visualRdv = document.createElement('visual-rdv-base');
        
        visualRdv.id = 'visual-rdv-base-' + nextId;
        
        //let visualRdv = new VisualRdvBase(nextId);

        this.addChildNode(visualRdv);

        visualRdv.children[0].children[0].textContent = String(rdv.heureDebut).padStart(2, '0') + ":" + rdv.minuteDebut.toString();
        visualRdv.children[0].children[1].textContent = String(rdv.heureFin).padStart(2, '0') + ":" + rdv.minuteFin.toString();
        visualRdv.children[0].children[2].textContent = rdv.titre;  
        
            // Génération de couleur unique pour chaque rendez-vous
        const hue = (nextId * 137) % 360; // 137° = angle d'or pour couleurs distinctes
        const color = `hsl(${hue}, 70%, 55%)`;
        visualRdv.style.setProperty('--rdv-color', color);
    
        attachToCell(visualRdv, cell, rdv);

        return visualRdv;
    }


    addChildNode(visualRdv){
        visualRdv.container =  document.createElement('div');
        visualRdv.spanHeureDebut = document.createElement('span');
        visualRdv.spanHeureFin = document.createElement('span');
        visualRdv.spanTitre = document.createElement('span');

        visualRdv.container.classList.add("container-visual-rdv");
        visualRdv.spanHeureDebut.classList.add("span-heure-debut");
        visualRdv.spanHeureFin.classList.add("span-heure-fin");
        visualRdv.spanTitre.classList.add("span-titre");

        visualRdv.container.appendChild(visualRdv.spanHeureDebut);
        visualRdv.container.appendChild(visualRdv.spanHeureFin);
        visualRdv.container.appendChild(visualRdv.spanTitre);

        visualRdv.appendChild(visualRdv.container)
    }

    generateUniqueColor(index) {
        // Utilise le nombre d'or pour espacer les teintes de façon optimale
        const goldenRatio = 0.618033988749895;
        const hue = (index * goldenRatio * 360) % 360;
        
        // Saturation et luminosité ajustées pour des couleurs vives et lisibles
        const saturation = 65 + (index * 7) % 20; // Entre 65% et 85%
        const lightness = 50 + (index * 5) % 15;  // Entre 50% et 65%
        
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    /*
    attachToCell(visualRdv, cell, rdv) 
    {
        const rect = cell.getBoundingClientRect();

        // offset du scroll total de la page
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // position absolue dans la page (indépendante du scroll)
        const absoluteLeft = rect.left + scrollLeft;
        const absoluteTop = rect.top + scrollTop;

        // placer le composant en position absolue dans le body
        visualRdv.style.left = `${absoluteLeft}px`;
        visualRdv.style.top = `${absoluteTop - 101}px`; // -70 selon ton offset

        // taille du composant
        visualRdv.style.width = `${rect.width}px`;
        visualRdv.style.height = `${rect.height * rdv.nombreCellules}px`;


        let table_planning = document.getElementById("planning");
        if (!visualRdv.parentNode) {
            table_planning.appendChild(visualRdv);
        }
    }*/


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


