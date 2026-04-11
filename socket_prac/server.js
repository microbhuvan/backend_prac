const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket)=>{
    console.log("user connected", socket.id);

    socket.on("send_message", (msg)=>{
        console.log("message received ",msg);

        io.emit("receive_message", msg);
    })
})

server.listen(3000, ()=>{
    console.log("server running");
})
