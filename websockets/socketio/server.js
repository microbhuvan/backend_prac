const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: "*"
    }
})

console.log("socket.io is running");

io.on("connection", (socket)=>{
    //console.log("socket", socket)
    console.log("user connected: ", socket.id);

    socket.on("CHAT_MESSAGE", (data)=>{
        console.log(data);
        socket.emit("AUTH_MESSAGE" ,{
            text:"emitting to only you"
        })
        io.emit("CHAT_MESSAGE", data);
    })

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })
})