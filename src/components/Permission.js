import React, { useState } from 'react'

export default function Permission({ documentId, userEmail, documentTitle }) {
    const [formInput, setFormInput] = useState({ email: "" });
    const [open, setOpen] = useState(false);
    async function sendEmail() {
        console.log("nu ska det skickas ett email till användaren");
        let res = emailCheck(formInput.email);
        if (res) {
            //send email = receiver
            // receiver = req.body.receiver; //to email
            // documentId = req.body.documentId; // id of document
            // documentTitle = req.body.documentTitle; //title of document
            // sender = req.body.sender; //user here
            const data = {
                receiver: formInput.email,
                documentId: documentId,
                documentTitle: documentTitle,
                sender: userEmail
            }
            console.log(data);
            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }
            const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/email/send', requestOptions)
            console.log(response);
            setOpen(true);
            setTimeout(() => setOpen(false), 5000);
        }
    }
    function emailCheck(email) {
        emailCheck = new RegExp('^.*@[a-z].*\..*');
        return emailCheck.test(email);
    }
    return (
        <div>
            <input  type="text" id="email" name="email" placeholder='invite' onChange={(e) => { setFormInput({ ...formInput, email: e.target.value }) }}></input>
            {/* <select>
                <option>Read</option>
                <option>Write</option>
            </select> */}
            <button style={{ marginLeft: "0.5em" }} onClick={sendEmail}>Invite</button>
            {open ? <div style={{ display: "inline", marginLeft:"0.5em" }}><p style={{ display: "inline" }}>Invite Sent to {formInput.email}</p></div> : <></>}
            
        </div>
    )
}
