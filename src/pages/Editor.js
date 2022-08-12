import React, { Component } from 'react'
import { TrixEditor } from "react-trix";
import "trix/dist/trix";

export default class Editor extends Component {
    handleEditorReady(editor) {
        // this is a reference back to the editor if you want to
        // do editing programatically
        editor.insertString("editor is ready");
    }
    handleChange(html, text) {
        // html is the new html content
        // text is the new text content
    }
    buttonClick() {
        let editor = document.getElementsByClassName('textEditor')
        console.log(editor[0].innerText)
    }
    render() {
        return (
            <div className='container'>
                <h1>Editor</h1>
                <div>
                    <h2>Toolbar </h2>
                    <ul>
                        <button onClick={this.buttonClick}>Save</button>
                        <li></li>
                        <li>Delete</li>
                        <li>Etc</li>
                    </ul>
                </div>
                <TrixEditor className='textEditor' onChange={this.handleChange} onEditorReady={this.handleEditorReady} />
            </div>
        );
    }
}
