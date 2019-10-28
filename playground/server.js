const http = require('http');
const path = require('path');

const express = require('express');
const socketio= require('socket.io');

const app = express()
const server = http.createServer(app)
const io = socketio(server)


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')))


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

app.get('/',(req, res)=>{
    res.render('index')
})

server.listen(5000,()=>{
    console.log('connected')
})