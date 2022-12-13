const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const cookieParser = require('cookie-parser')
const bayRouter = require('./routes/bay-routes')
const userRouter = require('./routes/user-routes')
const seatRouter = require('./routes/seat-routes')
const bookingRouter = require('./routes/booking-routes')
const OnlineUser = require('./utils/online-users')
require('dotenv').config()

const app = express()
const httpServer = http.createServer(app)
const io = require('socket.io')(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL_PATH
    }
})

app.use(express.json())
app.use(cookieParser())
app.use(cors(process.env.CLIENT_URL_PATH))
app.use('/users', userRouter)
app.use('/bays',bayRouter)
app.use('/seats',seatRouter)
app.use('/bookings', bookingRouter)

const users = new OnlineUser()

//ESTABLISHING SERVER AND DB CONNECTION
mongoose.connect(process.env.DATABASE_CONNECT_STRING)
    .then(() => {
        console.log("Db got connected")
    })
    .then(() => {
        console.log(`Server is running on port : ${process.env.PORT_NUMBER}`)
        httpServer.listen(process.env.PORT_NUMBER, () => {
            io.on('connection',(socket) => {
                socket.on('addUser', (user) => {
                    users.addOnlineUser({
                        userId : user.userId,
                        bayId : user.bayId,
                        socketId : socket.id,
                        bookingDate : user.bookingDate
                    })                   
                })
                socket.on('bookSeat', (book) => {
                    users.onlineUsers.forEach(user => {
                        if((user.socketId !== book.socketId) && (user.userId !== book.userId) && (user.bayId === book.bayId) && (user.bookingDate === book.bookingDate))
                            io.to(user.socketId).emit('alertSeatNotAvailable',{seat : book.seat})
                    })
                })
                socket.on('cancelSeat', (cancel) => {
                    users.onlineUsers.forEach(user => {
                        if((user.userId !== cancel.userId) && (user.bayId === cancel.bayId) && (user.bookingDate === cancel.bookingDate.substring(0,10)))
                            io.to(user.socketId).emit('alertSeatAvailable',{seat : cancel.seat})
                    })
                })
                socket.on('disconnect', () => {
                    users.deleteOnlineUser(socket.id)
                })
            })
        })
    })
    .catch(err => console.log("Error in connecting to database, error : ", err.message))

