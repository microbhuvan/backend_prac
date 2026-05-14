const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

    console.log("Connected:", socket.id);

    // JOIN ROOM
    socket.on("JOIN_ROOM", (roomId) => {

        socket.join(roomId);

    });

    // USER TYPING
    socket.on("USER_TYPING", ({ roomId, username }) => {

        socket.broadcast.to(roomId).emit("USER_TYPING", {
            username
        });

    });

    // STOP TYPING
    socket.on("STOP_TYPING", ({ roomId }) => {

        socket.broadcast.to(roomId).emit("STOP_TYPING");

    });

});