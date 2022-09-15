<<<<<<< HEAD
import { render, screen, cleanup } from '@testing-library/react'
import Editor from '../Editor'

afterEach(() => {
    cleanup();
})

// jest.mock('../../components/editorData', ()=> "fetchData")
// const documents = [
//     { title: "title", text: "text" },
//     {title:"title", text:"text"},
//     {title:"title", text:"text"},
//     { title: "title", text: "text" }
// ]
// const fetchData = () => false;

test('User can see document button', async () => {
    render(<Editor />)
    const documentList = screen.getByTestId('document-list');
    expect(documentList).toHaveTextContent('New Document')
})