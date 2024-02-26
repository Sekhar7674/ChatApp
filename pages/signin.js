'use client'

import { IconButton, InputBase } from '@mui/material';
import { Lock, PhoneAndroid } from '@mui/icons-material';
import axios from 'axios';
import React from 'react';
import { handleLogin } from '@/utils/auth';
export default () => {

  const [user, setUser] = React.useState({})
  const changeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const login = () => {
    axios.post('/api/login', user).then(res => {
      handleLogin(res.data.user_token)
    }).catch(e => {
      console.log(e)
    })
  }
  return <>
    <div className="login-top">
      <div className="eclipes-1">
      </div>
      <div className="eclipes-2">
      </div>

      <div className="login-heading">
        <h2 className="heading-large"
        >Go ahead and set up your account</h2>
        <p className="heading-small"
        >Sign in-up to enjoy the best managing experience</p>
      </div>
    </div>
    <div className="login-btm">
      <div className="inputs">
        <img src='/images/logo.jpg' className='logo' />
        <div className="login-input " >
          <IconButton disabled sx={{ p: '10px' }}>
            <PhoneAndroid color='info'  />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Mobile No"
            name='mobile'
            onInput={(event) => {
              const inputValue = event.target.value;
              const validChars = /^[6-9]/;
              if (!validChars.test(inputValue)) {
                event.target.value = inputValue.slice(0, -1);
              } else
                event.target.value = inputValue.replace(/[^0-9]/g, '').slice(0, 10);
            }}
            onChange={changeUser}
          />
        </div>
        <div className="login-input ">
          <IconButton disabled sx={{ p: '10px' }}>
            <Lock color='info' />
          </IconButton>
          <InputBase
            type='password'
            name='password'
            sx={{ ml: 1, flex: 1 }}
            placeholder="Password"
            onChange={changeUser}
          />
        </div>
        <div className="forget-psw">
          <label>
            <input type="checkbox" />
            <span className='remember-me-text'>
              Remember me
            </span>
          </label>
          <a>
            <span className='forgot-pwd-text' >Forget password?</span>
          </a>
        </div>
        <button onClick={login} className="login-btn"><span className='heading-medium-white'>
          Login
        </span>
        </button>
      </div>
    </div>
  </>
}
