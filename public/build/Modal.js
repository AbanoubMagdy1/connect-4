export class Modal {
    constructor(modal) {
        this.modal = modal;
        this.hideBody = () => {
            this.hideBtn.textContent = this.modalBody.classList.contains('hidden')
                ? 'Hide'
                : 'Show';
            this.modalBody.classList.toggle('hidden');
        };
        this.modalBody = modal.querySelector('.modal-body');
        this.hideBtn = modal.querySelector('#hide');
        this.winner = modal.querySelector('.winner');
        this.startBtns = modal.querySelector('.btns-start');
        this.rematchBtns = modal.querySelector('.btns-rematch');
        this.loader = modal.querySelector('.loader');
        this.friendGroup = modal.querySelector('.link-to-friend');
        this.friendlink = modal.querySelector('#friendlink');
        this.hideBtn.classList.remove('hidden');
        this.hideBtn.addEventListener('click', this.hideBody);
        this.rematchBtns.querySelector('#change').addEventListener('click', () => {
            window.location.reload();
        });
    }
    show() {
        this.modal.classList.remove('hidden');
        this.rematchBtns.classList.remove('hidden');
        this.loader.classList.add('hidden');
        this.hideFriendGroup();
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
    findButtonText(text) {
        this.rematchBtns.querySelector('#find').textContent = text;
    }
    hideStartAndShowHandlers() {
        this.startBtns.classList.add('hidden');
        this.rematchBtns.classList.remove('hidden');
    }
    showText({ text, color }) {
        this.winner.textContent = text;
        this.winner.style.color = color;
    }
    offlineMode() {
        this.rematchBtns.querySelector('#find').classList.add('hidden');
        this.rematchBtns.querySelector('#friend').classList.add('hidden');
    }
    handleRematch(isDisabled) {
        const rematch = this.rematchBtns.querySelector('#rematch');
        rematch.disabled = isDisabled;
    }
    handleFriend(isDisabled) {
        const friend = this.rematchBtns.querySelector('#friend');
        friend.disabled = isDisabled;
    }
    showFriendGroup() {
        this.friendGroup.classList.remove('hidden');
    }
    hideFriendGroup() {
        this.friendGroup.classList.add('hidden');
    }
}
