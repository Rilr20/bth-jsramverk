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
    useEffect(() => {
        (async () => {
            // console.log("run");
            // console.log(documentId);
            // await fetchData(setDocuments, token)
            // if (documentId) {
            updateCommentList()
            // }
        })();
    }, [documentId]);// eslint-disable-line react-hooks/exhaustive-deps
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
        // console.log(selectedText.length !== 0);
        if (selectedText[1] !== -1 && selectedText.length === 2) {
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
            await updateCommentList();
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
            <div className='comment-section'>
                {
                    comments.map((comment) => {
                        return <div className='comment'>
                            <div style={{ display: "flex", }}>
                                <p className='comment-text' style={{ marginTop: "0.26em;" }}>{unixToDate(comment.date)}</p>
                                <button style={{ marginLeft: "1em", height: "25px" }} onClick={() => { deleteComment(comment._id) }}>Delete</button>
                            </div>
                            <p className='comment-text'>User: {comment.email}</p>
                            {/* <p>{innerText}</p> */}
                            {/* <p>{innerText}</p> */}
                            <p>{comment.startpos}</p>
                            <p>{comment.endpos}</p>
                            {/* {console.log(innerText.substr(comment.startpos, comment.endpos) + " arg")} */}
                            <p className='comment-text'>Selected text: {innerText.substr(comment.startpos, comment.endpos)}</p>
                            <p className='comment-text'>Comment: {comment.text}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
