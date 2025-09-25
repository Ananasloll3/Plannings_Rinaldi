
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

    createVisualRdv (rdv, nextId) {

        let planning_table = document.getElementById("planning")
        let visualRdv = document.createElement('visual-rdv-base');
        
        visualRdv.id = 'visual-rdv-base-' + nextId;
        visualRdv.appendChild(this.addChildNode());
        //let visualRdv = new VisualRdvBase(nextId);

        visualRdv.children[0].children[0].textContent = String(rdv.heureDebut).padStart(2, '0') + ":00";
        visualRdv.children[0].children[1].textContent = String(rdv.heureFin).padStart(2, '0') + ":00";
        visualRdv.children[0].children[2].textContent = rdv.titre;        


        visualRdv.style.position = "absolute";
        visualRdv.style.zIndex = "999999";
    
        this.attachToCell(visualRdv, rdv.startCell);

        return visualRdv;
    }

    attachToCell(visualRdv, cell) 
    {
        const x = cell.offsetLeft;
        const y = cell.offsetTop;
        const w = cell.offsetWidth;
        const h = cell.offsetHeight;        

        visualRdv.x = x;
        visualRdv.y = y;
        visualRdv.width = w;
        visualRdv.height = h;

        // important : le tableau doit être positionné "relative"
        const table = cell.closest("table");        

        // si pas déjà dans le tableau, on l'ajoute dans le tbody
        if (!visualRdv.parentNode) {            
            table.querySelector("tbody").appendChild(visualRdv);
        }
    }


    addChildNode(){
        let _div = document.createElement('div');
        
        let spanHeureDebut = document.createElement('span');
        let spanHeureFin = document.createElement('span');
        let spanTitre = document.createElement('span');

        _div.appendChild(spanHeureDebut);
        _div.appendChild(spanTitre);
        _div.appendChild(spanHeureFin);

        return _div;
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


