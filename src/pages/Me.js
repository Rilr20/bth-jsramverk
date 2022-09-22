import React, { useEffect, useState } from 'react';
const Me = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = () => {
            return fetch("https://jsramverk-editor-rilr20a.azurewebsites.net/me")
                .then((response) => response.json())
                .then((data) => setMessage(data.data.msg));
        }
        fetchData()
    });
    return (
        <main>
            <h1>Me</h1>
            <h2>Rikard Larsson</h2>
            <p>{message}</p>
        </main>
    );
};

export default Me;