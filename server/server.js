const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //In this point we are ready to accept for new connections

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");
    socket.emit("newMessage", generateMessage('Admin', 'Welcome to the chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    })
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
    
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})


//Pag 255