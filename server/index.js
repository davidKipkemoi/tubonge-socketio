const express = require('express')
const http = require('http')
const Server = require('socket.io').Server
const PORT = 6009
const app = express()
const path = require('path')
const server = http.createServer(app)
const cors = require('cors')
const io = new Server(server,{
    cors:{
        origin:"*"
    }
}) 

const _dirname = path.dirname("")
const buildPath = path.join(_dirname,"../client/build")
app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})
io.on("connection", (socket)=>{
    console.log("We are connected ")

    socket.on("chat", chat=>{
        io.emit("chat",chat)
    })

    socket.on("disconnection",()=>{
        console.log("We are disconnected")
    })
})
app.use(cors())

server.listen(PORT,()=>{
    console.log(`David's Sever is listening on port: ${PORT}`)
})