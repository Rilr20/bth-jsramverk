import React from 'react'

export default function Register() {
    return (
        <div>
            <h1>Register Form</h1>
            <form>
                <label for="email">Email Address</label>
                <input type="text" id="email" name="email" placeholder='email'></input>
                <label for="password">Your password</label>
                <input type="text" id="password" name="password" placeholder='password'></input>
            </form>
        </div>
    )
}
let obj1 = {
    _id: "",
    title: "",
    text: "",
    user: [
        {
            _id: "",
            permission: ""
        }
    ]
}

let user = {
    _id: "",
    email: "",
    password: "",
    docs: [{
        _id: "",
        permission: ""
    },
    {
        _id: "",
        permission: ""
    },
    {
        _id: "",
        permission: ""
    },
    {
        _id: "",
        permission: ""
    },
    ]
}
let doc = {
    _id: "",
    title: "",
    text: "",
    code: false,
    creator: "user_id",
    users: [
        {
            _id: "",
            permission: ""
        }
    ]
}