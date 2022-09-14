import React from 'react'
import { useState } from "react";
import ReportText from '../components/ReportText'

export default function Report(props) {
    const [num, setNum] = useState(0);

    function buttonClick(number) {
        setNum(number)
    }
    return (
        <div data-testid="report">
            <h1>Report</h1>
            <div className="report-buttons">
                <button data-testid="Report 1" className="report-button" onClick={() => buttonClick(0)}>Report 1</button>
                <button data-testid="Report 2" className="report-button" onClick={() => buttonClick(1)}>Report 2</button>
                <button data-testid="Report 3" className="report-button" onClick={() => buttonClick(2)}>Report 3</button>
                <button data-testid="Report 4" className="report-button" onClick={() => buttonClick(3)}>Report 4</button>
                <button data-testid="Report 5" className="report-button" onClick={() => buttonClick(4)}>Report 5</button>
                <button data-testid="Report 6" className="report-button" onClick={() => buttonClick(5)}>Report 6</button>
                <button data-testid="Report 10" className="report-button" onClick={() => buttonClick(6)}>Report 10</button>
            </div>
            <ReportText num={num} />
        </div>
    )
}
