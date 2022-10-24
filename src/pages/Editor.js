import React, { useState, useEffect } from 'react'
// import { fetchData } from '../components/editorData';
import { findId } from '../components/EditorHelper';
import { io } from "socket.io-client";
import Permission from '../components/Permission';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import jsPDF from "jspdf";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Console from '../components/Console';
import { execCode } from '../components/editorData';
import Comments from '../components/Comments';
import html2canvas from 'html2canvas';
let sendToSocket = false;

function changeSendToSocket(value) {
    sendToSocket = value;
}

export default function EditorPage({ token, setToken, email, setEmail }) {
    window.html2canvas = html2canvas;
    const [documents, setDocuments] = useState([]);
    const editor = document.getElementsByClassName('textEditor')
    const fileNameInput = document.getElementById('filename')
    const [formInput, updateFormInput] = useState({ _id: '', title: '', text: '', email: email, code: false, write: true })
    const [documentId, setdocumentId] = useState("");
    const [documentTitle, setDocumentTitle] = useState("");
    const [socket, setSocket] = useState(null);
    const [useSocket, setUseSocket] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [consoleVal, setConsoleVal] = useState("");
    const [selectedText, setSelectedText] = useState("");
    const [innerText, setInnerText] = useState("");

    useEffect(() => {
        (async () => {
            // console.log("run");
            // console.log(email);
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
            // console.log(result);
            setDocuments(result.data.docsbyemail === null ? [] : result.data.docsbyemail)
        })();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    
    useEffect(() => {
        console.log("tja mannen");
        setSocket(io("https://jsramverk-editor-rilr20a.azurewebsites.net/"))

        // return () => {
            if (socket) {
                console.log("disconnects");
                socket.disconnect()
            }
        // }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        console.log("socket");
        if (socket) {
            socket.on("doc", function (data) {
                // console.log(data);
                changeSendToSocket(false)
                if (value !== data.text) {
                    setValue(data.text)
                }
            })
        }
    }, [socket]);// eslint-disable-line react-hooks/exhaustive-deps

    function emitToSocket() {
        console.log("tja");
        // console.log(socket !== null);
        // console.log(sendToSocket);
        // console.log(useSocket);
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
        // console.log(editor[0].innerText)
        let text = formInput.text
        let title = fileNameInput.value
        let email = formInput.email
        let code = formInput.code
        let write = formInput.write
        // console.log(formInput._id);
        if (!documentId) {
            //spara ny fil

            let data = { title, text, email, code, write }
            let requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/docs', requestOptions)
            /*const body = */await response.text()
            // console.log(response);
            if (response.status === 201) {
                setOpen(true)
                setTimeout(() => setOpen(false), 5000);
            }
            // if (response.status === 201) window.location.reload()
            // else if (response.status !== 201) throw Error(body.message)

            console.log("wow new file");
        } else {
            //spara över gammal

            // console.log(formInput._id);
            let data = { title: title, text: text, id: documentId }
            // console.log(data);
            let requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }

            const response = await fetch(`https://jsramverk-editor-rilr20a.azurewebsites.net/docs/${documentId}`, requestOptions)
            /*const body = */await response.text()
            // console.log(response);
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
    async function changeDocument(documentId) {
        // updateFormInput({ ...formInput, _id: documentId })
        let document = await findId(documents, documentId)
        // console.log(document);
        if (documentId) {
            setUseSocket(true)
            console.log(document);
            updateFormInput({ ...document })
            setdocumentId(document._id);
            setDocumentTitle(document.title);
            socket.emit("create", documentId);
            setSelectedText([0, 0])
            // console.log(fileNameInput);
            // console.log(document.title);
            fileNameInput.value = document.title
            // console.log(document);
            // console.log(document.title);
            setValue(document.text)
            setTimeout(() => setInnerText(editor[0].innerText), 50);
            // setInnerText(editor[0].innerText)

            // editor[0].dangerouslySetInnerHTML = document.text

        } else {
            setInnerText(editor[0].innerText);
            setTimeout(() => updateFormInput({ _id: '', title: '', text: '', email: email, code: false, write: true }), 50);
            // updateFormInput({ _id: '', title: '', text: '', email: email, code: false, write: true });
            console.log("else selselselse");
            setUseSocket(false)
            setdocumentId('');
            setDocumentTitle('');
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
        // console.log(html);
        // console.log(action);
        setValue(html)
        console.log(formInput);
        const copy = Object.assign({}, formInput);
        console.log(copy);
        // console.log(copy);
        copy.text = html;
        updateFormInput(copy);
        setInnerText(editor[0].innerText)
    }
    function printPDF() {
        window["html2canvas"] = html2canvas;
        const doc = new jsPDF({ unit: 'pt' }) // create jsPDF object
        const pdfElement = document.getElementsByClassName('ql-editor')[0] // HTML element to be converted to PDF
        console.log(pdfElement);
        doc.html(pdfElement, {
            callback: (pdf) => {
                pdf.save(documentTitle)
            },
            margin: 32, // optional: page margin
            // optional: other HTMLOptions
        })
        // console.log(value);
        // var doc = new jsPDF()
        // doc.fromHTML(value)
        // doc.save('a4.pdf') 
        // const pdf = new jsPDF('p', 'pt', 'a4');;
        // pdf.setFont("helvetica");
        // // console.log(formInput);
        // pdf.html(document.querySelector('.ql-editor'), {
        //     callback: function (doc) {
        //         doc.save(`${fileNameInput.value}.pdf`);
        //     }
        // });
    }
    function switchmode() {
        console.log(formInput);
        const copy = Object.assign({}, formInput);

        copy.code = !copy.code;
        updateFormInput(copy);
    }
    async function encodeAndExec() {
        const encoded = btoa(formInput.text);
        let res = await execCode(encoded);
        setConsoleVal(res);
    }
    function handleMouseUp() {
        const string = editor[0].innerText;
        const substr = window.getSelection().toString();

        setSelectedText([string.indexOf(substr), string.indexOf(substr) + substr.length - 1]);
    }
    return (
        <div className='container'>
            {!token ? <h1>Login to access this page</h1> :
                <>
                    <div className='toolbar'>
                        <div className='tools'>
                            <div className='document-list'>
                                <input className='filename' id="filename" placeholder='title' name="title" onChange={(e) => { updateFormInput({ ...formInput, title: e.target.value }) }}></input>
                                <button className='filename-btn' onClick={saveFile}>Save</button>
                                <button className='filename-btn' onClick={printPDF}>get pdf</button>
                            </div>
                            <div>
                                <button className='filename-btn' onClick={switchmode}>Switch mode</button>
                                {formInput.code ? <button className='filename-btn' onClick={encodeAndExec}>Exec Code</button> : <></>}
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
                    <Permission userEmail={email} documentId={documentId} documentTitle={documentTitle} />
                    <div className='editor-comment'>
                        <div className='editor-wrapper' onKeyUp={emitToSocket} onMouseUp={handleMouseUp}>
                            {formInput.code ? <> <Editor //code editor
                                height="250px"
                                placeholder="Dags att börja koda"
                                defaultLanguage="javascript"
                                defaultValue="// Dags att börja koda"
                                value={value}
                                theme="vs-dark"
                                onChange={handleChange}
                            />
                                <Console consoleVal={consoleVal} />
                            </> : /*text editor*/
                                <ReactQuill value={value} onChange={handleChange} name="text" className='textEditor' id='textEditor' placeholder='Dags att börja skriva' />}
                        </div>
                        <Comments documentId={documentId} documentText={formInput.text} selectedText={selectedText} email={email} innerText={innerText} />
                    </div>
                    <h1>{open ? "document saved" : ""}</h1>
                    <p>Document id: {!documentId ? "New File" : documentId}</p>
                    <p>text:{formInput.text}</p>
                    {/* <p>text:{console.log(formInput)}</p> */}
                    <p>title:{documentTitle}</p>
                    <p>Code Mode:{formInput.code ? "true" : "false"}</p>
                    <p>Code Mode:{innerText}</p>
                </>
            }
        </div>
    );
}
