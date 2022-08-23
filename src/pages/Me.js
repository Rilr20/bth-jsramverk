import React, { useEffect, useState } from 'react';

const Me = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('localhost:1337')
            .then(res => res.json())
            .then(res => setMessage(res.description));
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