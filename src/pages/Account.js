import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

export default function Account() {
    const [register, setRegister] = useState(false);
    return (
        <div className='container'>
            <div>
                <h1>Register or Login</h1>
                <button onClick={() =>{ setRegister(!register)}}>{!register ? "Register" : "Login"}</button>
            </div>
            {register ? <Register /> : <Login />}
        </div>
    )
}
