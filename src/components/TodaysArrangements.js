import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';

import deepPurple from '@material-ui/core/colors/deepPurple'


const newColor = deepPurple[300]

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const style = {
    arrangement: {
        position: "relative",
        width: "90%",
        height: "8vh",
        margin: "1% 5%",
        borderLeft: `solid 3px ${newColor}`,
        cursor: "pointer"
    },
    left: {
        position: "absolute",
        width: "25%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "auto",
        textAlign: "center",
        color: "#525252",
        fontWeight: "100",
    },
    day: {
        fontSize: "1.5vw",
        lineHeight: "0vw",
    },
    month: {
        fontSize: ".8vw",
        lineHeight: "0vw"
    },
    year: {
        fontSize: ".6vw",
        lineHeight: "0vw"
    },
    right: {
        position: "absolute",
        left: "25%",
        minWidth: "75%",
        color: "#525252",
        textAlign: "start",
    },
    name: {
        fontSize: "1vw",
    },
    number: {
        fontSize: ".6vw",
        lineHeight: "0vw"
    },
    delete: {
        position: "absolute",
        top: "50%",
        left: "90%"
    }
}


export default function TodaysArrangements(props) {

    const handleDelete = (id) => {
        props.db.collection("testArrangements").doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            props.setAlert("success")
            props.setAlertMessage("Успешно избришавте запис.")
        }).catch(function(error) {
            props.setAlert("error")
            props.setAlertMessage(error.message)
            console.error("Error removing document: ", error);
        });
    }

    return (
        <div style={style.arrangement} className="arrangement" onClick={() => {
            props.setCompany(props.item.companyId)
        }}>
            <div style={style.left}>
            <h1 style={style.day}>{new Date(props.item.date).getDay()}</h1>
                <h1 style={style.month}>{months[new Date(props.item.date).getMonth()]}</h1>
                <h1 style={style.year}>{new Date(props.item.date).getFullYear()}</h1>
            </div>
            <div style={style.right}>
                <h1 style={style.name}>{props.item.companyName}</h1>
                <h1 style={style.number}>{`${props.item.numberOfEmployees} вработени`}</h1>
                <div id="delete" onClick={(e) => {
                    handleDelete(props.item.id)}}>
                <DeleteIcon  style={style.delete} />
                </div>
            </div>
        </div>
    )
}