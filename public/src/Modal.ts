interface Winner {
  text: string;
  color: string;
}

type FindButtonText = 'Find Player' | 'Leave Pairing';

export class Modal {
  protected winner: HTMLElement;
  protected startBtns: HTMLElement;
  public rematchBtns: HTMLElement;
  public loader: HTMLElement;
  public friendGroup: HTMLElement;
  public friendlink: HTMLInputElement;

  constructor(public modal: Element) {
    this.winner = modal.querySelector('.winner');
    this.startBtns = modal.querySelector('.btns-start');
    this.rematchBtns = modal.querySelector('.btns-rematch');
    this.loader = modal.querySelector('.loader');
    this.friendGroup = modal.querySelector('.link-to-friend');
    this.friendlink = modal.querySelector('#friendlink');
    this.rematchBtns.querySelector('#change').addEventListener('click', () => {
      window.location.reload();
    });
  }

  show(): void {
    this.modal.classList.remove('hidden');
    this.rematchBtns.classList.remove('hidden');
    this.loader.classList.add('hidden');
    this.hideFriendGroup();
  }

  hide(): void {
    this.modal.classList.add('hidden');
    this.startBtns.classList.add('hidden');
  }

  showLoader(): void {
    this.loader.classList.remove('hidden');
  }

  hideLoader(): void {
    this.loader.classList.add('hidden');
  }

  findButtonText(text: FindButtonText): void {
    this.rematchBtns.querySelector('#find').textContent = text;
  }

  hideStartAndShowHandlers(): void {
    this.startBtns.classList.add('hidden');
    this.rematchBtns.classList.remove('hidden');
  }

  showText({ text, color }: Winner): void {
    this.winner.textContent = text;
    this.winner.style.color = color;
  }

  offlineMode(): void {
    this.rematchBtns.querySelector('#find').classList.add('hidden');
    this.rematchBtns.querySelector('#friend').classList.add('hidden');
  }

  handleRematch(isDisabled: boolean): void {
    const rematch: HTMLButtonElement = this.rematchBtns.querySelector(
      '#rematch'
    );
    rematch.disabled = isDisabled;
  }

  handleFriend(isDisabled: boolean): void {
    const friend: HTMLButtonElement = this.rematchBtns.querySelector('#friend');
    friend.disabled = isDisabled;
  }

  showFriendGroup(): void {
    this.friendGroup.classList.remove('hidden');
  }

  hideFriendGroup(): void {
    this.friendGroup.classList.add('hidden');
  }
}
