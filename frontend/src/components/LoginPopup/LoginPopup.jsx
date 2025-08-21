import React, { useContext } from 'react'
import './LoginPopup.css'
import { useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onLogin = async(event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState==="Login"){
      newUrl+="/api/user/login"
    }
    else {
      newUrl+="/api/user/register"
    }

    const res = await axios.post(newUrl,data);
    if (res.data.success){
      setToken(res.data.token);
      localStorage.setItem("token",res.data.token);
      setShowLogin(false);
    }
    else{
      alert(res.data.message)
    }
  }
  
  const onChangeHandler = async(event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({...data,[name]:value});
  }


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => {setShowLogin(false)} } src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
            {currState==="Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your Name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder= 'Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>

        <button type='Submit'>{currState==="Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing I agree to the terms of use and Privacy Policy.</p>
        </div>

        {currState==="Login" 
        ? <p>Create a new account? <span onClick={() => {setCurrentState("Sign Up")}}>Click here</span></p> 
        : <p>Already have an account? <span onClick={() => {setCurrentState("Login")}}>Login here</span></p>}

      </form>
    </div>
  )
}

export default LoginPopup
