const editorData = {
    fetchData: async function (setDocuments, token) {
        // console.log("fetching data");
        // console.log(token);

        // const response = await fetch("https://jsramverk-editor-rilr20a.azurewebsites.net/docs", {
        //     headers: {
        //         "x-access-token": token,
        //     }
        // })
        // console.log(response);

        // const docs = await response.json();

        // // setDocuments(docs);
        // return docs
        return fetch("https://jsramverk-editor-rilr20a.azurewebsites.net/docs", {
            headers: {
                "x-access-token": token
            }
        })
            .then((response) => response.json())
            .then((data) => (
                setDocuments(data.data)));
    },
    execCode: async function (encoded) {
        return fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify({code: encoded}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                let decodedOutput = atob(result.data);
                return decodedOutput
            });

    }
}

export default editorData;
export const fetchData = editorData.fetchData;
export const execCode = editorData.execCode;
