import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from "socket.io-client";
import ChatBoxReceiver, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';
import {
    doc,
    setDoc,
    collection,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
  
  } from 'firebase/firestore';
  import db from "./firebaseConfig/firebaseConfig.js"


export default function ChatContainer() {
  
    let socketio  = socketIOClient("http://localhost:6001")
    const [chats , setChats] = useState([])
    const [user, setUser] = useState(localStorage.getItem("user"))
    const avatar = localStorage.getItem('avatar')
    const chatsRef = collection(db , "Messages")
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }    

    useEffect(() => {
      scrollToBottom()
    }, [chats])

    useEffect(()=> {
        socketio.on('chat', senderChats => {
            setChats(senderChats)
        })
    })


    useEffect(()=>{

        const q = query(chatsRef , orderBy('createdAt' , 'asc'))
      
        const unsub = onSnapshot(q, (querySnapshot) =>{
          const fireChats =[]
          querySnapshot.forEach(doc => {
            fireChats.push(doc.data())
          });
         setChats([...fireChats])
        })
        return ()=> {
          unsub()
        }
      
      },[])

     function addToFirebase(chat){
        const newChat = {
            avatar,
            createdAt: serverTimestamp(),
            user,
            message: chat.message
        }

        const chatRef = doc(chatsRef)
        setDoc(chatRef , newChat)
        .then(()=> console.log('Chat added succesfully'))
        .catch(console.log)
     } 
   

    function sendChatToSocket(chat){
        socketio.emit("chat" , chat)
    }

    function addMessage(chat){
        const newChat = {...chat , user:localStorage.getItem("user") , avatar}
        addToFirebase(chat)
        setChats([...chats , newChat])
        sendChatToSocket([...chats , newChat])
    }

    function handleLogout(){
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
        setUser("")   
    }
  function ChatsList(){
    return  (<div>
    {
      chats.map((chat,index)=>{
        if(chat.user === user) return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user}/>
        return <ChatBoxReceiver key={index} message={chat.message}  avatar={chat.avatar} user={chat.user}/>
      })
    }
  </div>)
  }

  return (
    <div>
     {
      user ? 
      <div>
          <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
            <h4 style={{color:"white"}}> Username:{user}</h4>
            
            <p style={{color:"red", cursor:"pointer"}} onClick={()=>handleLogout()}>Logout</p>
          </div>
          <ChatsList/>
          <InputText addMessage={addMessage} />
      </div>
      :<UserLogin setUser={setUser}/>
     }
    </div>
  )
}
