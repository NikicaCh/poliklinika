import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import {createEmployee} from './Fetch'


export default function AddEmployeeModal(props) {
  const [open, setOpen] = React.useState(props.render);

  React.useEffect(() => {
    setOpen(props.render)
  })

  const handleClose = () => {
    props.setModal(false)
  };
  
  const handleSubmit = () => {
    //validation first
    let data = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        address: document.getElementById("address").value,
        education: document.getElementById("education").value,
        position: document.getElementById("position").value,
        work: document.getElementById("work").value,
        family: document.getElementById("family").value,
        company: props.company.id //not storing it as a ref for now, change if neccesery
      }
    let companyData = props.company;
    companyData.employees = [...props.employees, data.id]
    console.log("NEW",companyData)
    let docRef = props.db.collection("employees").doc(data.id);
    let message = docRef.get().then(function(doc) {
        if (doc.exists) {
            props.setAlertMessage("Вработен со тој ЕМБГ веќе постои во системот")
            props.setAlert("error")
            setOpen(false)
            setTimeout(() => {
              props.setAlert("")
            }, 3000)
            throw new Error("Вработен со тој ЕМБГ веќе постои во системот")
        } else {
            props.db.collection('employees').doc(data.id).set(data);
            props.db.collection('companies').doc(props.company.id).set(companyData)
            props.setModal(false)
            throw "good job" 
        }
    })
    .catch(function(error) {
      console.log(error);
    });
    if(message === "good job") {
      props.setAlertMessage("Успешно креиравте нов вработен.")
      props.setAlert("success")
    }
    return message
    
  }


  const max = new Date().getFullYear()


  const inputProps={
    year: {
        min: 1900,
        max: max, 
    },
    work: {
      min: 0,
      max: 50
    },
    embg: {
        min: 0,
        max: 3112999999999
    }
    
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    modal: {
      width: "100%",
      height: "100%"
    }
  }));

  const classes = useStyles()

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth = {'md'}>
        <DialogTitle id="form-dialog-title">Нов Вработен</DialogTitle>
        <DialogContent >
          <TextField
            className={classes.paper}
            autoFocus
            id="name"
            placeholder="Петко"
            required={true}
            variant={"outlined"}
            label="Име"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="lastName"
            placeholder="Петковски"
            required={true}
            variant={"outlined"}
            label="Презиме"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="age"
            placeholder="1980"
            required={true}
            variant={"outlined"}
            label="Година"
            type="number"
            inputProps={inputProps.year}
          />
          <TextField
            className={classes.paper}
            id="id"
            placeholder="0101990420000"
            required={true}
            variant={"outlined"}
            label="Матичен број"
            type="number"
          />
          <TextField
            className={classes.paper}
            id="address"
            required={true}
            variant={"outlined"}
            label="Адреса"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="education"
            required={true}
            variant={"outlined"}
            label="Образование"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="position"
            required={true}
            variant={"outlined"}
            label="Позиција"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="family"
            required={true}
            variant={"outlined"}
            label="Фам.Анамнеза"
            type="text"
          />
          <TextField
            className={classes.paper}
            id="work"
            required={true}
            variant={"outlined"}
            label="Раб.анам.(г)"
            type="number"
            inputProps={inputProps.work}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Затвори
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Креирај нов вработен
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}