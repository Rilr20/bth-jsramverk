import React, { useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import "trix/dist/trix.css";
import { fetchData } from '../components/editorData';
import { findId } from '../components/EditorHelper';
import { io } from "socket.io-client";

// let sendToSocket = false;

export default function Editor() {
    const [documents, setDocuments] = useState([]);
    const editor = document.getElementsByClassName('textEditor')
    const fileNameInput = document.getElementById('filename')
    let updateCurrentDocOnChange = false;
    const [formInput, updateFormInput] = useState({_id:null, title: '', text: '' })
    const [socket, setSocket] = useState(null);
    // const [documentText, setText] = useState({_id: null, text:"text"})
    useEffect(() => {
        (async () => {
            console.log("run");
            await fetchData(setDocuments)
        })();
    }, []);

    useEffect(() => {
        setSocket(io("http://localhost:1337"))


        return () => {
            if (socket) {
                console.log("disconnects");
                socket.disconnect()
            }
        }
    }, []);
    useEffect(() => {
        console.log("socket");
        if(socket) {
            socket.on("doc", function (data) {
                console.log(data);
                editor[0].innerText = data.text
            })
        }
    }, [socket]);

    useEffect(() => {
        console.log("tja");

        if (socket) {
            console.log("socket time");
            socket.emit("doc", {_id: formInput._id, text: formInput.text})
        }
        // if (socket) {
        //     console.log("socket");
        //     socket.on("doc", function (data) {
        //         console.log(data);
        //         editor[0].innerText = data.text
        //     })
        // }
    }, [formInput]);

    /**
     * Saves a new file or to an existing one
     */
    async function saveFile() {
        console.log(editor[0].innerText)
        let text = formInput.text
        let title = formInput.title
        if (formInput._id === null) {
            //spara ny fil

            let data = { title, text }
            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            const response = await fetch('127.0.0.1:1337/docs', requestOptions)
            const body = await response.text()

            if (response.status === 201) window.location.reload()
            else if (response.status !== 201) throw Error(body.message)

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

            const response = await fetch(`http://localhost:1337/docs/${formInput._id}`, requestOptions)
            const body = await response.text()

            if (response.status === 204) window.location.reload()
            else if (response.status !== 204) throw Error(body.message)
        }
    }
    /**
     * fetches a document with the id, and updates form and UI 
     * @param {string} documentId 
     */
    function changeDocument(documentId) {
        updateFormInput({...formInput, id: documentId})
        let document = findId(documents, documentId)
        try {
            updateFormInput({...document})
            socket.emit("create", documentId);
            console.log(fileNameInput);
            fileNameInput.value = document.title
            editor[0].innerText = document.text

        } catch (error) {
            fileNameInput.value = null
            editor[0].innerText = null
        }
    }
    /**
     * changes the text in formInput
     * @param {string} html 
     * @param {string} text 
     */
    function handleChange(html, text) {
        if (updateCurrentDocOnChange) {
            const copy = Object.assign({}, formInput);

            copy.text = text;
            updateFormInput(copy);
        }

        updateCurrentDocOnChange = true;
        // updateFormInput({ ...formInput, text: text })
    }

    return (
        <div className='container'>
            <div className='toolbar'>
                <div className='tools'>
                    <div className='document-list'>
                        <input className='filename' id="filename" placeholder='title' name="title" onChange={(e) => { updateFormInput({ ...formInput, title: e.target.value })}}></input>
                        <button className='filename-btn' onClick={saveFile}>Save</button>
                    </div>
                    <div data-testid="document-list" className='document-list'>
                        
                        <select className='dropdown-documents'>
                            <option autoFocus>Switch Between Documents</option>
                            {
                                documents.map((document) => {
                                    return <option className='existing-document' key={document._id} onClick={() => { changeDocument(document._id) }}>{document.title}</option>
                                })
                            }
                        </select>
                        <button className='new-document' onClick={() => { changeDocument(null) }}>New Document</button>
                    </div>
                </div>
            </div>

            <TrixEditor  onChange={handleChange} name="text" className='textEditor' placeholder='Dags att börja skriva' />
            <p>Document id: {formInput._id === null ? "New File" : formInput._id}</p>
            <p>text:{formInput.text}</p>
            <p>title:{formInput.title}</p>
        </div>
    );
}
