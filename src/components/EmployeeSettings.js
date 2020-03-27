import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import deepPurple from '@material-ui/core/colors/deepPurple'


const newColor = green[400];
const newColor2 = deepPurple[300]



const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 550,
    }
  },
}));

const style = {
    div: {
        marginTop: "8%"
    },
    button: {
        background: newColor,
        color: "white",
        margin: "3% 0 0 1%",
        borderRadius: "20px"
    }
}


export default function EmployeeSettings(props) {
    const classes = useStyles();


    const handleChange = (id, value) => {
        let data = {
            id: id,
            name: document.getElementById("name").value || props.item.name || "",
            lastName: document.getElementById("lastName").value || props.item.lastName || "",
            address: document.getElementById("address").value || props.item.address || "",
            telephone: document.getElementById("telephone").value || props.item.telephone || "",
            eMail: document.getElementById("eMail").value || props.item.eMail || props.item.email || "",
            position: document.getElementById("position").value || props.item.position || "",
            tests: props.item.tests || []
        }

        props.db.collection("employees").doc(id).set(data)
        props.setAlert("success")
        props.setAlertMessage(`Промените се запишани.`)
        props.setEmployee(data)
    }
    return (
        <div style={style.div}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="name" label="Име" variant="outlined" placeholder={props.item.name}/>
                <TextField id="lastName" label="Презиме" variant="outlined" placeholder={props.item.lastName}/>
                <TextField id="address" label="Адреса" variant="outlined" placeholder={props.item.address}/>
                <TextField id="telephone" label="Телефон" variant="outlined" placeholder={props.item.telephone}/>
                <TextField id="eMail" label="Е-маил" variant="outlined" placeholder={props.item.eMail}/>
                <TextField id="position" label="Позиција" variant="outlined" placeholder={props.item.position}/>
            </form>
            <Button style={style.button} variant="contained" onClick={() => handleChange(props.item.id, )}>
                Зачувај измени
            </Button>
        </div>
    )
}