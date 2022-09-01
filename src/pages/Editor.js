import React, { Component, useState, useEffect } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";

export default function Editor() {
    const [documentId, setDocumentId] = useState(null);
    function saveFile() {
        let editor = document.getElementsByClassName('textEditor')
        console.log(editor[0].innerText)
        if (documentId === null) {
            //spara ny fil
            console.log("wow new file");
        } else {
            //spara över gammal
            console.log("old file time to rewrite");
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
                <ul>
                    <button onClick={()=> {setDocumentId("variable that should be here from the api")}}>Document Title</button>
                </ul>
            </div>
            <p>Document id: {documentId === null ? "New File" : documentId}</p>
            <TrixEditor className='textEditor' />
        </div>
    );
}
