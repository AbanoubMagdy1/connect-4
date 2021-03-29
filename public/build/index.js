import { OfflineConnect4 } from './OfflineConnect4.js';
import { OnlineConnect4 } from './OnlineConnect4.js';
export const Socket = io.connect('/');
const offline = document.getElementById('offline');
const online = document.getElementById('online');
const playersNumber = document.querySelector('#number');
offline.addEventListener('click', () => {
    OfflineConnect4.createConnect4({ root: 'table', modal: 'modal' });
});
online.addEventListener('click', () => {
    OnlineConnect4.createConnect4({
        root: 'table',
        modal: 'modal',
        chat: 'chat',
    });
});
if (window.location.search &&
    window.location.search.slice(1).split('=')[0] === 'friendid') {
    OnlineConnect4.createConnect4({
        root: 'table',
        modal: 'modal',
        chat: 'chat',
    });
    Socket.emit('pairwithfriend', window.location.search.slice(1).split('=')[1]);
}
Socket.on('number', num => {
    playersNumber.textContent = String(num);
});
