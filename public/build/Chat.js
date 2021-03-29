export class Chat {
    constructor(root) {
        this.root = root;
        this.displayChat = () => {
            this.root.classList.toggle('show');
        };
        this.root.classList.remove('hidden');
        this.toggleButton = this.root.querySelector('#toggle');
        this.toggleButton.addEventListener('click', this.displayChat);
    }
}
