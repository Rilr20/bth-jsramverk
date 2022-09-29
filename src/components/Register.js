import React, { useState, useEffect } from 'react'
import authHelper from './authHelper';


export default function Registeraccount({ onChange }) {
    const [formInput, updateFormInput] = useState({ email: '', password: '' })
    const [open, setOpen] = useState(false);
    function onChange(e) {
        let newObject = {};
        newObject[e.target.name] = e.target.value;

        console.log(newObject);
        updateFormInput({ ...formInput, ...newObject });
    };
    async function registerButton() {
        let res = await authHelper.register(formInput);
        
        console.log("res");
        console.log(res.data.insertedId);
        if(res.data.insertedId) {
            setOpen(true)
        }
    }
    return (
        <div className='form'>
            <h1 className='form-header'>Register</h1>
            <div className='form-inputs' onSubmit={() => {
                console.log();
            }}>
                <div className='input'>
                    <label for="email">Email Address</label>
                    <input onChange={onChange} type="text" id="email" name="email" placeholder='email'></input>
                </div>
                <div className='input'>
                    <label for="password">Your password</label>
                    <input onChange={onChange} type="password" id="password" name="password" placeholder='password'></input>
                </div>
                <div className='input-button '>
                    <button className='register' onClick={registerButton}>Register</button>
                </div>
                {open ? <>You registered a new account</> : <></>}
            </div>
        </div>
    )
}
