import React, { useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import "trix/dist/trix.css";
import { fetchData } from '../components/editorData';
import { findId } from '../components/EditorHelper';
import { io } from "socket.io-client";

let sendToSocket = false;

export default function Editor() {
    const [documents, setDocuments] = useState([]);
    const editor = document.getElementsByClassName('textEditor')
    const fileNameInput = document.getElementById('filename')
    const [formInput, updateFormInput] = useState({_id:null, title: '', text: '' })
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (documents.length === 0) {
            console.log("run");
            fetchData(setDocuments)
        }
    }, []);

    useEffect(() => {
        setSocket(io("127.0.0.1:1337"))
        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, []);
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

            const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/docs', requestOptions)
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

            const response = await fetch(`https://jsramverk-editor-rilr20a.azurewebsites.net/docs/${formInput._id}`, requestOptions)
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
        updateFormInput({ ...formInput, text: text })
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

            <TrixEditor onChange={handleChange} name="text" className='textEditor' placeholder='Dags att börja skriva' />
            <p>Document id: {formInput._id === null ? "New File" : formInput._id}</p>
            <p>text:{formInput.text}</p>
            <p>title:{formInput.title}</p>
        </div>
    );
}
