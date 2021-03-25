import { Modal } from './Modal.js';
export class Connect4 {
    constructor(root, modal) {
        this.root = root;
        this.modal = modal;
        this.board = this.generateGameBoard();
        this.color = 'red';
        this.rematch = () => {
            this.board = this.generateGameBoard();
            this.color = 'red';
            this.root.classList.remove('finished');
            this.modal.hide();
            this.root.querySelectorAll('.circle').forEach(circle => {
                circle.className = 'circle';
            });
        };
        this.modal.hide();
        this.modal.rematchBtns
            .querySelector('#rematch')
            .addEventListener('click', this.rematch);
        this.root.querySelectorAll('.circle').forEach(cell => {
            cell.addEventListener('click', ({ target }) => {
                //target here is the circle because it is the element I click
                //I have to specify target type in typescript to use its props
                const target1 = target;
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
    static createConnect4({ root, modal }) {
        return new Connect4(document.getElementById(root), new Modal(document.getElementById(modal)));
    }
    generateGameBoard() {
        return [...Array(6).keys()].map(row => {
            return Array.from({ length: 7 }).map(cell => '');
        });
    }
    cellToBeUsed(col) {
        for (let i = 5; i >= 0; i--) {
            if (this.board[i][col] === '') {
                return i;
            }
        }
        return -1;
    }
    determineWin(row, col) {
        if (this.checkRow(row) ||
            this.checkColumn(col) ||
            this.checkUpDiagonal(row, col) ||
            this.checkDownDiagonal(row, col)) {
            this.finish(`${this.color.toUpperCase()} won`, this.color);
        }
        else if (row === 0) {
            this.determineDraw();
        }
    }
    determineDraw() {
        const isDraw = this.board.every(row => row.every(cell => cell));
        if (isDraw) {
            this.finish(`DRAW`, 'gray');
        }
    }
    finish(text, color) {
        this.modal.show();
        this.modal.handlewinner({
            text,
            color,
        });
        this.root.classList.add('finished');
    }
    checkRow(row) {
        let counter = 0;
        for (let i = 0; i < 7; i++) {
            if (this.board[row][i] === this.color) {
                counter++;
                if (counter === 4) {
                    return true;
                }
            }
            else {
                counter = 0;
            }
        }
        return false;
    }
    checkColumn(col) {
        let counter = 0;
        for (let i = 0; i < 6; i++) {
            if (this.board[i][col] === this.color) {
                counter++;
                if (counter === 4) {
                    return true;
                }
            }
            else {
                counter = 0;
            }
        }
        return false;
    }
    checkUpDiagonal(row, col) {
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
            }
            else {
                counter = 0;
            }
            newRow++;
            newCol++;
        }
        return false;
    }
    checkDownDiagonal(row, col) {
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
            }
            else {
                counter = 0;
            }
            newRow--;
            newCol++;
        }
        return false;
    }
}
