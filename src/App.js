import './App.css';
import './style/css/style.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Me from './pages/Me'
import Editor from './pages/Editor';
import Report from './pages/Report';
import About from './pages/About';
import Irc from './pages/Irc';

function App() {
    return (
        <>
            <Navbar />
            <div className="wrapper">
                <Routes>
                    <Route path="/" element={<Editor />}></Route>
                    <Route path="/editor" element={<Editor />}></Route>
                    <Route path="/me" element={<Me />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/report" element={<Report />}></Route>
                    <Route path="/irc" element={<Irc />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
