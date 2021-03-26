import { Connect4 } from './Connect4.js';
import { Modal } from './Modal.js';
const Socket = io.connect('/');
export class OnlineConnect4 extends Connect4 {
    constructor(root, modal) {
        super();
        this.root = root;
        this.modal = modal;
        this.color = 'red';
        this.myColor = 'red';
        this.rematch = false;
        this.opponentRematch = false;
        this.start = () => {
            this.rematch = false;
            this.opponentRematch = false;
            this.board = this.generateGameBoard();
            this.color = 'red';
            this.root.classList.remove('stop');
            this.modal.hide();
            this.root.querySelectorAll('.circle').forEach(circle => {
                circle.className = 'circle';
            });
        };
        this.modal.hideStartAndShowHandlers();
        this.modal.rematchBtns
            .querySelector('#rematch')
            .addEventListener('click', () => {
            this.rematch = true;
            if (this.opponentRematch) {
                Socket.emit('rematch', true);
                this.start();
                this.myColor = this.myColor === 'red' ? 'blue' : 'red';
                if (this.myColor !== this.color) {
                    this.root.classList.add('stop');
                }
            }
            else {
                Socket.emit('rematch', false);
            }
        });
        this.modal.rematchBtns
            .querySelector('#find')
            .addEventListener('click', () => {
            this.opponentId = '';
            Socket.emit('pair', '');
            this.modal.showLoader();
        });
        Socket.on('start', ({ color, pairedId }) => {
            this.start();
            console.log(color);
            this.myColor = color;
            this.opponentId = pairedId;
            if (this.myColor !== this.color) {
                this.root.classList.add('stop');
            }
        });
        Socket.on('paired', id => {
            Socket.emit('paired', id);
        });
        Socket.on('move', col => {
            this.handleMove(col);
        });
        Socket.on('rematch', () => {
            this.modal.handlewinner({
                text: 'Opponent wants to rematch',
                color: 'gray',
            });
            this.opponentRematch = true;
            if (this.rematch) {
                this.start();
                this.myColor = this.myColor === 'red' ? 'blue' : 'red';
                if (this.myColor !== this.color) {
                    this.root.classList.add('stop');
                }
            }
        });
        Socket.on('dis', id => {
            if (id === this.opponentId) {
                this.opponentId = '';
                this.modal.show();
                this.modal.handlewinner({ text: 'Opponent left', color: 'gray' });
            }
        });
        this.root.querySelectorAll('.circle').forEach(cell => {
            cell.addEventListener('click', ({ target }) => {
                //target here is the circle because it is the element I click
                //I have to specify target type in typescript to use its props
                const target1 = target;
                const col = parseInt(target1.dataset.column);
                this.handleMove(col);
                Socket.emit('move', col);
            });
        });
    }
    static createConnect4({ root, modal }) {
        return new OnlineConnect4(document.getElementById(root), new Modal(document.getElementById(modal)));
    }
    handleMove(col) {
        const row = this.cellToBeUsed(col);
        if (row >= 0) {
            this.board[row][col] = this.color;
            this.root
                .querySelector(`[data-row='${row}'][data-column='${col}']`)
                .classList.add(this.color);
            this.determineWin(row, col, 'online');
            this.color = this.color === 'red' ? 'blue' : 'red';
            if (this.myColor === this.color) {
                this.root.classList.remove('stop');
            }
            else {
                this.root.classList.add('stop');
            }
        }
    }
}