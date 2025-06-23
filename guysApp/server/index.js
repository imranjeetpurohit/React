const Koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const socketIO = require('socket.io');

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketIO(server, {
  cors: {
    origin: "*",
  }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.use(bodyParser());

// Routes
const router = new Router();
const Message = require('./models/Message');

router.get('/messages', async ctx => {
  ctx.body = await Message.find();
});

router.post('/messages', async ctx => {
  const { sender, content } = ctx.request.body;
  const msg = new Message({ sender, content });
  await msg.save();
  io.emit('newMessage', msg);
  ctx.body = msg;
});

app.use(router.routes()).use(router.allowedMethods());

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(5000, () => {
  console.log('Koa server running on http://localhost:5000');
});
