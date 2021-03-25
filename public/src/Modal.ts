interface Winner {
  text: string;
  color: string;
}

export class Modal {
  protected winner: HTMLElement;
  protected startBtns: HTMLElement;
  public rematchBtns: HTMLElement;
  constructor(public modal: Element) {
    this.winner = modal.querySelector('.winner');
    this.startBtns = modal.querySelector('.btns-start');
    this.rematchBtns = modal.querySelector('.btns-rematch');

    this.rematchBtns.querySelector('#change').addEventListener('click', () => {
      window.location.reload();
    });
  }

  show(): void {
    this.modal.classList.remove('hidden');
    this.rematchBtns.classList.remove('hidden');
  }

  hide(): void {
    this.modal.classList.add('hidden');
    this.startBtns.classList.add('hidden');
  }

  handlewinner({ text, color }: Winner): void {
    this.winner.textContent = text;
    this.winner.style.color = color;
  }
}
