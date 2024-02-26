import { getUsers, insertMessage } from "functions/socket_functions";
import { Server } from "socket.io";

let users = {}
let senderAndResever = {}

export default function SocketHandler(req, res) {

  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  res.end();

  //socket
  io.on("connection", (socket) => {

    socket.on("setUser", async function ({ user_id }) {
      users[user_id] = socket.id
    })

    socket.on("setResever", async function ({ user_id, resever }) {
      const keyToRemove = Object.keys(users).find(key => users[key] === socket.id);
      if (keyToRemove) {
        delete senderAndResever[keyToRemove]
      }
      senderAndResever[user_id] = resever
    })

    socket.on("get contacts", async function ({ user_id }) {
      const contacts = await getUsers(user_id);
      io.to(users[user_id]).emit('get contacts', { contacts });
    })

    socket.on("send message", async function ({ user_id, resever_id, message }) {
      try {
        console.log("mesage message",message)
        io.to(users[user_id]).emit('send message', { user_id, resever_id, message });
        if (user_id == senderAndResever[resever_id]) {
          io.to(users[senderAndResever[user_id]]).emit('send message', { user_id, resever_id, message });
        }
        const mesres = await insertMessage(message, user_id, resever_id)
        console.log("mesage res",mesres)
      } catch (error) {
        console.error('Error sending message:', error);
      }
    })

    socket.on("disconnect", () => {
      const keyToRemove = Object.keys(users).find(key => users[key] === socket.id);
      if (keyToRemove) {
        delete users[keyToRemove];
        delete senderAndResever[keyToRemove]
      }
    })
  })
}