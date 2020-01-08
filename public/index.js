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
        // var li = jQuery('<li></li>');
        var formattedTime = moment(message.createAt).format('h:mm a');
        // li.text(`${message.from} ${formattedTime}: ${message.text}`);
        // jQuery('#messages').append(li);
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createAt: formattedTime
        });
        jQuery('#messages').append(html); 
    });
});

socket.on('disconnect', function(){
    console.log("Disconnected from server");
});
