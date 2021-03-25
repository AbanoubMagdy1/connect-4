import { Connect4 } from './Connect4.js';
const offline = document.getElementById('offline');
offline.addEventListener('click', () => {
    Connect4.createConnect4({ root: 'table', modal: 'modal' });
});
