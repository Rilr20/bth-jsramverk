import React, { useState } from 'react'
import authHelper from './authHelper';

export default function Login({ setToken, setEmail }) {
    const [formInput, updateFormInput] = useState({ email: '', password: '' })
    const [info, setInfo] = useState('')
    function onChange(e) {
        let newObject = {};
        newObject[e.target.name] = e.target.value;

        console.log(newObject);
        updateFormInput({ ...formInput, ...newObject });
    };
    async function loginButton() {
        setInfo('')
        const loginResult = await authHelper.login(formInput);
        console.log(loginResult);
        if (loginResult.errors) {
            console.log(loginResult.errors);
            setInfo(loginResult.errors)
        } else if(loginResult.data.token) {
            setInfo({ msg: "you successfully logged in!" })
            setToken(loginResult.data.token)
            setEmail(loginResult.data.email)
        }
    }

    return (
        <div className='form'>
            <h1 className='form-header'>Login </h1>
            <div className='form-inputs'>
                <div className='input'>
                    <label for="email">Email Address</label>
                    <input onChange={onChange} type="text" id="email" name="email" placeholder='email'></input>
                </div>
                <div className='input'>
                    <label for="password">Your password</label>
                    <input onChange={onChange} type="password" id="password" name="password" placeholder='password'></input>
                </div>
                <div className='input-button'>
                    <button className='login' onClick={loginButton}>Login</button>
                </div>
                {info ? <>{info.msg}</> : <></>}
            </div>
        </div>
    )
}
