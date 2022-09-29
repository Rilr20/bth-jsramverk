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
    }
}

export default editorData;
export const fetchData = editorData.fetchData;
