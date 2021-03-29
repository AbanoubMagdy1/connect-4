export class Chat {
  public toggleButton: HTMLButtonElement;
  constructor(public root: HTMLElement) {
    this.root.classList.remove('hidden');
    this.toggleButton = this.root.querySelector('#toggle');
    this.toggleButton.addEventListener('click', this.displayChat);
  }

  displayChat = (): void => {
    this.root.classList.toggle('show');
  };
}
