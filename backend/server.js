const app = require('./src/app');
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5000;

// Create an HTTP server with Express app
const server = http.createServer(app);

// Create Socket.io instance and attach to server
const io = new Server(server, {
  cors: {
    origin: '*', // allow all origins for MVP, restrict in production!
    methods: ['GET', 'POST']
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a chat room (session)
  socket.on('joinRoom', ({ roomId, username }) => {
    socket.join(roomId);
    io.to(roomId).emit('message', {
      username: 'System',
      text: `${username} joined the room.`,
      time: new Date()
    });
  });

  // Handle sending message
  socket.on('sendMessage', ({ roomId, username, text }) => {
    io.to(roomId).emit('message', {
      username,
      text,
      time: new Date()
    });
  });

  // Handle leaving room
  socket.on('leaveRoom', ({ roomId, username }) => {
    socket.leave(roomId);
    io.to(roomId).emit('message', {
      username: 'System',
      text: `${username} left the room.`,
      time: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`SkillSync backend server running (Socket.io enabled) on port ${PORT}`);
});