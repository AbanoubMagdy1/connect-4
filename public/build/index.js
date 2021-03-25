import { OfflineConnect4 } from './OfflineConnect4.js';
const offline = document.getElementById('offline');
offline.addEventListener('click', () => {
    OfflineConnect4.createConnect4({ root: 'table', modal: 'modal' });
});
