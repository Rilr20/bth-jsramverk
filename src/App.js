import './App.css';
import './style/css/style.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom'
import Me from './pages/Me'
import Editor from './pages/Editor';
import Report from './pages/Report';
import About from './pages/About';
import Account from './pages/Account';
import { useState } from 'react';

function App() {
    const [token, setToken] = useState(""); 
    const [email, setEmail] = useState("");
    return (
        <>
            <Navbar />
            <div className="wrapper">
                <Routes>
                    <Route path="/" element={<Editor token={token} setToken={setToken} email={email} setEmail={setEmail} />}></Route>
                    <Route path="/editor" element={<Editor token={token} setToken={setToken} email={email} setEmail={setEmail} />}></Route>
                    <Route path="/me" element={<Me token={token} setToken={setToken} email={email} setEmail={setEmail} />}></Route>
                    <Route path="/about" element={<About token={token} setToken={setToken} email={email} setEmail={setEmail} />}></Route>
                    <Route path="/report" element={<Report token={token} setToken={setToken} email={email} setEmail={setEmail} />}></Route>
                    <Route path="/account" element={<Account token={token} setToken={setToken} email={email} setEmail={setEmail} />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default App;
