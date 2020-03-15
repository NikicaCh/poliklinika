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
            <AddCompanyModal render={render} setModal={handleClose}/>
        </div>
    )   
}