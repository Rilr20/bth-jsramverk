import React from 'react'

export default function Registeraccount() {
    return (
        <div>
            <h1>Register</h1>
            <form style={{ display: "flex", flexDirection: "column", margin: "auto", width: "30%" }}>
                <div>
                    <label for="email">Email Address</label>
                    <input type="text" id="email" name="email" placeholder='email'></input>
                </div>
                <div>
                    <label for="password">Your password</label>
                    <input type="text" id="password" name="password" placeholder='password'></input>
                </div>
                <div>
                    <button type='submit'>Register</button>
                </div>
            </form></div>
    )
}
