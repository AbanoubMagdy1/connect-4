import { OfflineConnect4 } from './OfflineConnect4.js';
import { OnlineConnect4 } from './OnlineConnect4.js';
const offline = document.getElementById('offline');
const online = document.getElementById('online');
offline.addEventListener('click', () => {
    OfflineConnect4.createConnect4({ root: 'table', modal: 'modal' });
});
online.addEventListener('click', () => {
    OnlineConnect4.createConnect4({ root: 'table', modal: 'modal' });
});
