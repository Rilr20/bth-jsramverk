import React, { useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import { fetchData } from '../components/editorData';
import { findId } from '../components/EditorHelper';

export default function Editor() {
    const [documentId, setDocumentId] = useState(null);
    const [documents, setDocuments] = useState([]);
    const editor = document.getElementsByClassName('textEditor')
    const [fileNameInput, setFileNameInput] = useState(document.getElementById('filename'))
    useEffect(() => {
        setFileNameInput(document.getElementById('filename'))
        console.log(fileNameInput);

        fetchData(setDocuments)
    }, []);
    async function saveFile() {
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

            const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/docs', requestOptions)
            const body = await response.text()
            console.log(body)
            if (response.status === 201) window.location.reload()
            else if (response.status !== 201) throw Error(body.message)
            // .then(repsonse => repsonse.json())
            // .then(res => console.log(res))
            // .then(window.location.reload())

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

            const response = await fetch(`https://jsramverk-editor-rilr20a.azurewebsites.net/docs/${documentId}`, requestOptions)
            // .then(repsonse => repsonse.json())
            // .then(res => console.log(res))
            // .then(window.location.reload())
            const body = await response.text()
            console.log(body)
            if (response.status === 204) window.location.reload()
            else if (response.status !== 204) throw Error(body.message)
            // console.log("old file time to rewrite");
        }
    }

    function changeDocument(documentId) {
        setDocumentId(documentId);
        let documenter = findId(documents, documentId)
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
            <div className='toolbar'>
                {/* <h2>Toolbar </h2> */}
                <div className='tools'>
                    <div className='document-list'>
                        <input className='filename' id="filename" placeholder='filename'></input>
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

            <TrixEditor className='textEditor' placeholder='Dags att börja skriva' />
            <p>Document id: {documentId === null ? "New File" : documentId}</p>
        </div>
    );
}
