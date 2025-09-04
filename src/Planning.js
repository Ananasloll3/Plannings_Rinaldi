
export class Planning {
    constructor(table) {
        this.table = table;
        this.onSelect = false;
        this.cellSelected = null;

        this.STATE = {
            "FREE": 0,
            "OCCUPED": 1,
            "INCOMING": 2
        }

    }

    selectCell(cell){

        if (!this.onSelect) {
            this.cellSelected = cell;
            console.log("First cell selected : " + cell.id);
            
        }
        else {
            console.log("Seconde cell selected : " + cell.id);
            let parentFirstCell = cell.parentElement().id;
            
            this.table;
        }
    }

    clearPlanning(){
        const cells = document.querySelectorAll('.tr_line td:not(:first-child)');
        cells.forEach(cell => {
            cell.className = '';
            cell.textContent = '';
        });
    }

    savePlanning(){

    }
}
