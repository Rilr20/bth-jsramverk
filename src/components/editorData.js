const editorData= {
    fetchData: async function (setDocuments) {
        return fetch("http://localhost:1337/docs")
            .then((response) => response.json())
            .then((data) => (setDocuments(data.data)));
    }
}

export default editorData;
export const fetchData = editorData.fetchData;
