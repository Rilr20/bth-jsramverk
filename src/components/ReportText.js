import React from 'react'

export default function ReportText(props) {

    const text = [
        { title: "Report 1", text: ["detta är report 1"] },
        { title: "Report 2", text: ["detta är report 2"] },
        { title: "Report 3", text: ["detta är report 3"] },
        { title: "Report 4", text: ["detta är report 4"] },
        { title: "Report 5", text: ["detta är report 5"] },
        { title: "Report 6", text: ["detta är report 6"] },
        { title: "Report 10", text: ["detta är report 10"] },
    ]
    return (
        <div>
            <h2>{text[props.num].title}</h2>
            {
                text[props.num].text.map((paragraph) => {
                    return <p>{paragraph}</p>
                })
            }
        </div>
    )
}
