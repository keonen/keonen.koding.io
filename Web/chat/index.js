var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
   
    res.sendfile('index.html');
});

app.get('/images/background.jpg', function(req, res){
   
    res.sendfile('images/background.jpg');
});

// Wait connection
io.on('connection', function(socket){
   
    console.log('user connected');
    socket.emit("connection created", {viesti:'olet yhteydessä'});
    
    socket.on('chatbot', function(data){
        io.emit('check chatmessage', data);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
