import React, { useState } from 'react'

import deepPurple from '@material-ui/core/colors/deepPurple'
import blue from '@material-ui/core/colors/blue'
import teal from '@material-ui/core/colors/teal'
import lime from '@material-ui/core/colors/lime'
import blueGrey from '@material-ui/core/colors/blueGrey'
import deepOrange from '@material-ui/core/colors/deepOrange'



const colors = {
    0: deepPurple[300],
    1: blue[300],
    2: teal[400],
    3: lime[600],
    4: blueGrey[200],
    5: deepOrange[400]
}

const newColor = deepPurple[300]




export default function WeekEvent(props) {

    const style = {
        event: {
            position: "relative",
            width: "100%",
            height: "5vh",
            borderLeft: `solid 4px ${colors[props.color]}`,
            cursor: "pointer",
        },
        eventNoBorder: {
            position: "relative",
            width: "100%",
            height: "6vh",
            color: "transparent"
        },
        name: {
            fontSize: ".7vw",
            lineHeight: "2vh"
        },
        count: {
            fontSize: ".5vw",
            lineHeight: "1vh",
        }
    }
    return (
        <div>
        {
            (props.title !== "TEST")
            ? <div style={style.event} title={props.title}>
                <h1 style={style.name}>{props.title.slice(0,15)}</h1>
                <h1 style={style.count}>{props.number} вработени</h1>
             </div>
            : <div style={style.eventNoBorder}>
                <h1 style={style.name}>{props.title}</h1>
                <h1 style={style.count}>{props.number} вработени</h1>
            </div>
        }
        </div>
    )
}