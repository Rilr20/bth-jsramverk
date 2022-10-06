import React, { useEffect, useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

export default function Account({token, setToken, email, setEmail}) {
    const [register, setRegister] = useState(false);
    const [formInput, updateFormInput] = useState({ _id: null, title: '', text: '' });
    useEffect(() => {
        console.log("SDFAHASJFHAJSLf");
        console.log(token);
    }, [token]);
    function onChange(e) {
        let newObject = {};
        newObject[e.target.name] = e.target.value;
        
        console.log(newObject);
        updateFormInput({ ...formInput, newObject });
    };

    return (
        <div className='container'>
            <div>
                <h1>Account Page</h1>
                <button className='button' onClick={() =>{ setRegister(!register)}}>{!register ? "Register" : "Login"}</button>
            </div>
            {register ? <Register onChange={onChange} /> : <Login setToken={setToken} onChange={onChange} setEmail={setEmail}/>}
        </div>
    )
}
