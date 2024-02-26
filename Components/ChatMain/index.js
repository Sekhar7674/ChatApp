'use client'
import axios from "axios";
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import io from "socket.io-client";

const Contacts = dynamic(() => import("../Contacts"), { ssr: false });
const MessageList = dynamic(() => import("../MessageList"), { ssr: false });
const InfoBar = dynamic(() => import("../InfoBar"), { ssr: false });
const Input = dynamic(() => import("../Input"), { ssr: false });
const DefaultChat = dynamic(() => import("../DefaultChat"), { ssr: false });

export default ({ user }) => {
  const [contacts, setContacts] = useState([])
  const [messages, setMessages] = useState([])
  const [resever, setResver] = useState(null)
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState(null);

  const socketInisilezer = async () => {
    try {
      let response = await fetch("/api/socket")
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newSocket = io();
      if (newSocket) {
        setSocket(newSocket);
        newSocket.emit("setUser", { user_id: user.id });
        newSocket.emit("get contacts", { user_id: user.id });
        newSocket.on("get contacts", async function ({ contacts }) {
          setContacts(contacts || [])
        })
        newSocket.on("send message", async function ({ user_id, resever_id, message }) {
          setMessages(m => [...m, { name: user.name, message: message, sender: user_id,resever:resever_id }])
        })
      } else {
        console.error("Socket initialization failed: socket is null");
      }
      return newSocket;
    }
    catch (error) {
      console.error("Error initializing socket:", error);
      return null;
    }
  }

  useEffect(() => {
    var socket2;
    const initialize = async () => {
      socket2 = await socketInisilezer();
    };
    initialize();
    return () => {
      if (socket2) {
        socket2.disconnect();
      }
    };
  }, [])

  useEffect(() => {
    socket?.emit("setResever", { user_id: user.id, resever: resever.id });
  }, [resever])
  1
  const sendMessage = () => {
    socket.emit('send message', { user_id: user.id, resever_id:resever.id, message })
    setMessage('')
  }

  return <>
    <div className="chat">
      <Contacts contacts={contacts} setResver={setResver} resever={resever} />
      {resever ? <div className="chatBox">
        <InfoBar resever={resever} />
        <MessageList className='messages' messages={messages} user={user} />
        <Input className='chat_input' message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div> : <DefaultChat className="chatBox" />}
    </div>
  </>
}