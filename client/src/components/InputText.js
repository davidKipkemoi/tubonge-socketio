import React, { useState } from 'react'
import { Button } from 'antd';

const styles={
  button: {
    width:'10%' ,
    height:50 ,
    fontWeight:'bold', 
    borderRadius:10 ,
    fontSize:18 ,
    backgroundColor:'#34b7f1',
    borderWidth:0,
    color:'#fff'
  },
  textarea:{ 
     width:'60%' ,
     height:50 ,
     borderRadius:10, 
     borderWidth:0 , 
     padding:10 , 
     fontSize:18,
     marginTop:"100px",
    },
  textContainer:{
    display:"flex", 
    justifyContent:'space-evenly', 
    alignItems:'center'}
}
export default function InputText({addMessage}) {
  const [message,setMessage] = useState('')

  function addAMessage(){
    addMessage({
      message
    })
    setMessage("")
  }

  return (
    <div style={styles.textContainer}>
      <textarea
      style={styles.textarea}
      rows={8}
      placeholder='Enter Message...'
      value={message}
      onChange={e=>setMessage(e.target.value)}
    
      >
      </textarea>
      <Button ghost style={{ width:'10%' ,
   marginTop:"120px",
   height:50 ,
    fontWeight:'bold', 
    borderRadius:10 ,
    fontSize:18 ,}}
      // style={styles.button}
      onClick={()=>addAMessage()}
      >
          Send
      </Button>
    </div>
  )
}
