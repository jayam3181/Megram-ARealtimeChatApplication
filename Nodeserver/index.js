// Node server which will handle socket.io connections
const io = require('socket.io')(8000,{
  cors:{
    origin:'*'
  }
})

const users= {}
io.on('connection', socket =>{
    socket.on('new-user-joined', name=>{
        // console.log('new user', name)
        users[socket.id]=name
        socket.broadcast.emit('user-joined', name)
    })
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name:users[socket.id]})
    })
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id]
    })
})
io.on('connection', socket =>{
    socket.on('new_user_joined', name=>{
        users[socket.id]=name
        socket.broadcast.emit('user_joined', name)
    })
})