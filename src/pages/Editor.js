import React, { useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import "trix/dist/trix.css";
// import { fetchData } from '../components/editorData';
import { findId } from '../components/EditorHelper';
import { io } from "socket.io-client";
import Permission from '../components/Permission';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import jsPDF from "jspdf";


let sendToSocket = false;

function changeSendToSocket(value) {
    sendToSocket = value;
}

export default function Editor({ token, setToken, email, setEmail }) {
    const [documents, setDocuments] = useState([]);
    const editor = document.getElementsByClassName('textEditor')
    const fileNameInput = document.getElementById('filename')
    const [formInput, updateFormInput] = useState({ _id: null, title: '', text: '', email: email, code: false, write: true })
    const [socket, setSocket] = useState(null);
    const [useSocket, setUseSocket] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        (async () => {
            console.log("run");
            console.log(email);
            // await fetchData(setDocuments, token)
            const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `{docsbyemail(email:"${email}") { _id text title code }}`
                })
            });
            const result = await response.json();
            setDocuments(result.data.docsbyemail === null ? [] : result.data.docsbyemail)
        })();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setSocket(io(""))

        return () => {
            if (socket) {
                console.log("disconnects");
                socket.disconnect()
            }
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.log("socket");
        if (socket) {
            socket.on("doc", function (data) {
                // console.log(data);
                changeSendToSocket(false)
                if (editor[0].innerText !== data.text) {
                    editor[0].innerText = data.text
                }
            })
        }
    }, [socket]);// eslint-disable-line react-hooks/exhaustive-deps

    function emitToSocket() {
        console.log("tja");

        if (socket && sendToSocket && useSocket) {
            console.log("socket time");
            socket.emit("doc", { _id: formInput._id, text: formInput.text })
        }
        changeSendToSocket(true)

    }

    /**
     * Saves a new file or to an existing one
     */
    async function saveFile() {
        console.log(editor[0].innerText)
        let text = formInput.text
        let title = formInput.title
        let email = formInput.email
        let code = formInput.code
        let write = formInput.write
        if (formInput._id === null) {
            //spara ny fil

            let data = { title, text, email, code, write }
            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/docs', requestOptions)
            /*const body = */await response.text()
            console.log(response);
            if (response.status === 201) {
                setOpen(true)
                setTimeout(() => setOpen(false), 5000);
            }
            // if (response.status === 201) window.location.reload()
            // else if (response.status !== 201) throw Error(body.message)

            console.log("wow new file");
        } else {
            //spara över gammal

            console.log(formInput._id);
            let data = { title: title, text: text, id: formInput._id }
            console.log(data);
            let requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            const response = await fetch(`https://jsramverk-editor-rilr20a.azurewebsites.net/docs/${formInput._id}`, requestOptions)
            /*const body = */await response.text()
            console.log(response);
            if (response.status === 204) {
                setOpen(true)
                setTimeout(() => setOpen(false), 5000);
            }
            // if (response.status === 204) window.location.reload()
            // else if (response.status !== 204) throw Error(body.message)
        }
    }
    /**
     * fetches a document with the id, and updates form and UI 
     * @param {string} documentId 
     */
    function changeDocument(documentId) {
        updateFormInput({ ...formInput, id: documentId })
        let document = findId(documents, documentId)
        console.log(document);
        try {
            setUseSocket(true)
            updateFormInput({ ...document })
            socket.emit("create", documentId);
            console.log(fileNameInput);
            fileNameInput.value = document.title
            console.log(document);
            console.log(document.title);
            setValue(document.text)
            
            // editor[0].dangerouslySetInnerHTML = document.text

        } catch (error) {
            setUseSocket(false)
            fileNameInput.value = null
            setValue(null)
            // editor[0].dangerouslySetInnerHTML = null
        }
    }
    /**
     * changes the text in formInput
     * @param {string} html 
     * @param {string} text 
     */
    function handleChange(html, action) {
        setValue(html)
        const copy = Object.assign({}, formInput);

        copy.text = html;
        updateFormInput(copy);

    }
    function printPDF() {
        const pdf = new jsPDF('p', 'pt', 'a4');;
        pdf.setFont("helvetica");
        console.log(formInput);
        pdf.html(document.querySelector('.ql-editor'), {
            callback: function (doc) {
                doc.save(`${fileNameInput.value}.pdf`);
            }
        });
    }

    return (
        <div className='container'>
            {token === "" ? <h1>Login to access this page</h1> :
                <>
                    <div className='toolbar'>
                        <div className='tools'>
                            <div className='document-list'>
                                <input className='filename' id="filename" placeholder='title' name="title" onChange={(e) => { updateFormInput({ ...formInput, title: e.target.value }) }}></input>
                                <button className='filename-btn' onClick={saveFile}>Save</button>
                                <button className='filename-btn' onClick={printPDF}>get pdf</button>
                            </div>
                            <div data-testid="document-list" className='document-list'>

                                <select className='dropdown-documents'>
                                    <option autoFocus>Switch Between Documents</option>
                                    {
                                        documents.map((document) => {
                                            // console.log(document);
                                            // if (document.email === email) {
                                            return <option className='existing-document' key={document._id} onClick={() => { changeDocument(document._id) }}>{document.title}</option>
                                            // }
                                        })

                                    }
                                </select>
                                <button className='new-document' onClick={() => { changeDocument(null) }}>New Document</button>
                            </div>
                        </div>
                    </div>
                    <Permission />
                    <div onKeyUp={emitToSocket}>
                        <ReactQuill value={value} onChange={handleChange} name="text" className='textEditor' id='textEditor' placeholder='Dags att börja skriva' />
                    </div>
                    <h1>{open ? "document saved" : ""}</h1>
                    <p>Document id: {formInput._id === null ? "New File" : formInput._id}</p>
                    <p>text:{formInput.text}</p>
                    <p>title:{formInput.title}</p>
                </>
            }
        </div>
    );
}
