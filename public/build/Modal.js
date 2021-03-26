export class Modal {
    constructor(modal) {
        this.modal = modal;
        this.winner = modal.querySelector('.winner');
        this.startBtns = modal.querySelector('.btns-start');
        this.rematchBtns = modal.querySelector('.btns-rematch');
        this.loader = modal.querySelector('.loader');
        this.rematchBtns.querySelector('#change').addEventListener('click', () => {
            window.location.reload();
        });
    }
    show() {
        this.modal.classList.remove('hidden');
        this.rematchBtns.classList.remove('hidden');
        this.loader.classList.add('hidden');
    }
    hide() {
        this.modal.classList.add('hidden');
        this.startBtns.classList.add('hidden');
    }
    showLoader() {
        this.loader.classList.remove('hidden');
    }
    hideLoader() {
        this.loader.classList.add('hidden');
    }
    hideStartAndShowHandlers() {
        this.startBtns.classList.add('hidden');
        this.rematchBtns.classList.remove('hidden');
    }
    handlewinner({ text, color }) {
        this.winner.textContent = text;
        this.winner.style.color = color;
    }
}
