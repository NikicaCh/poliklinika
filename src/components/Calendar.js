import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import EventIcon from '@material-ui/icons/Event';
import green from '@material-ui/core/colors/green';
import deepPurple from '@material-ui/core/colors/deepPurple'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const newColor = green[400];
const newColor2 = deepPurple[300]
const newColor3 = deepPurple[200]




const style={
    calendar: {
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#F2F8F8",
    },
    main: {
        position: "absolute",
        top: "10%",
        left: "30%",
        height: "80vh",
        minWidth: "58vw",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
        zIndex: "2",
        padding: "1%",
        // overflowY: "scroll",
        overflowX: "hidden",
        boder: "solid 1px red"
    },
    left: {
        position: "absolute",
        top: "10%",
        left: "2%",
        height: "auto",
        minHeight: "50vh",
        minWidth: "22vw",
        maxWidth: "27vw",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
        zIndex: "2",
        padding:"1% 0 5% 0"
    },
    button: {
        background: newColor,
        color: "white",
        position: "relative",
        margin: "1% 0 0 5%",
        borderRadius: "20px"
    },
    calendarButton: {
        position: "relative",
        background: newColor2,
        color: "white",
        borderRadius: "20px",
        marginRight: "3%"
    },
    calendarButton2: {
        position: "relative",
        background: newColor3,
        color: "white",
        borderRadius: "20px",
        marginRight: "1%"
    }
}

export default function Calendar(props) {
    return (
        <div style={style.calendar}>
            <div style={style.main}>
                <Button style={style.calendarButton}>Ден</Button>
                <Button style={style.calendarButton2}>Недела</Button>
                <Button style={style.calendarButton2}>Месец</Button>
            </div>
            <div style={style.left}>
                <Button style={style.button}><EventIcon /> Закажи преглед</Button>
            </div>
        </div>
    )
}