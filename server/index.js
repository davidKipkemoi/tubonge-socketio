const express = require('express')
const http = require('http')
const { Socket } = require('socket.io')
const Server = require('socket.io').Server
const PORT = 6001
const app = express()
const path = require('path')
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'*'
    }
}) 

const _dirname =path.dirname("")
const buildpath = path.join(_dirname,"../client/build")
app.use(express.static(buildpath))
app.get("/*",function(req,res){
    res.sendFile(
        path.join(__dirname,"../client/build/index.html"),
        function(err){
            if(err){
                res.status(500).send(err)
            }
        }
    )
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

server.listen(PORT,()=>{
    console.log(`David's Sever is listening on port: ${PORT}`)
})