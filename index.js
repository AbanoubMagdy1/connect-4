import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import {
  addToPairing,
  addToFriends,
  pair,
  pairWithFriend,
  disconnect,
} from './utils/users.js';

const app = express();
const PORT = 3000;

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

const io = new Server(server, {});

io.on('connection', socket => {
  //console.log(socket.handshake.headers.referer.split('=')[1]);
  let pairedWith;
  socket.on('pair', () => {
    const paired = pair();
    if (paired) {
      pairedWith = paired;
      socket.emit('start', { color: 'blue', pairedId: pairedWith });
      socket.broadcast.to(pairedWith).emit('paired', socket.id);
    } else {
      addToPairing(socket.id);
    }
  });

  socket.on('paired', id => {
    pairedWith = id;
    socket.emit('start', { color: 'red', pairedId: pairedWith });
  });

  socket.on('rematch', () => {
    socket.broadcast.to(pairedWith).emit('rematch', '');
  });

  socket.on('move', col => {
    socket.broadcast.to(pairedWith).emit('move', col);
  });

  socket.on('disconnect', () => {
    console.log(socket.id);
    disconnect(socket.id);
    if (pairedWith) {
      socket.broadcast.to(pairedWith).emit('dis', socket.id);
    }
  });
});
