import { Connect4, Color } from './Connect4.js';
import { Modal } from './Modal.js';

export class OfflineConnect4 extends Connect4 {
  public color: Color = 'red';
  public myColor: Color = 'red';

  static createConnect4({ root, modal }): OfflineConnect4 {
    return new OfflineConnect4(
      document.getElementById(root),
      new Modal(document.getElementById(modal))
    );
  }

  constructor(public root: Element, public modal: Modal) {
    super();
    this.modal.hide();

    this.modal.rematchBtns
      .querySelector('#rematch')
      .addEventListener('click', this.rematch);

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
          this.determineWin(row, col, 'offline');
          this.color = this.color === 'red' ? 'blue' : 'red';
        }
      });
    });
  }

  rematch = (): void => {
    this.board = this.generateGameBoard();
    this.color = 'red';
    this.root.classList.remove('stop');
    this.modal.hide();
    this.root.querySelectorAll('.circle').forEach(circle => {
      circle.className = 'circle';
    });
  };
}
