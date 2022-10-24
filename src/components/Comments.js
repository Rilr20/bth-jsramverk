import React, { useEffect, useState } from 'react'

export default function Comments({ documentId, documentText, selectedText, email, innerText }) {
    /*
    {
        commentCreate(documentId: "6349d1747377f2687e30038d", email: "doe@email.com", text: "Stavfel", startpos: 0, endpos: 0)
    }
 */
    /*
     {
        commentsByDocId(documentId: "6349d1747377f2687e30038d") {
            documentId
            email
            text
            date
            startpos
            endpos
        }
    }
    {
        commentDelete(commentId: "634d0501da3a0771418f1cf9")
    }
    //ska ha en knapp för comment delet och den ska läsa in allt med med documentId
     */
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [open, setOpen] = useState(false);
    const [errorText, setErrorText] = useState('');
    // const [writtenText, setWrittenText] = useState('');

    useEffect(() => {
        // console.log(documentId);
        // console.log(innerText);
        (async () => {
            // setTimeout(() => setWrittenText(""), 50);

            // console.log("run");
            // console.log(documentId);
            // await fetchData(setDocuments, token)
            // if (documentId) {
            await updateCommentList()

            // }
        })();
        // console.log(innerText);


        }, [documentId]);// eslint-disable-line react-hooks/exhaustive-deps
        
        // useEffect(() => {
        //     // if(innerText !== "" && writtenText === "") {
        //     //     console.log("tja");
        //     //     const string = innerText
        //     //     // setTimeout(() => setWrittenText(string), 50);
        //     // }
        // }, [innerText]);
    async function updateCommentList() {
        const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `     {
                                        commentsByDocId(documentId: "${documentId}") {
                                            _id
                                            documentId
                                            email
                                            text
                                            date
                                            startpos
                                            endpos
                                        }
                                    }`
            })
        });
        const result = await response.json();
        // console.log(result.data.commentsByDocId);
        setComments(result.data.commentsByDocId)
    }
    function unixToDate(timeStamp) {
        const dateTimeStr = new Date(parseInt(timeStamp, 10)).toLocaleString('sv-SE')
        const result = dateTimeStr
        return result
    }
    async function deleteComment(id) {
        const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `    {
                            commentDelete(commentId: "${id}")
                        }`
            })
        });
        await updateCommentList();
        return "this"
    }
    async function createComment() {
        console.log("tja tja tja");
        // console.log(selectedText.length !== 0);
        // console.log(selectedText[1] > 0);
        // console.log(selectedText.length === 2);
        // console.log(selectedText[1] > 0 && selectedText.length === 2 && documentId);
        if (selectedText[1] > 0 && selectedText.length === 2 && documentId) {
            const response = await fetch('https://jsramverk-editor-rilr20a.azurewebsites.net/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `    {
                        commentCreate(documentId: "${documentId}", email: "${email}", text: "${commentText}", startpos: ${selectedText[0]}, endpos: ${selectedText[1]})
                    }`
                })
            });
            console.log(response);
            await updateCommentList();
        } else {
            setErrorText('No text selected or document id was not found');
            setOpen(true);
            setTimeout(() => setOpen(false), 5000);
        }
    }
    function handleOnChange(e) {
        setCommentText(e.target.value)
    }
    return (
        <div style={{ width: "19%" }}>
            <div>
                <p>start: {selectedText[0]} stop: {selectedText[1]}</p>
                <button onClick={createComment}>Create Comment</button>
                <input onChange={handleOnChange}></input>
                {/* <textarea style={{ width: "100%", resize: "none" }} value={selectedText}></textarea> */}
            </div>
            <p>{open ? errorText : ""}</p>
            <div className='comment-section'>
                {
                    comments.map((comment) => {
                        // console.log(comments);
                        return <div className='comment' key={comment._id}>
                            <div style={{ display: "flex", }}>
                                <p className='comment-text' style={{ marginTop: "0.26em" }}>{unixToDate(comment.date)}</p>
                                <button style={{ marginLeft: "1em", height: "25px" }} onClick={() => { deleteComment(comment._id) }}>Delete</button>
                            </div>
                            <p className='comment-text'>User: {comment.email}</p>
                            {/* <p>{innerText}</p> */}
                            {/* <p>{innerText}</p> */}
                            {/* <p>{comment.startpos}</p> */}
                            {/* <p>{comment.endpos}</p> */}
                            {/* {console.log(innerText.substr(comment.startpos, comment.endpos) + " arg")} */}
                            <p className='comment-text'>Selected text: {innerText.substr(comment.startpos, comment.endpos - comment.startpos + 1)}</p>
                            <p className='comment-text'>From character {comment.startpos} to {comment.endpos}</p>
                            <p className='comment-text'>Comment: {comment.text}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
