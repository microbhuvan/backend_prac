const { Server } = require("socket.io");


const io = new Server(3000, {
    cors: "*"
});

let onlineUsers = new Map();

io.on("connection", (socket)=>{
    
    console.log("new user connected: ", socket.id);

    socket.on("USER_ONLINE", (userId)=>{

        if(!onlineUsers.has(userId)){
            
            onlineUsers.set(userId, new Set());
        }

        onlineUsers.get(userId).add(socket.id);

        console.log(onlineUsers);

        io.emit("ONLINE_USERS", Array.from(onlineUsers.keys()));

    })

    socket.on("disconnect", ()=>{

        for(const [userId, sockets] of onlineUsers.entries()){

            sockets.delete(socket.id);

            if(sockets.size === 0){
                onlineUsers.delete(userId);
            }
        }

        io.emit("ONLINE_USERS", Array.from(onlineUsers.keys()));

    })
})

