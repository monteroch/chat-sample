var socket = io();

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val("");
    })
})

socket.on('connect', function(){
    console.log("Connected to the server");

    socket.on('newMessage', (message) => {
        var li = jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);
        jQuery('#messages').append(li);
    });
});

socket.on('disconnect', function(){
    console.log("Disconnected from server");
});
