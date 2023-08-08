import React from 'react'
import {Avatar, Image} from 'antd'

export default function ChatBoxReceiver({avatar,user,message}) {
  return (
    <div style={{display:'flex',justifyContent:'flex-start',flexDirection:'row', marginLeft:"10px",
    paddingTop:"30px"
    }} >
        <Avatar
         size={50}
         src={
             <Image
             src={avatar}
             style={{
                 objectFit:'cover',
                 width:'50',
                 height:'50',
                 borderRadius:'100%'
             }}
             preview={false}
             />}
        />
           
        <p style={{padding:20, backgroundColor:"pink", borderRadius:10, maxWidth:"60%"}}>
            <strong style={{fontSize:25}}>
                {user}
            </strong> <br></br>
            {message}
        </p>
        
        </div>
  )
}
export  function ChatBoxSender({avatar,user,message}) {
    return (
      <div style={{display:'flex',justifyContent:'flex-end',flexDirection:'row', marginRight:"10px"}} >
          <Avatar
           size={50}
           src={
               <Image
               src={avatar}
               style={{
                   objectFit:'cover',
                   width:'50',
                   height:'50',
                   borderRadius:'100%'
               }}
               preview={false}
               />}
          />
             
          <p style={{padding:20, backgroundColor:"yellow", borderRadius:10, maxWidth:"60%"}}>
              <strong style={{fontSize:25}}>
                  {user}
              </strong> <br></br>
              {message}
          </p>
          
          </div>
    )
  }


  
