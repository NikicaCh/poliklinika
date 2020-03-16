import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import deepPurple from '@material-ui/core/colors/deepPurple'
import AddIcon from '@material-ui/icons/Add';
import AddCompanyModal from './AddCompanyModal'

const newColor = deepPurple[300];


const style = {
    nav: {
        position: "relative",
        float: "left",
        width: "13vw",
        height: "94vh",
        top: "6vh",
        background: "#F2F8F8",
        textAlign: "center"
    },
    button: {
        background: newColor,
        color: "white",
        position: "relative",
        width: "70%",
        maxWidth: "95%",
        marginTop: "20%",
        borderRadius: "20px"
    }, 
    recent: {
        position: "relative",
        width: "90%",
        height: "40%",
        maxWidth: "95%",
        marginTop: "30%",
        marginLeft: "10%",
        background: "white",
        borderRadius: "10px",
        paddingTop: "0 1% 1% 1%",
        zIndex: "2",
        boxShadow: "0 1px 1px 0 rgba(60,64,67,.3), 0 1px 1px 1px rgba(60,64,67,.15)",
    }
}


export default function LeftNav(props) {

    const [render, setRender] = useState(false)

    const handleClose= () => {
        setRender(false)
    }
    return (
        <div style={style.nav}>
            <Button variant="contained" style={style.button} onClick={() => {setRender(true)}}><AddIcon /> Нова Фирма</Button>
            <div style={style.recent}></div>
            <AddCompanyModal render={render} setModal={handleClose}/>
        </div>
    )   
}