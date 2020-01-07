var socket = io();
socket.on('connect', function(){
    console.log("Connected to the server");

    // socket.emit('createMessage', {
    //     from: 'Christian',
    //     text: 'Hey, this is Chris'
    // });

    socket.on('newMessage', (message) => {
        console.log("The new Message is: ", message);
    });
});

socket.on('disconnect', function(){
    console.log("Disconnected from server");
});
