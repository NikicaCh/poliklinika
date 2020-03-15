import React, { useState, useEffect } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import deepPurple from '@material-ui/core/colors/deepPurple'
import { Slide } from '@material-ui/core';

const color = deepPurple[300]



const style = {
    top: {
        position: "absolute",
        top: "88.5vh", //88
        left: "2%",
        height: "5.5vh",
        minWidth: "22vw",
        background: "#16335A",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
        display: "grid",
        gridTemplateRows:  "25% 25% 25% 25%",
        zIndex: "2",
        color: color
    },
    mini: {
        position: "absolute",
        color: color,
        padding: "0 0 1.5% 0",
        margin: "1.5% 2% 0 90%",
    },
    counter: {
        position: "absolute",
        fontSize: "1.2vw",
        top: "25%",
        left: "10%"
    }
}

export default function SlideUp(props) {
    const [up, setUp] = useState(false)

    useEffect(() => {
        setUp(props.fadeIn)
    })
    return(
        <Slide direction="up" in={up} mountOnEnter unmountOnExit>
            <div style={style.top}>
                <RemoveIcon className={"minimize"} style={style.mini} onClick={() => {    setUp(prev => !prev); }}/>
            <span style={style.counter}>{`${props.count || 0} селектирани`}</span>
            </div>
        </Slide>
        
        
    )
}