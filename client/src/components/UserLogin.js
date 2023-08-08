import React, { useState } from 'react'
import { Input,Button } from 'antd';
import _ from 'lodash'


export default function UserLogin({setUser}) {
  const [user,setAUser] = useState('')
    function handleSetUser(){
      if(!user) return
      localStorage.setItem("user",user)
      setUser(user)
      localStorage.setItem("avatar",`https://picsum.photos/id/${_.random(1, 1000)}/200/300`)
      
    }
  return (
    <div style={{padding:10,height:"100vH"}}>
      <div >
      <img style={{}} 
      alt=""/>
      <h1 style={{background:"black",color:"white",textAlign:'center'}}> Enter Your Username</h1>
      </div>
      <div style={{display:'flex' ,justifyContent:'center', padding:10}}>
      <Input 
      
      style={{ height:50, width:'50%', margin:20}}
      value={user}
      onChange={e=>setAUser(e.target.value)}
      placeholder="Enter Username" />
      <Button ghost style={{ width:'10' ,
      paddingLeft:"10px",
      height:80 ,
     fontWeight:'bold', 
    borderRadius:10 ,
    fontSize:18 ,}}
      // style={styles.button}
      onClick={()=>handleSetUser()}
      >
          Login
      </Button>
      </div>
    </div>
  )
}
