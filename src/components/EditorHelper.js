const EditorHelper = {
    findId: function (documents, id) {
        let returnValue = null
        documents.forEach(document => {
            if (document._id === id) {
                returnValue = document
            }
        });
        return returnValue
    }
}

export default EditorHelper;
export const findId = EditorHelper.findId;
