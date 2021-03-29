export class Connect4 {
    constructor() {
        this.board = this.generateGameBoard();
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
    determineWin(row, col, mode) {
        if (this.checkRow(row) ||
            this.checkColumn(col) ||
            this.checkUpDiagonal(row, col) ||
            this.checkDownDiagonal(row, col)) {
            if (mode === 'offline') {
                this.finish(`${this.color.toUpperCase()} wins`, this.color);
            }
            else {
                const msg = this.color === this.myColor ? 'You Won' : 'You lost';
                const color = this.color === this.myColor ? 'green' : 'red';
                this.finish(msg, color);
            }
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
        this.modal.handleRematch(false);
        this.modal.handleFriend(false);
        this.modal.showText({
            text,
            color,
        });
        this.root.classList.add('stop');
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
