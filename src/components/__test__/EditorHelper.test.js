import EditorHelper from "../EditorHelper";

test('testing findid function', () => {
    let documents = [
        { _id: 1, text: "correct" },
        { _id: 2, text: "incorrect" },
        { _id: 3, text: "not okay" },
    ]
    let res = EditorHelper.findId(documents, 2)
    expect(res).toBe(documents[1])
})
