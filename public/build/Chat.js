import { Socket } from './index.js';
export class Chat {
    constructor(root) {
        this.root = root;
        this.numOfNewMessages = 0;
        this.displayChat = () => {
            this.root.classList.toggle('show');
            this.hideBadge();
        };
        this.addMessage = (msg, className) => {
            const template = document.createElement('template');
            template.innerHTML = `
      <div class="msg ${className}">${msg}</div>
    `;
            this.container.append(template.content);
            this.container.scrollTop = this.container.scrollHeight;
        };
        this.handleSendMessage = () => {
            if (this.inputMsg.value.trim()) {
                const msg = this.inputMsg.value;
                this.addMessage(msg, 'sent');
                this.inputMsg.value = '';
                Socket.emit('chat', msg);
            }
        };
        this.displayBadge = () => {
            this.badge.classList.remove('hidden');
            this.badge.textContent =
                this.numOfNewMessages > 5 ? '5+' : String(this.numOfNewMessages);
        };
        this.hideBadge = () => {
            this.badge.classList.add('hidden');
            this.badge.textContent = '';
            this.numOfNewMessages = 0;
        };
        this.root.classList.remove('hidden');
        this.toggleButton = this.root.querySelector('#toggle');
        this.sendButton = this.root.querySelector('#send');
        this.inputMsg = this.root.querySelector('#messageInput');
        this.container = this.root.querySelector('#messages');
        this.badge = this.root.querySelector('#badge');
        this.toggleButton.addEventListener('click', this.displayChat);
        this.sendButton.addEventListener('click', this.handleSendMessage);
        this.inputMsg.addEventListener('keydown', e => {
            if (e.code === 'Enter') {
                this.handleSendMessage();
            }
        });
        Socket.on('chat', msg => {
            this.addMessage(msg, 'recieved');
            if (!this.root.classList.contains('show')) {
                this.numOfNewMessages++;
                this.displayBadge();
            }
        });
    }
}
