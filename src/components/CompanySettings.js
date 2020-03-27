import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import green from '@material-ui/core/colors/green';
import deepPurple from '@material-ui/core/colors/deepPurple'
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteCompany, deleteEmployee, deleteTest } from './Fetch';



const newColor = green[400];
const newColor2 = deepPurple[300]
const newColor3 = red[500]



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
    },
    delete: {
        color: "white",
        margin: "3% 0 0 1%",
        borderRadius: "20px",
        background: newColor3
    },
    deleteInput: {
        width: "50%",
        marginLeft: "10%"
    },
    info: {
        marginLeft: "10%",
        marginBottom: "5%"
    }
}


export default function CompanySettings(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [deleteState, setDeleteState] = useState(false)


    const handleChange = (id, value) => {
        let data = {
            name: document.getElementById("name").value || props.item.name || "",
            address: document.getElementById("address").value || props.item.address || "",
            D: document.getElementById("director").value || props.item.D || props.item.director || "",
            telephone: document.getElementById("telephone").value || props.item.telephone || "",
            eMail: document.getElementById("eMail").value || props.item.eMail || props.item.email || ""
        }

        props.db.collection("companies").doc(props.companyId).set(data)
        props.setAlert("success")
        props.setAlertMessage(`Промените се запишани.`)
        props.setCompany(props.companyId)  
    }

    const handleDelete = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        let value = document.getElementById("delete").value
        if(value === props.item.name) {
            if(props.item.employees && props.item.employees.length) {
                props.item.employees.map((employee) => {
                    deleteEmployee(props.db, employee)
                })
            }
            if(props.item.tests && props.item.tests.length) {
                props.item.employees.map((test) => {
                    deleteTest(props.db, test)
                })
            }
            deleteCompany(props.db, props.companyId)
            props.setAlert("success")
            props.setAlertMessage(`Успешно ја избришавте фирмата ${props.item.name}, и сите податоци поврзани со неа`)

        } else {
            props.setAlert("error")
            props.setAlertMessage("Внесовте погрешно име")
            setOpen(false)
        }
        props.removeFromCompaniesJson(props.companyId)
    }

    const validate = () => {
        let value = document.getElementById("delete").value
        if(value !== props.item.name) {
            setDeleteState(true)
        } else {
            setDeleteState(false)
        }
    }
    return (
        <div style={style.div}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="name" label="Име" variant="outlined" placeholder={props.item.name}/>
                <TextField id="address" label="Адреса" variant="outlined" placeholder={props.item.address}/>
                <TextField id="director" label="Управител" variant="outlined" placeholder={props.item.D || props.item.director}/>
                <TextField id="telephone" label="Телефон" variant="outlined" placeholder={props.item.telephone}/>
                <TextField id="eMail" label="Е-маил" variant="outlined" placeholder={props.item.eMail || props.item.email}/>
            </form>
            <Button style={style.button} variant="contained" onClick={handleChange}>
                Зачувај измени
            </Button>
            <Button style={style.delete} variant="contained" onClick={() => {
                handleDelete()
            }}> Избриши фирма
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
                <DialogTitle id="form-dialog-title">Избриши фирма</DialogTitle>
                <DialogContentText style={style.info}>Ова акција ке ја избрише фирмата како и сите вработени асоцирани со фирмата.</DialogContentText>
                <TextField
                    id="delete"
                    style={style.deleteInput}
                    label="внеси го името на фирмата"
                    variant="outlined"
                    placeholder={props.item.name}
                    autoFocus={true}
                    error={deleteState}
                    onChange={() => {validate()}}
                    title="Поради сигурност внесете го името на фирмата"/>
                <DialogActions>                        
                        <Button onClick={handleClose} color="primary">
                            Затвори
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Избриши
                        </Button>               
                </DialogActions>
            </Dialog>
        </div>
    )
}