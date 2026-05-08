const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: "*"
    }
});

console.log("Socket.IO server running on port 3000");

io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    // JOIN ROOM
    socket.on("JOIN_ROOM", (roomId) => {

        socket.join(roomId);

        console.log(`${socket.id} joined room ${roomId}`);

        socket.emit("JOIN_SUCCESS", {
            roomId
        });

    });

    // CHAT MESSAGE
    socket.on("CHAT_MESSAGE", ({ roomId, text }) => {

        console.log(`Message in ${roomId}: ${text}`);

        io.to(roomId).emit("CHAT_MESSAGE", {
            sender: socket.id,
            text
        });

    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

});