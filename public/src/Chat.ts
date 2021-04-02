import { Socket } from './index.js';

type MessageClasses = 'sent' | 'recieved';

export class Chat {
  public toggleButton: HTMLButtonElement;
  public sendButton: HTMLButtonElement;
  public inputMsg: HTMLInputElement;
  public container: HTMLDivElement;
  public badge: HTMLSpanElement;
  public numOfNewMessages: number = 0;

  constructor(public root: HTMLElement) {
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

  displayChat = (): void => {
    this.root.classList.toggle('show');
    this.hideBadge();
  };

  addMessage = (msg: string, className: MessageClasses): void => {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="msg ${className}">${msg}</div>
    `;
    this.container.append(template.content);
  };

  handleSendMessage = (): void => {
    if (this.inputMsg.value.trim()) {
      const msg = this.inputMsg.value;
      this.addMessage(msg, 'sent');
      this.inputMsg.value = '';
      Socket.emit('chat', msg);
    }
  };

  displayBadge = () => {
    this.badge.classList.remove('hidden');
    this.badge.textContent =
      this.numOfNewMessages > 5 ? '5+' : String(this.numOfNewMessages);
  };

  hideBadge = () => {
    this.badge.classList.add('hidden');
    this.badge.textContent = '';
    this.numOfNewMessages = 0;
  };
}
