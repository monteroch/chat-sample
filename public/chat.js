var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ){
        messages.scrollTop(scrollHeight);
    }
}

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
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log("No error");
        }
    });

    socket.on('newMessage', (message) => {
        var formattedTime = moment(message.createAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            text: message.text,
            from: message.from,
            createAt: formattedTime
        });
        jQuery('#messages').append(html); 
        scrollToBottom();
    });
});

socket.on('disconnect', function(){
    console.log("Disconnected from server");
});

socket.on('updateUserList', function(users){
    console.log('User list', users);
});
