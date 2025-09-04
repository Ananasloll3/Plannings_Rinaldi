
export class Planning {
    constructor(table) {
        this.table = table;
        this.firstCellSelected = false;
        this.cellSelected = null;
        this.rdvNumber = 0;

        this.STATE = {
            "FREE": 0,
            "OCCUPED": "occupied",
            "INCOMING": 2
        }

    }

    selectCell(cell){

        if (!this.firstCellSelected) {
            this.cellSelected = cell;
            this.firstCellSelected = true;
            console.log("First cell selected : " + cell.id);
            
        }
        else {
            console.log("Seconde cell selected : " + cell.id);
            let firstCellId = this.cellSelected.id;
            let secondeCellId = cell.id;

            if (firstCellId === secondeCellId) {
                cell.className = this.STATE.OCCUPED;
            }

            let firstCellArraySplit = firstCellId.split("_cell_");
            let secondeCellArraySplit = secondeCellId.split("_cell_");

            if (firstCellArraySplit[1] !== secondeCellArraySplit[1]) {
                console.log("N'est pas le meme jour");
                alert("Veuillez mettre le rdv sur le meme jour")
                this.cellSelected = null;
                this.firstCellSelected = false;
                return;
            }

            let firstCellLine = firstCellArraySplit[0].split("line")[1];
            let secondeCellLine = secondeCellArraySplit[0].split("line")[1];
            
            
            let smallestLine = Math.min(parseInt(firstCellLine), parseInt(secondeCellLine));
            let biggestLine = Math.max(parseInt(firstCellLine), parseInt(secondeCellLine));
            this.cellSelected.innerHTML = "RDV" + this.rdvNumber;
            this.rdvNumber++;

            for (let index = smallestLine; index < biggestLine + 1; index++) {
                
                let actualCell = document.getElementById(`line${index}_cell_${firstCellArraySplit[1]}`);                
                actualCell.className = this.STATE.OCCUPED;
                
            }
            
            this.cellSelected = null;
            this.firstCellSelected = false;
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
