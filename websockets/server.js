const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 8080}); //websocket server

console.log("websocket server running on port 8080");

wss.on("connection", (socket)=>{  //socket a private indivisual tunnel
    
    console.log("new client added");

    socket.send("welcome to the server");

    socket.on("message", (message)=>{
        console.log("received", message.toString());

        wss.clients.forEach((client) =>{  //wss.clients contains all connected sockets
            if(client.readyState === WebSocket.OPEN){
                client.send(message.toString());
            }
        })
    })

    socket.on("close", ()=>{
        console.log("client disconnected");
    })

})

