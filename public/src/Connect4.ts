type CellStatus = '' | 'red' | 'blue';
type Color = 'red' | 'blue';

export class Connect4 {
  private board: CellStatus[][] = this.generateGameBoard();
  private color: Color = 'red';

  constructor(private root: Element) {
    this.root.querySelectorAll('td').forEach(cell => {
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
          this.determineWin(row, col);
          this.color = this.color === 'red' ? 'blue' : 'red';
        }
      });
    });
  }

  generateGameBoard(): CellStatus[][] {
    return [...Array(6).keys()].map(row => {
      return Array.from({ length: 7 }).map(cell => '');
    });
  }

  cellToBeUsed(col: number): number {
    for (let i = 5; i >= 0; i--) {
      if (this.board[i][col] === '') {
        return i;
      }
    }
    return -1;
  }

  determineWin(row: number, col: number): void {
    if (
      this.checkRow(row) ||
      this.checkColumn(col) ||
      this.checkUpDiagonal(row, col) ||
      this.checkDownDiagonal(row, col)
    ) {
      console.log(`${this.color.toUpperCase()} won`);
      this.root.classList.add('finished');
    }
  }

  checkRow(row: number): boolean {
    let counter = 0;
    for (let i = 0; i < 7; i++) {
      if (this.board[row][i] === this.color) {
        counter++;
        if (counter === 4) {
          return true;
        }
      } else {
        counter = 0;
      }
    }
    return false;
  }

  checkColumn(col: number): boolean {
    let counter = 0;
    for (let i = 0; i < 6; i++) {
      if (this.board[i][col] === this.color) {
        counter++;
        if (counter === 4) {
          return true;
        }
      } else {
        counter = 0;
      }
    }
    return false;
  }

  checkUpDiagonal(row: number, col: number): boolean {
    let counter = 0;
    let min = Math.min(row, col);
    let newRow = row - min;
    let newCol = col - min;
    while (newRow < this.board.length && newCol < this.board[0].length) {
      if (this.board[newRow][newCol] === this.color) {
        counter++;
        if (counter === 4) {
          return true;
        }
      } else {
        counter = 0;
      }
      newRow++;
      newCol++;
    }
    return false;
  }

  checkDownDiagonal(row: number, col: number): boolean {
    let counter = 0;
    let newRow = row + col > 5 ? 5 : row + col;
    let diff = newRow - row;
    let newCol = col - diff;
    while (newRow >= 0 && newCol < this.board[0].length) {
      if (this.board[newRow][newCol] === this.color) {
        counter++;
        if (counter === 4) {
          return true;
        }
      } else {
        counter = 0;
      }
      newRow--;
      newCol++;
    }
    return false;
  }
}
