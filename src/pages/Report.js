import React from 'react'
import { useState } from "react";
import ReportText from '../components/ReportText'

export default function Report(props) {
    const [num, setNum] = useState(0);

    function buttonClick(number) {
        setNum(number)
    }
    return (
        <div>
            <h1>Report</h1>
            <div className="report-buttons">
                <button className="report-button" onClick={() => buttonClick(0)}>Report 1</button>
                <button className="report-button" onClick={() => buttonClick(1)}>Report 2</button>
                <button className="report-button" onClick={() => buttonClick(2)}>Report 3</button>
                <button className="report-button" onClick={() => buttonClick(3)}>Report 4</button>
                <button className="report-button" onClick={() => buttonClick(4)}>Report 5</button>
                <button className="report-button" onClick={() => buttonClick(5)}>Report 6</button>
                <button className="report-button" onClick={() => buttonClick(6)}>Report 10</button>
            </div>
            <ReportText num={num} />
        </div>
    )
}
