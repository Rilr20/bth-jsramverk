import React, { useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";

export default function Editor() {
    const [documentId, setDocumentId] = useState(null);
    const [documents, setDocuments] = useState([]);
    const editor = document.getElementsByClassName('textEditor')
    const [fileNameInput, setFileNameInput] = useState(document.getElementById('filename'))
    useEffect(() => {
        setFileNameInput(document.getElementById('filename'))
        console.log(fileNameInput);
        const fetchData = () => {
            return fetch("https://jsramverk-editor-rilr20a.azurewebsites.net/docs")
                .then((response) => response.json())
                .then((data) => (setDocuments(data)));
        }
        fetchData()
    }, []);
    function saveFile() {
        console.log(editor[0].innerText)
        let text = editor[0].innerText
        let title
        if (documentId === null) {
            //spara ny fil
            title = fileNameInput.value

            let data = { title, text }
            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/docs', requestOptions)
            .then(repsonse => repsonse.json())
            .then(res => console.log(res))

            console.log("wow new file");
        } else {
            //spara över gammal
            // let documentFromId = findId(documentId)
            // title = documentFromId.title
            title = fileNameInput.value

            console.log(documentId);
            let data = { title: title, text: text, id: documentId }
            console.log(data);
            let requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            fetch(`https://jsramverk-editor-rilr20a.azurewebsites.net/docs/${documentId}`, requestOptions)
                .then(repsonse => repsonse.json())
                .then(res => console.log(res))

                console.log("old file time to rewrite");
        }
    }
    function findId(id) {
        let returnValue = null
        documents.forEach(document => {
            if (document._id === id) {
                returnValue = document
            }
        });
        return returnValue
    }
    function changeTextEditor(documentId) {
        setDocumentId(documentId);
        let documenter = findId(documentId)
        console.log(documenter);
        try {
            fileNameInput.value = documenter.title 
            editor[0].innerText = documenter.text
            
        } catch (error) {
            fileNameInput.value = null
            editor[0].innerText = null
        }
    }
    return (
        <div className='container'>
            <h1>Editor</h1>
            <div className='toolbar'>
                <h2>Toolbar </h2>
                <ul>
                    <div><input id="filename" placeholder='filename'></input> <button onClick={saveFile}>Save</button></div>
                    {/* <li></li>
                        <li>Delete</li>
                        <li>Etc</li> */}
                </ul>
            </div>
            <div className='toolbar'>
                <h2>Documents</h2>
                <div className='document-list'>
                    <button onClick={() => { changeTextEditor(null) }}>New Document</button>
                    {
                        documents.map((document) => {
                            return <button key={document._id} onClick={() => { changeTextEditor(document._id) }}>{document.title}</button>
                        })
                    }
                </div>
            </div>

            <p>Document id: {documentId === null ? "New File" : documentId}</p>
            <TrixEditor className='textEditor' />
        </div>
    );
}
