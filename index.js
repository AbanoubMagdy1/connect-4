import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import {
  addToPairing,
  addToFriends,
  pair,
  pairWithFriend,
  disconnect,
  removeFromFriends,
  removeFromPairing,
} from './utils/users.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

const io = new Server(server, {});

let userNumber = 0;
io.on('connection', socket => {
  userNumber++;
  io.emit('number', userNumber);
  let pairedWith;
  socket.on('pair', () => {
    if (pairedWith) {
      socket.broadcast.to(pairedWith).emit('dis', socket.id);
    }
    removeFromFriends(socket.id);
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
    socket.broadcast.to(pairedWith).emit('rematch', socket.id);
  });

  socket.on('move', col => {
    socket.broadcast.to(pairedWith).emit('move', col);
  });

  socket.on('waitfriend', () => {
    removeFromPairing(socket.id);
    addToFriends(socket.id);
    socket.emit('waitfriend', socket.id);
  });

  socket.on('pairwithfriend', id => {
    const friendid = pairWithFriend(id);
    if (friendid) {
      pairedWith = friendid;
      socket.emit('start', { color: 'blue', pairedId: pairedWith });
      socket.broadcast.to(pairedWith).emit('paired', socket.id);
    } else {
      socket.emit('notfound', '');
    }
  });

  socket.on('leavePairing', () => {
    removeFromPairing(socket.id);
  });

  socket.on('chat', msg => {
    socket.broadcast.to(pairedWith).emit('chat', msg);
  });

  socket.on('disconnect', () => {
    userNumber--;
    io.emit('number', userNumber);
    disconnect(socket.id);
    if (pairedWith) {
      socket.broadcast.to(pairedWith).emit('dis', socket.id);
    }
  });
});
