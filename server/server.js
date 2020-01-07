const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server); //In this point we are ready to accept for new connections

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");
    socket.emit("newMessage", {
        from: "Admin",
        text: "Welcome to the chat App"
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: "New user joined"
    })

    socket.on('createMessage', (message) => {
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text
        // })
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text
        })
    })
    
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
    
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})


//Pag 255