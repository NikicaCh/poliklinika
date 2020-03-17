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


export default function CompanySettings(props) {
    const classes = useStyles();


    const handleChange = (id, value) => {

    }
    return (
        <div style={style.div}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="name" label="Име" variant="outlined" value={props.item.name}/>
                <TextField id="address" label="Адреса" variant="outlined" value={props.item.address}/>
                <TextField id="director" label="Управител" variant="outlined" value={props.item.D}/>
                <TextField id="telephone" label="Телефон" variant="outlined" value={props.item.telephone}/>
                <TextField id="eMail" label="Е-маил" variant="outlined" value={props.item.eMail}/>
            </form>
            <Button style={style.button} variant="contained">
                Зачувај измени
            </Button>
        </div>
    )
}