const socketIO = require('socket.io')
const NotificationModel = require('./Models/NotificationModel.js')

const registerSocketServer = (server) => {
  let onlineUsers = []

  const addNewUser = (userId, socketId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({ userId, socketId })
  }

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)
  }

  const getUser = (userId) => {
    return onlineUsers.find((user) => user.userId === userId)
  }
  const io = socketIO(server, {
    cors: {
      origin: [process.env.CLIENT_URL, 'https://accounts.google.com/', 'http://localhost:5000'],
      credentials: true
    }
  })


  io.on('connection', (socket) => {
    io.emit('sendAll', 'Hello all client!')
    socket.on('newUser', (userId) => {
      addNewUser(userId, socket.id)
    })

    socket.on('initial_data', async (userId) => {
      const notification = await NotificationModel.find({ userReceiverId: userId, read: false })
        .sort({ createdAt: -1 })
      const receiver = getUser(userId)
      if (receiver) {
        io.to(receiver.socketId).emit('get_data', notification)
      }
    })

    socket.on('post_data', async (data) => {
      const notification = new NotificationModel(data)
      await notification.save()
      const receiver = getUser(data.userReceiverId)
      if (receiver) {
        io.sockets.emit('change_data')
      }
    })

    socket.on('check_select_notification', async (item) => {
      const notification = await NotificationModel.findById(item._id)
      notification.read = true
      await notification.save()
      const receiver = getUser(item.userReceiverId)
      if (receiver) {
        io.to(receiver.socketId).emit('change_data')
      }
    })

    socket.on('check_all_notifications', async () => {
      const notifications = await NotificationModel.find({})

      notifications.forEach((notification) => {
        notification.read = true
      })

      await NotificationModel.create(notifications)

      io.sockets.emit('change_data')
    })

    socket.on('disconnect', () => {
      removeUser(socket.id)
    })
  })
}

module.exports = {
  registerSocketServer
}