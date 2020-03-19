import React, { useState } from 'react'

const style = {
    element: {
        position: "relative",
        margin: "5% 8% 0 8%",
        fontSize: "1.2vw",
        color: "#525252",
        padding: "6% 0 0 1%",
        wordWrap: "break-word",
        maxWidth: "75%",
        height: "auto",
        lineHeight: "120%"
    },
    description: {
        position: "absolute",
        fontSize: ".6vw",
        top: "-10%",
        color: "#999999"
    }
}

export default function Generals(props) {
    return (
        <div>
            {
                props.item !== undefined
                ? <div style={style.element}>
                    <h1 style={style.description} title={props.description}>*{props.description}</h1>
                    {props.item} 
                  </div>
                : undefined
            }
        </div>
        
    )
}