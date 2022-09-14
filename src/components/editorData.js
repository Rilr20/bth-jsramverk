const editorData= {
    fetchData: async function (setDocuments) {
        return fetch("https://jsramverk-editor-rilr20a.azurewebsites.net/docs")
            .then((response) => response.json())
            .then((data) => (setDocuments(data)));
    }
}

export default editorData;
export const fetchData = editorData.fetchData;
