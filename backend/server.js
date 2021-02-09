const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const connectDB = require('./config/db');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

connectDB();

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'ادمین', text: `${user.name} وارد گروه شد ` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} گروه را ترک کرد `,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/search', require('./routes/search'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(path.resolve(), 'frontend', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req, res) => {
    res.send('Api is running');
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`server started on port ${PORT}`));
