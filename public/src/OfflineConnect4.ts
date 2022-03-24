import { Connect4, Color } from './Connect4.js';
import { Modal } from './Modal.js';

export class OfflineConnect4 extends Connect4 {
  public color: Color = 'red';
  public myColor: Color = 'red';
  public moves : number[][] = [];

  static createConnect4({ root, modal }): OfflineConnect4 {
    return new OfflineConnect4(
      document.getElementById(root),
      new Modal(document.getElementById(modal)),
      document.getElementById("undo") as HTMLButtonElement
    );
  }

  constructor(public root: Element, public modal: Modal, public undoBtn) {
    super();
    this.modal.hide();
    this.modal.offlineMode();
    this.modal.handleRematch(false);
    this.modal.rematchBtns
      .querySelector('#rematch')
      .addEventListener('click', this.rematch);

    this.undoBtn.addEventListener('click', this.undo.bind(this))

    this.root.querySelectorAll('.circle').forEach(cell => {
      cell.addEventListener('click', ({ target }) => {
        //target here is the circle because it is the element I click
        //I have to specify target type in typescript to use its props
        const target1 = target as HTMLTableDataCellElement;
        const col = parseInt(target1.dataset.column);
        const row = this.cellToBeUsed(col);
        if (row >= 0) {
          this.board[row][col] = this.color;
          this.root
            .querySelector(`[data-row='${row}'][data-column='${col}']`)
            .classList.add(this.color);
          this.moves.push([row, col])
          this.undoBtn.disabled = false  
          this.determineWin(row, col, 'offline');
          this.color = this.swapColor()
        }
      });
    });
  }

  rematch(): void  {
    this.board = this.generateGameBoard();
    this.color = 'red';
    this.root.classList.remove('stop');
    this.modal.hide();
    this.root.querySelectorAll('.circle').forEach(circle => {
      circle.className = 'circle';
    });
  };

  undo(): void{
    if(this.moves.length){
      const [row, col] = this.moves.pop();
      this.board[row][col] = '';
      this.root
      .querySelector(`[data-row='${row}'][data-column='${col}']`).className = 'circle'
    }

    this.color = this.swapColor()

    if(!this.moves.length){
      this.undoBtn.disabled = true;
    }
  }

  swapColor(): Color{
    return this.color === 'red' ? 'blue' : 'red'
  }
}
