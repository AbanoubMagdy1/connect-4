import { Connect4 } from './Connect4.js';
import { Modal } from './Modal.js';
import { Chat } from './Chat.js';
import { Socket } from './index.js';
export class OnlineConnect4 extends Connect4 {
    constructor(root, modal, chat) {
        super();
        this.root = root;
        this.modal = modal;
        this.chat = chat;
        this.color = 'red';
        this.myColor = 'red';
        this.rematch = false;
        this.opponentRematch = false;
        this.pairing = false;
        this.start = () => {
            this.rematch = false;
            this.opponentRematch = false;
            this.board = this.generateGameBoard();
            this.color = 'red';
            this.root.classList.remove('stop');
            this.pairing = false;
            this.modal.findButtonText('Find Player');
            this.modal.hide();
            this.root.querySelectorAll('.circle').forEach(circle => {
                circle.className = 'circle';
            });
        };
        this.modal.hideStartAndShowHandlers();
        this.modal.handleRematch(true);
        this.modal.rematchBtns
            .querySelector('#rematch')
            .addEventListener('click', () => {
            this.rematch = true;
            this.modal.handleRematch(true);
            this.modal.showText({ text: 'Rematch offer sent', color: 'gray' });
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
            if (!this.pairing) {
                this.opponentId = '';
                Socket.emit('pair', '');
                this.modal.handleRematch(true);
                this.modal.hideFriendGroup();
                this.modal.handleFriend(true);
                this.modal.findButtonText('Leave Pairing');
                this.modal.showLoader();
                this.pairing = true;
            }
            else {
                Socket.emit('leavePairing', '');
                this.modal.findButtonText('Find Player');
                this.modal.hideLoader();
                this.modal.handleFriend(false);
                this.pairing = false;
            }
        });
        this.modal.rematchBtns
            .querySelector('#friend')
            .addEventListener('click', () => {
            Socket.emit('waitfriend', '');
        });
        Socket.on('waitfriend', id => {
            this.modal.showFriendGroup();
            this.modal.friendlink.value = `${window.location.origin}?friendid=${id}`;
            this.modal.friendlink.select();
        });
        Socket.on('start', ({ color, pairedId }) => {
            this.start();
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
        Socket.on('rematch', id => {
            if (id === this.opponentId) {
                this.modal.showText({
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
            }
        });
        Socket.on('notfound', () => {
            this.modal.showText({ text: 'Your friend not found', color: 'gray' });
        });
        Socket.on('dis', id => {
            if (id === this.opponentId) {
                this.opponentId = '';
                this.modal.show();
                this.modal.handleFriend(false);
                this.modal.handleRematch(true);
                this.modal.showText({ text: 'Opponent left', color: 'gray' });
            }
        });
        this.root.querySelectorAll('.circle').forEach(cell => {
            cell.addEventListener('click', ({ target }) => {
                //I have to specify target type in typescript to use its props
                if (this.color === this.myColor) {
                    const target1 = target;
                    const col = parseInt(target1.dataset.column);
                    this.handleMove(col);
                    Socket.emit('move', col);
                }
            });
        });
    }
    static createConnect4({ root, modal, chat }) {
        return new OnlineConnect4(document.getElementById(root), new Modal(document.getElementById(modal)), new Chat(document.getElementById(chat)));
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
