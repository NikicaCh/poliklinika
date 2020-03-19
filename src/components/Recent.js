import React, { useState } from 'react'


const style = {
    recent: {
        position: "relative",
        fontWeight: "100",
        fontSize: "1vw",
        color: "#525252",
        cursor: "pointer"
    }
}

export default function Recent(props) {

    return( 
        <div className="arrangement" onClick={() => {
            props.setCompany(props.id)
        }}>
            <h1 style={style.recent}>{props.name}</h1>
        </div>
    )
}