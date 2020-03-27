import React, { useState, useEffect } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { Slide } from '@material-ui/core';
import { deleteEmployee } from './Fetch'


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
        color: "white",
        fontWeight: "100"
    },
    mini: {
        position: "absolute",
        color: "white",
        padding: "0 0 1.5% 0",
        margin: "1.5% 2% 0 90%",
    },
    counter: {
        position: "absolute",
        fontSize: "1.2vw",
        top: "25%",
        left: "10%"
    },delete: {
        color: "white",
        position: "absolute",
        margin: "3.5% 2% 0 60%",
        cursor: "pointer",
    },
    newTest: {
        color: "white",
        position: "absolute",
        margin: "3.5% 2% 0 70%",
        cursor: "pointer",
    }
}

export default function SlideUp(props) {
    const [up, setUp] = useState(false)

    useEffect(() => {
        setUp(props.fadeIn)
    })

    const deleteEmployees = (employees) => {
        employees.map((employee) => {
            deleteEmployee(props.db, employee.id)
            props.setCompany(props.companyId)
            props.removeSelected()
        })
    }
    return(
        <Slide direction="up" in={up} mountOnEnter unmountOnExit>
            <div style={style.top}>
                <DeleteIcon  style={style.delete} onClick={() => {deleteEmployees(props.selectedEmployees)}}/>
                <AddToQueueIcon  style={style.newTest} onClick={() => { props.newTest()}}/>
                <RemoveIcon className={"minimize"} style={style.mini} onClick={() => {    setUp(prev => !prev); }}/>
            <span style={style.counter}>{`${props.count || 0} селектирани`}</span>
            </div>
        </Slide>
        
        
    )
}