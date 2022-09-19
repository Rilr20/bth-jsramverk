import React, { useState, useEffect } from 'react';


export default function Irc() {
    const [formInput, updateFormInput] = useState({ _id: null, username: '', text: '', date: '' })
    useEffect(() => {
        let scroll_to_bottom = document.getElementById('irc-text');
        scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
    }, []);
    return (
        <div className='container'>
            <h1>En IRC testchat</h1>
            <form onSubmit={(e) => { e.preventDefault(); updateFormInput({ ...formInput, username: e.target.elements.username.value }); console.log(e.target.elements.username.value);}}>
                <input className='filename' id="filename" placeholder='username' name="username" ></input>
                <button disabled={formInput.username === '' ? false : true} style={{ padding: "0.5em" }} type="submit">Send</button>
            </form>
            <div id="irc" className='irc' style={{ backgroundColor: "orange", width: "80%", height: "300px", marginLeft: "auto", marginRight: "auto", paddingTop: "2em", paddingBottom: "1em" }}>
                <div id="irc-text" style={{ backgroundColor: "grey", width: "90%", height: "200px", marginLeft: "auto", marginRight: "auto", paddingTop: "2em", overflowY: "scroll", paddingBottom: "1em", marginBottom: "0.5em", scrollSnapAlign: "end" }}>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                    <p style={{ marginLeft: "2em", marginRight: "2em" }}>2021-02-06 12:42:16 | Jonas: Hej</p>
                </div>
                <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto", width: "90%", justifyContent: "space-around" }}>
                    <input style={{ width: "90%", display: "block", padding: "1em" }} className='filename' id="filename" placeholder='text' name="text" onChange={(e) => { updateFormInput({ ...formInput, text: e.target.value }) }} ></input>
                    <button disabled={formInput.username === '' ? true : false} style={{ padding: "0.5em" }}>Send</button>
                </div>
            </div>

            <p>text:{formInput.text}</p>
            <p>username:{formInput.username}</p>
        </div>
    );
}
