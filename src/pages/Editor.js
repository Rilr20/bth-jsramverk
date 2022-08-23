import React, { Component } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";

export default class Editor extends Component {
    handleEditorReady(editor) {
        editor.insertString("editor is ready");
    }
    handleChange(html, text) {
    }
    buttonClick() {
        let editor = document.getElementsByClassName('textEditor')
        console.log(editor[0].innerText)
    }
    render() {
        return (
            <div className='container'>
                <h1>Editor</h1>
                <div className='toolbar'>
                    <h2>Toolbar </h2>
                    <ul>
                        <button onClick={this.buttonClick}>Save</button>
                        {/* <li></li>
                        <li>Delete</li>
                        <li>Etc</li> */}
                    </ul>
                </div>
                <TrixEditor className='textEditor' onChange={this.handleChange} onEditorReady={this.handleEditorReady} />
            </div>
        );
    }
}
