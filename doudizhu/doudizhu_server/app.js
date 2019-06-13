const socket = require('socket.io');
const app = socket('4000');
app.on("connection" , function (socket) {
    console.log("a user connected"); 
});

console.log("listen on 4000");