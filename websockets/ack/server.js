const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: "*"
});

io.on("connection", (socket)=>{

    console.log("new user connected: ",socket.id);

    socket.on("CHAT_MESSAGE", (data, callback)=>{

        console.log("received: 2", data);

        io.emit("CHAT_MESSAGE", data);

        callback({
            success:true,
            message: "message delivered to server"
        })
    })
})