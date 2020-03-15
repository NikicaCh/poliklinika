import React, { useState } from 'react'

const style = {
    item: {
        fontSize: ".5vw",
        fontFamily: "Cuprum",
        cursor: "pointer",
        background: "white",
        opacity: ".7",
        overflowX: "hidden"
    }
}

export default function CompanySearch(props) {

    
    return (
        <div style={style.item} title={props.item.name} onClick={() => { props.handleClick(props.item)}}>
            <h1>{props.item.name}</h1>
        </div>
    )
}