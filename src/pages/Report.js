import React from 'react'
import { useState, useEffect } from "react";
import ReportText from '../components/ReportText'

export default function Report(props) {
    const [num, setNum] = useState(0);
    // useEffect(() => {
    // }, []);

    function sayHello(number) {
        setNum(number)
    }
    return (
        <div>
            <h1>Report</h1>
            <div className="report-buttons">
                <button className="report-button" onClick={() => sayHello(0)}>Report 1</button>
                <button className="report-button" onClick={() => sayHello(1)}>Report 2</button>
                <button className="report-button" onClick={() => sayHello(2)}>Report 3</button>
                <button className="report-button" onClick={() => sayHello(3)}>Report 4</button>
                <button className="report-button" onClick={() => sayHello(4)}>Report 5</button>
                <button className="report-button" onClick={() => sayHello(5)}>Report 6</button>
                <button className="report-button" onClick={() => sayHello(6)}>Report 10</button>
            </div>
            <ReportText num={num} />
        </div>
    )
}

function buttonClick(number) {
    console.log(number);
}