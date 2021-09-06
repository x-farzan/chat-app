const express = require('express');
const app = express();
const http = require('http');
const PORT = 8080;
const path = require('path');
const ejs = require('ejs');
const { isObject } = require('util');

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}`);
})


app.set('views', path.join(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')
app.use(express.static(__dirname + '/views'));

app.get('/', (req,res) => {
    //res.sendFile(__dirname, '/index.html');
    // console.log(`HELLO`);
    // res.send(`HELLO`)
    res.render('index')
})


//  < -----------------SOCKET------------------>

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user connected ...');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})


