import React from 'react'

export default function Console({ consoleVal }) {

    return (
        <div className='console'>
            <div className='divider'></div>
            <p>{consoleVal}</p>
        </div>
    )
}
